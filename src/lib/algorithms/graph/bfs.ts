import { AlgorithmInfo, AlgorithmStep, GraphData } from '../../types';

const defaultGraph: GraphData = {
    nodes: [
        { id: 0, label: '0', x: 200, y: 30 },
        { id: 1, label: '1', x: 100, y: 120 },
        { id: 2, label: '2', x: 300, y: 120 },
        { id: 3, label: '3', x: 50, y: 220 },
        { id: 4, label: '4', x: 150, y: 220 },
        { id: 5, label: '5', x: 250, y: 220 },
        { id: 6, label: '6', x: 350, y: 220 },
    ],
    edges: [
        { from: 0, to: 1 }, { from: 0, to: 2 },
        { from: 1, to: 3 }, { from: 1, to: 4 },
        { from: 2, to: 5 }, { from: 2, to: 6 },
    ],
};

export const bfs: AlgorithmInfo = {
    slug: 'bfs',
    name: 'Breadth-First Search',
    nameVi: 'Tìm kiếm theo Chiều rộng',
    category: 'graph',
    categoryVi: 'Đồ thị',
    difficulty: 'intermediate',
    description: 'Duyệt đồ thị theo từng tầng, bắt đầu từ nút gốc. Sử dụng hàng đợi (Queue) để quản lý thứ tự duyệt. Đảm bảo tìm đường ngắn nhất trong đồ thị không trọng số.',
    descriptionEn: 'Traverses a graph level by level, starting from the root node. Uses a Queue to manage traversal order. Guarantees shortest path in unweighted graphs.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    icon: '🌊',
    inputType: 'graph',
    guide: {
        input: 'Đồ thị gồm các đỉnh và cạnh, cùng đỉnh bắt đầu (mặc định đỉnh 0).',
        inputEn: 'A graph with nodes and edges, and a starting node (default node 0).',
        conditions: 'Đồ thị có thể có hướng hoặc vô hướng. Đỉnh bắt đầu phải tồn tại trong đồ thị.',
        conditionsEn: 'Graph can be directed or undirected. Starting node must exist in the graph.',
        output: 'Thứ tự duyệt các đỉnh theo chiều rộng (level-order).',
        outputEn: 'The order in which nodes are visited in breadth-first (level-order) order.',
        explanation: 'BFS đặt đỉnh bắt đầu vào hàng đợi. Lặp lại: lấy đỉnh đầu hàng đợi, đánh dấu đã thăm, thêm các đỉnh kề chưa thăm vào cuối hàng đợi. Kết quả là các đỉnh được duyệt theo tầng (gần gốc trước).',
        explanationEn: 'BFS enqueues the starting node. Repeat: dequeue the front node, mark as visited, and enqueue all unvisited neighbors. Result: nodes are visited level by level (closest to root first).',
    },
    code: `function bfs(graph, start) {
  let visited = new Set();
  let queue = [start];
  visited.add(start);
  while (queue.length > 0) {
    let node = queue.shift();
    // Process node
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
    codeLanguages: {
        js: `function bfs(graph, start) {
  let visited = new Set();
  let queue = [start];
  visited.add(start);
  while (queue.length > 0) {
    let node = queue.shift();
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
        python: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
        c: `void bfs(int graph[][MAX], int n, int start) {
    int visited[MAX] = {0};
    int queue[MAX], front = 0, rear = 0;
    queue[rear++] = start;
    visited[start] = 1;
    while (front < rear) {
        int node = queue[front++];
        for (int i = 0; i < n; i++) {
            if (graph[node][i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
            }
        }
    }
}`,
        cpp: `void bfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateSteps: (input?: any): AlgorithmStep[] => {
        const graph: GraphData = (input && input.nodes) ? input : defaultGraph;
        const steps: AlgorithmStep[] = [];

        // Build adjacency list
        const adj: Map<number, number[]> = new Map();
        graph.nodes.forEach(n => adj.set(n.id, []));
        graph.edges.forEach(e => {
            adj.get(e.from)?.push(e.to);
            if (!graph.directed) adj.get(e.to)?.push(e.from);
        });

        const visited: number[] = [];
        const queue: number[] = [graph.nodes[0].id];
        const visitedSet = new Set<number>([graph.nodes[0].id]);
        const traversedEdges: [number, number][] = [];

        steps.push({
            graph, visited: [], queue: [...queue], current: graph.nodes[0].id, edges: [],
            description: `Bắt đầu BFS từ đỉnh ${graph.nodes[0].label}. Thêm vào hàng đợi.`,
            descriptionEn: `Start BFS from node ${graph.nodes[0].label}. Add to queue.`,
            codeLine: 2,
            codeLines: { js: 60, python: 76, c: 87, cpp: 102 },
        });

        while (queue.length > 0) {
            const node = queue.shift()!;
            visited.push(node);

            steps.push({
                graph, visited: [...visited], queue: [...queue], current: node, edges: [...traversedEdges],
                description: `Lấy đỉnh ${node} từ hàng đợi. Đánh dấu đã thăm. Queue: [${queue.join(', ')}]`,
                descriptionEn: `Dequeue node ${node}. Mark as visited. Queue: [${queue.join(', ')}]`,
                codeLine: 5,
                codeLines: { js: 63, python: 79, c: 90, cpp: 105 },
            });

            const neighbors = adj.get(node) || [];
            for (const neighbor of neighbors) {
                if (!visitedSet.has(neighbor)) {
                    visitedSet.add(neighbor);
                    queue.push(neighbor);
                    traversedEdges.push([node, neighbor]);

                    steps.push({
                        graph, visited: [...visited], queue: [...queue], current: node, edges: [...traversedEdges],
                        description: `Thêm đỉnh ${neighbor} (kề với ${node}) vào hàng đợi. Queue: [${queue.join(', ')}]`,
                        descriptionEn: `Enqueue node ${neighbor} (neighbor of ${node}). Queue: [${queue.join(', ')}]`,
                        codeLine: 9,
                        codeLines: { js: 67, python: 83, c: 94, cpp: 109 },
                    });
                }
            }
        }

        steps.push({
            graph, visited: [...visited], queue: [], edges: [...traversedEdges],
            description: `✅ BFS hoàn tất! Thứ tự duyệt: [${visited.join(' → ')}]`,
            descriptionEn: `✅ BFS complete! Traversal order: [${visited.join(' → ')}]`,
            codeLine: 13,
            codeLines: { js: 71, python: 83, c: 98, cpp: 113 },
        });
        return steps;
    },
};
