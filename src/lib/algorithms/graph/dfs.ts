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

export const dfs: AlgorithmInfo = {
    slug: 'dfs',
    name: 'Depth-First Search',
    nameVi: 'Tìm kiếm theo Chiều sâu',
    category: 'graph',
    categoryVi: 'Đồ thị',
    difficulty: 'intermediate',
    description: 'Duyệt đồ thị bằng cách đi sâu nhất có thể trước khi quay lui. Sử dụng ngăn xếp (Stack) hoặc đệ quy để quản lý thứ tự duyệt.',
    descriptionEn: 'Traverses a graph by going as deep as possible before backtracking. Uses a Stack or recursion to manage traversal order.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    icon: '🏊',
    inputType: 'graph',
    guide: {
        input: 'Đồ thị gồm các đỉnh và cạnh, cùng đỉnh bắt đầu (mặc định đỉnh 0).',
        inputEn: 'A graph with nodes and edges, and a starting node (default node 0).',
        conditions: 'Đồ thị có thể có hướng hoặc vô hướng. Đỉnh bắt đầu phải tồn tại.',
        conditionsEn: 'Graph can be directed or undirected. Starting node must exist.',
        output: 'Thứ tự duyệt các đỉnh theo chiều sâu.',
        outputEn: 'The order in which nodes are visited in depth-first order.',
        explanation: 'DFS đặt đỉnh bắt đầu vào ngăn xếp. Lặp lại: lấy đỉnh đầu stack, đánh dấu đã thăm, đẩy các đỉnh kề chưa thăm vào stack. Kết quả: duyệt hết một nhánh trước khi quay lại (backtrack) và duyệt nhánh kế tiếp.',
        explanationEn: 'DFS pushes the start node onto a stack. Repeat: pop the top node, mark as visited, push all unvisited neighbors. Result: fully explores one branch before backtracking to the next.',
    },
    code: `function dfs(graph, start) {
  let visited = new Set();
  let stack = [start];
  while (stack.length > 0) {
    let node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    // Process node
    for (let neighbor of graph[node].reverse()) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}`,
    codeLanguages: {
        js: `function dfs(graph, start) {
  let visited = new Set();
  let stack = [start];
  while (stack.length > 0) {
    let node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    for (let neighbor of graph[node].reverse()) {
      if (!visited.has(neighbor))
        stack.push(neighbor);
    }
  }
}`,
        python: `def dfs(graph, start):
    visited = set()
    stack = [start]
    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append(neighbor)`,
        c: `void dfs(int graph[][MAX], int n, int start) {
    int visited[MAX] = {0};
    int stack[MAX], top = -1;
    stack[++top] = start;
    while (top >= 0) {
        int node = stack[top--];
        if (visited[node]) continue;
        visited[node] = 1;
        for (int i = n - 1; i >= 0; i--) {
            if (graph[node][i] && !visited[i])
                stack[++top] = i;
        }
    }
}`,
        cpp: `void dfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    stack<int> st;
    st.push(start);
    while (!st.empty()) {
        int node = st.top(); st.pop();
        if (visited[node]) continue;
        visited[node] = true;
        for (auto it = graph[node].rbegin();
             it != graph[node].rend(); ++it) {
            if (!visited[*it]) st.push(*it);
        }
    }
}`,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateSteps: (input?: any): AlgorithmStep[] => {
        const graph: GraphData = (input && input.nodes) ? input : defaultGraph;
        const steps: AlgorithmStep[] = [];

        const adj: Map<number, number[]> = new Map();
        graph.nodes.forEach(n => adj.set(n.id, []));
        graph.edges.forEach(e => {
            adj.get(e.from)?.push(e.to);
            if (!graph.directed) adj.get(e.to)?.push(e.from);
        });

        const visited: number[] = [];
        const stack: number[] = [graph.nodes[0].id];
        const visitedSet = new Set<number>();
        const traversedEdges: [number, number][] = [];

        steps.push({
            graph, visited: [], queue: [...stack], current: graph.nodes[0].id, edges: [],
            description: `Bắt đầu DFS từ đỉnh ${graph.nodes[0].label}. Đẩy vào stack.`,
            descriptionEn: `Start DFS from node ${graph.nodes[0].label}. Push onto stack.`,
            codeLine: 2,
            codeLines: { js: 60, python: 73, c: 85, cpp: 99 },
        });

        while (stack.length > 0) {
            const node = stack.pop()!;
            if (visitedSet.has(node)) continue;

            visitedSet.add(node);
            visited.push(node);

            steps.push({
                graph, visited: [...visited], queue: [...stack], current: node, edges: [...traversedEdges],
                description: `Pop đỉnh ${node} từ stack. Đánh dấu đã thăm. Stack: [${stack.join(', ')}]`,
                descriptionEn: `Pop node ${node} from stack. Mark as visited. Stack: [${stack.join(', ')}]`,
                codeLine: 4,
                codeLines: { js: 62, python: 75, c: 87, cpp: 101 },
            });

            const neighbors = (adj.get(node) || []).slice().reverse();
            for (const neighbor of neighbors) {
                if (!visitedSet.has(neighbor)) {
                    stack.push(neighbor);
                    traversedEdges.push([node, neighbor]);

                    steps.push({
                        graph, visited: [...visited], queue: [...stack], current: node, edges: [...traversedEdges],
                        description: `Đẩy đỉnh ${neighbor} (kề với ${node}) vào stack. Stack: [${stack.join(', ')}]`,
                        descriptionEn: `Push node ${neighbor} (neighbor of ${node}) onto stack. Stack: [${stack.join(', ')}]`,
                        codeLine: 9,
                        codeLines: { js: 67, python: 81, c: 92, cpp: 106 },
                    });
                }
            }
        }

        steps.push({
            graph, visited: [...visited], queue: [], edges: [...traversedEdges],
            description: `✅ DFS hoàn tất! Thứ tự duyệt: [${visited.join(' → ')}]`,
            descriptionEn: `✅ DFS complete! Traversal order: [${visited.join(' → ')}]`,
            codeLine: 14,
            codeLines: { js: 70, python: 81, c: 95, cpp: 109 },
        });
        return steps;
    },
};
