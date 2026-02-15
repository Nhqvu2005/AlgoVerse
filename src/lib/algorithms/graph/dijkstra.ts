import { AlgorithmInfo, AlgorithmStep, GraphData } from '@/lib/types';

const code = `// Dijkstra's Algorithm
function dijkstra(graph, start) {
    const dist = {};
    const pq = new MinPriorityQueue();

    graph.nodes.forEach(n => dist[n] = Infinity);
    dist[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const u = pq.dequeue();
        
        for (const neighbor of graph.adj[u]) {
            const alt = dist[u] + neighbor.weight;
            if (alt < dist[neighbor.to]) {
                dist[neighbor.to] = alt;
                pq.enqueue(neighbor.to, alt);
            }
        }
    }
}`;

const codeLanguages = {
    js: code,
    python: `import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]

    while pq:
        d, u = heapq.heappop(pq)
        
        if d > dist[u]: continue
        
        for v, weight in graph[u].items():
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))`,
    c: `// Dijkstra in C (Abstract)
void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool sptSet[V];
    // Init dist = INT_MAX, sptSet = false
    
    dist[src] = 0;
    
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = true;
        
        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }`,
    cpp: `// Dijkstra in C++
void dijkstra(int src) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> dist(V, INF);
    
    pq.push(make_pair(0, src));
    dist[src] = 0;
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        for (auto x : adj[u]) {
            int v = x.first;
            int weight = x.second;
            
            if (dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                pq.push(make_pair(dist[v], v));
            }
        }
    }
}`
};

export const dijkstra: AlgorithmInfo = {
    slug: 'dijkstra',
    name: 'Dijkstra',
    nameVi: 'Thuật toán Dijkstra (Đường đi ngắn nhất)',
    description: 'Thuật toán Dijkstra tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả các đỉnh khác trong đồ thị có trọng số không âm.',
    descriptionEn: 'Dijkstra\'s algorithm finds the shortest path from a source node to all other nodes in a graph with non-negative edge weights.',
    category: 'graph',
    categoryVi: 'Đồ thị',
    timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
    spaceComplexity: 'O(V + E)',
    code,
    codeLanguages,
    icon: '⚡',
    inputType: 'graph',
    defaultInput: [], // Handled by default graph generation if empty
    guide: {
        input: 'Đồ thị có trọng số (Node, Edge weights).',
        inputEn: 'Weighted graph (Nodes, Edge weights).',
        conditions: 'Trọng số không âm.',
        conditionsEn: 'Non-negative weights.',
        output: 'Khoảng cách ngắn nhất từ đỉnh bắt đầu đến các đỉnh khác.',
        outputEn: 'Shortest distances from start node to others.',
        explanation: 'Sử dụng hàng đợi ưu tiên để tham lam chọn đỉnh gần nhất.',
        explanationEn: 'Uses a priority queue to greedily select the closest node.'
    },

    generateSteps: (data?: GraphData) => {
        const steps: AlgorithmStep[] = [];

        // Default graph if not provided
        const nodes = data?.nodes || [
            { id: 0, label: 'A', x: 100, y: 100 },
            { id: 1, label: 'B', x: 300, y: 50 },
            { id: 2, label: 'C', x: 300, y: 150 },
            { id: 3, label: 'D', x: 500, y: 100 },
        ];

        // Mock edges with weights for demo if not provided
        // Dijkstra needs weights. Standard GraphVisualizer might not show weights on edges easily 
        // unless edges have label.
        // I'll assume standard graph input form doesn't strictly support weights in the UI input parsing yet (it was just from-to).
        // But I can hardcode weights for default demo.
        const edges = data?.edges || [
            { from: 0, to: 1, label: '4' },
            { from: 0, to: 2, label: '1' },
            { from: 2, to: 1, label: '2' },
            { from: 1, to: 3, label: '5' },
            { from: 2, to: 3, label: '8' },
        ];

        // Parse weights
        const adj: Record<number, { to: number, weight: number }[]> = {};
        nodes.forEach(n => adj[n.id] = []);
        edges.forEach(e => {
            const w = parseInt(e.label || '1');
            adj[e.from].push({ to: e.to, weight: w });
            // Undirected? Usually we assume directed or handled. 
            // Let's assume directed for now or undirected? Dijkstra works on both.
            // Let's make it undirected for consistency with general graph demo?
            // Actually, directed is safer for weights demo to match arrows.
        });

        const startNode = nodes[0].id;
        const dist: Record<number, number> = {};
        nodes.forEach(n => dist[n.id] = Infinity);
        dist[startNode] = 0;

        const pq: { id: number, dist: number }[] = [{ id: startNode, dist: 0 }];
        const visited: number[] = [];

        // Additional visualization state: dist labels
        const getGraphWithDist = (activeDist: Record<number, number>) => ({
            nodes: nodes.map(n => ({
                ...n,
                label: `${n.label} (${activeDist[n.id] === Infinity ? '∞' : activeDist[n.id]})`
            })),
            edges
        });

        steps.push({
            graph: getGraphWithDist(dist),
            description: `Khởi tạo: Khoảng cách từ ${nodes[0].label} là 0, các đỉnh khác là ∞.`,
            descriptionEn: `Initialize: Distance from ${nodes[0].label} is 0, others ∞.`,
            codeLines: { js: 6, python: 6, c: 9, cpp: 4 }
        });

        while (pq.length > 0) {
            pq.sort((a, b) => a.dist - b.dist);
            const { id: u, dist: d } = pq.shift()!;

            if (d > dist[u]) continue;

            steps.push({
                graph: getGraphWithDist(dist),
                highlights: [u],
                visited: [...visited],
                description: `Chọn đỉnh ${nodes.find(n => n.id === u)?.label} (dist=${d}) từ hàng đợi ưu tiên.`,
                descriptionEn: `Select node ${nodes.find(n => n.id === u)?.label} (dist=${d}) from priority queue.`,
                codeLines: { js: 11, python: 10, c: 13, cpp: 8 }
            });

            visited.push(u);

            for (const edge of adj[u] || []) {
                const v = edge.to;
                const weight = edge.weight;

                // Highlight edge being checked
                steps.push({
                    graph: getGraphWithDist(dist),
                    highlights: [u, v], // Highlight edge u-v? GraphVisualizer highlights nodes.
                    visited: [...visited],
                    description: `Kiểm tra cạnh ${nodes.find(n => n.id === u)?.label} -> ${nodes.find(n => n.id === v)?.label} (weight=${weight}).`,
                    descriptionEn: `Check edge ${nodes.find(n => n.id === u)?.label} -> ${nodes.find(n => n.id === v)?.label} (weight=${weight}).`,
                    codeLines: { js: 13, python: 13, c: 17, cpp: 12 }
                });

                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.push({ id: v, dist: dist[v] });

                    steps.push({
                        graph: getGraphWithDist(dist), // Update label with new dist
                        highlights: [v],
                        visited: [...visited],
                        description: `Cập nhật khoảng cách tới ${nodes.find(n => n.id === v)?.label}: ${dist[v]}.`,
                        descriptionEn: `Update distance to ${nodes.find(n => n.id === v)?.label}: ${dist[v]}.`,
                        codeLines: { js: 15, python: 15, c: 19, cpp: 14 }
                    });
                }
            }
        }

        steps.push({
            graph: getGraphWithDist(dist),
            visited: nodes.map(n => n.id),
            description: '✅ Hoàn tất thuật toán Dijkstra.',
            descriptionEn: '✅ Dijkstra algorithm complete.',
            codeLines: { js: 23, python: 20, c: 22, cpp: 22 } // End
        });

        return steps;
    }
};
