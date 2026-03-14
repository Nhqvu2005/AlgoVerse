import { AlgorithmInfo, AlgorithmStep, GraphData } from '@/lib/types';

const code = `// Prim's Algorithm (MST)
function prim(graph) {
    const parent = {};
    const key = {};
    const mstSet = {};

    graph.nodes.forEach(n => {
        key[n] = Infinity;
        mstSet[n] = false;
    });

    key[graph.nodes[0]] = 0;
    parent[graph.nodes[0]] = -1;

    for (let count = 0; count < V - 1; count++) {
        const u = minKey(key, mstSet);
        mstSet[u] = true;

        for (const v of graph.adj[u]) {
            if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
}`;

const codeLanguages = {
    js: code,
    python: `import heapq

def prim(graph, start):
    mst = []
    visited = set([start])
    edges = [
        (cost, start, to)
        for to, cost in graph[start].items()
    ]
    heapq.heapify(edges)

    while edges:
        cost, frm, to = heapq.heappop(edges)
        if to not in visited:
            visited.add(to)
            mst.append((frm, to, cost))
            for to_next, cost2 in graph[to].items():
                if to_next not in visited:
                    heapq.heappush(edges, (cost2, to, to_next))`,
    c: `// Prim's Algorithm
void primMST(int graph[V][V]) {
    int parent[V]; 
    int key[V];   
    bool mstSet[V]; 
  
    for (int i = 0; i < V; i++)
        key[i] = INT_MAX, mstSet[i] = false;
  
    key[0] = 0; 
    parent[0] = -1; 
  
    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, mstSet);
        mstSet[u] = true;
  
        for (int v = 0; v < V; v++)
            if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v])
                parent[v] = u, key[v] = graph[u][v];
    }`,
    cpp: `// Prim's Algorithm
void primMST(int graph[V][V]) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    int src = 0; 
    vector<int> key(V, INF);
    vector<int> parent(V, -1);
    vector<bool> inMST(V, false);
  
    pq.push(make_pair(0, src));
    key[src] = 0;
  
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        if(inMST[u] == true) continue;
        inMST[u] = true; 
  
        for (auto x : adj[u]) {
            int v = x.first;
            int weight = x.second;
            if (inMST[v] == false && key[v] > weight) {
                key[v] = weight;
                pq.push(make_pair(key[v], v));
                parent[v] = u;
            }
        }
    }
}`
};

export const prim: AlgorithmInfo = {
    slug: 'prim',
    name: 'Prim',
    nameVi: 'Thuật toán Prim (Cây khung nhỏ nhất)',
    description: 'Thuật toán Prim tìm cây khung nhỏ nhất (MST) cho đồ thị vô hướng có trọng số.',
    descriptionEn: 'Prim\'s algorithm finds the Minimum Spanning Tree (MST) for a weighted undirected graph.',
    category: 'graph',
    categoryVi: 'Đồ thị',
    difficulty: 'advanced',
    timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
    spaceComplexity: 'O(V + E)',
    code,
    codeLanguages,
    icon: '🕸️',
    inputType: 'graph',
    defaultInput: [],
    guide: {
        input: 'Đồ thị vô hướng có trọng số.',
        inputEn: 'Weighted undirected graph.',
        conditions: 'Đồ thị liên thông.',
        conditionsEn: 'Connected graph.',
        output: 'Tập hợp các cạnh tạo thành MST.',
        outputEn: 'Set of edges forming the MST.',
        explanation: 'Bắt đầu từ 1 đỉnh bất kỳ. Mỗi bước, nhìn tất cả cạnh nối từ các đỉnh đã chọn ra các đỉnh chưa chọn, rồi chọn cạnh có trọng số nhỏ nhất. Thêm đỉnh mới vào tập đã chọn. Lặp lại đến khi tất cả đỉnh được nối. Kết quả: cây khung (nối tất cả đỉnh) với tổng trọng số nhỏ nhất.',
        explanationEn: 'Start from any node. Each step, look at all edges connecting selected nodes to unselected ones, pick the edge with smallest weight. Add the new node. Repeat until all nodes are connected. Result: a spanning tree (connecting all nodes) with minimum total weight.'
    },

    generateSteps: (data?: GraphData) => {
        const steps: AlgorithmStep[] = [];

        // Default graph
        const nodes = data?.nodes || [
            { id: 0, label: 'A', x: 200, y: 50 },
            { id: 1, label: 'B', x: 100, y: 150 },
            { id: 2, label: 'C', x: 300, y: 150 },
            { id: 3, label: 'D', x: 200, y: 250 },
        ];

        const edges = data?.edges || [
            { from: 0, to: 1, label: '2' },
            { from: 0, to: 2, label: '3' },
            { from: 1, to: 2, label: '1' },
            { from: 1, to: 3, label: '4' },
            { from: 2, to: 3, label: '5' },
        ];

        // Treat as undirected for Prim
        const adj: Record<number, { to: number, weight: number }[]> = {};
        nodes.forEach(n => adj[n.id] = []);
        edges.forEach(e => {
            const w = parseInt(e.label || '1');
            adj[e.from].push({ to: e.to, weight: w });
            adj[e.to].push({ to: e.from, weight: w }); // Undirected
        });

        const key: Record<number, number> = {};
        const parent: Record<number, number> = {};
        const mstSet: Record<number, boolean> = {};

        nodes.forEach(n => {
            key[n.id] = Infinity;
            mstSet[n.id] = false;
        });

        key[nodes[0].id] = 0;
        parent[nodes[0].id] = -1;

        // Visual state
        const getGraph = (activeEdges: { from: number, to: number }[]) => ({
            nodes,
            edges: edges.map(e => {
                // Check if edge is in MST (activeEdges)
                // Since undirected, check both directions
                const isActive = activeEdges.some(ae =>
                    (ae.from === e.from && ae.to === e.to) || (ae.from === e.to && ae.to === e.from)
                );
                return isActive ? { ...e, style: { stroke: '#10B981', strokeWidth: 3 } } : e;
            })
        });

        steps.push({
            graph: getGraph([]),
            description: 'Khởi tạo: Chọn đỉnh A làm gốc. Key[A] = 0.',
            descriptionEn: 'Initialize: Select A as root. Key[A] = 0.',
            codeLines: { js: 12, python: 4, c: 11, cpp: 11 }
        });

        const mstEdges: { from: number, to: number }[] = [];

        for (let count = 0; count < nodes.length; count++) { // V iterations
            // Pick min key
            let u = -1;
            let min = Infinity;

            // Visual scan step (abstracted)
            nodes.forEach(n => {
                if (!mstSet[n.id] && key[n.id] < min) {
                    min = key[n.id];
                    u = n.id;
                }
            });

            if (u === -1) break;

            mstSet[u] = true;

            if (parent[u] !== -1) {
                mstEdges.push({ from: parent[u], to: u });
            }

            steps.push({
                graph: getGraph(mstEdges),
                highlights: [u],
                description: `Chọn đỉnh ${nodes.find(n => n.id === u)?.label} (Key=${min}) vào MST.`,
                descriptionEn: `Add node ${nodes.find(n => n.id === u)?.label} (Key=${min}) to MST.`,
                codeLines: { js: 16, python: 13, c: 15, cpp: 15 }
            });

            // Update adjacent
            for (const edge of adj[u]) {
                const v = edge.to;
                const weight = edge.weight;
                if (!mstSet[v] && weight < key[v]) {
                    parent[v] = u;
                    key[v] = weight;

                    steps.push({
                        graph: getGraph(mstEdges),
                        highlights: [u, v], // Exploring edge
                        description: `Cập nhật Key[${nodes.find(n => n.id === v)?.label}] = ${weight} (nhỏ hơn cũ). Parent[${nodes.find(n => n.id === v)?.label}] = ${nodes.find(n => n.id === u)?.label}.`,
                        descriptionEn: `Update Key[${nodes.find(n => n.id === v)?.label}] = ${weight}. Parent[${nodes.find(n => n.id === v)?.label}] = ${nodes.find(n => n.id === u)?.label}.`,
                        codeLines: { js: 21, python: 18, c: 19, cpp: 23 }
                    });
                }
            }
        }

        steps.push({
            graph: getGraph(mstEdges),
            description: '✅ Cây khung nhỏ nhất đã hoàn thành.',
            descriptionEn: '✅ Minimum Spanning Tree complete.',
            codeLines: { js: 25, python: 20, c: 21, cpp: 26 } // End
        });

        return steps;
    }
};
