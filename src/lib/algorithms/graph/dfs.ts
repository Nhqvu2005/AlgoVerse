import { AlgorithmInfo, AlgorithmStep, GraphData } from '../../types';

const defaultGraph: GraphData = {
    nodes: [
        { id: 0, label: '0', x: 200, y: 50 },
        { id: 1, label: '1', x: 80, y: 150 },
        { id: 2, label: '2', x: 320, y: 150 },
        { id: 3, label: '3', x: 30, y: 280 },
        { id: 4, label: '4', x: 150, y: 280 },
        { id: 5, label: '5', x: 270, y: 280 },
        { id: 6, label: '6', x: 380, y: 280 },
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
    description: 'Duyệt đồ thị theo chiều sâu, đi sâu nhất có thể trước khi quay lui (backtrack). Sử dụng ngăn xếp (Stack) hoặc đệ quy. Hữu ích cho phát hiện chu trình và tìm đường.',
    descriptionEn: 'Traverses the graph by going as deep as possible before backtracking. Uses a Stack or recursion. Useful for cycle detection and pathfinding.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    icon: '🏊',
    code: `function DFS(graph, start) {
  let visited = new Set();
  let stack = [start];
  
  while (stack.length > 0) {
    let node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      process(node);
      
      for (let neighbor of graph[node].reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}`,
    generateSteps: (input?: number[] | GraphData): AlgorithmStep[] => {
        const graph = (input && !Array.isArray(input)) ? input as GraphData : defaultGraph;
        const steps: AlgorithmStep[] = [];
        const visited: number[] = [];
        const stack: number[] = [0];
        const visitedEdges: [number, number][] = [];

        const adj: Map<number, number[]> = new Map();
        graph.nodes.forEach(n => adj.set(n.id, []));
        graph.edges.forEach(e => {
            adj.get(e.from)?.push(e.to);
            adj.get(e.to)?.push(e.from);
        });

        steps.push({
            graph,
            visited: [],
            queue: [0],
            description: `Bắt đầu DFS từ đỉnh 0. Thêm đỉnh 0 vào stack.`,
            descriptionEn: `Start DFS from vertex 0. Push vertex 0 onto the stack.`,
            codeLine: 2,
        });

        while (stack.length > 0) {
            const node = stack.pop()!;

            if (visited.includes(node)) continue;

            visited.push(node);

            steps.push({
                graph,
                visited: [...visited],
                current: node,
                queue: [...stack],
                edges: [...visitedEdges],
                description: `Lấy đỉnh ${node} từ stack và đánh dấu đã thăm. Stack: [${stack.join(', ')}]`,
                descriptionEn: `Pop vertex ${node} from stack and mark as visited. Stack: [${stack.join(', ')}]`,
                codeLine: 6,
            });

            const neighbors = (adj.get(node) || []).slice().reverse();
            for (const neighbor of neighbors) {
                if (!visited.includes(neighbor)) {
                    stack.push(neighbor);
                    visitedEdges.push([node, neighbor]);

                    steps.push({
                        graph,
                        visited: [...visited],
                        current: node,
                        queue: [...stack],
                        edges: [...visitedEdges],
                        description: `Push đỉnh ${neighbor} (kề của ${node}) vào stack. Stack: [${stack.join(', ')}]`,
                        descriptionEn: `Push vertex ${neighbor} (neighbor of ${node}) onto stack. Stack: [${stack.join(', ')}]`,
                        codeLine: 14,
                    });
                }
            }
        }

        steps.push({
            graph,
            visited: [...visited],
            edges: [...visitedEdges],
            description: `✅ DFS hoàn tất! Thứ tự duyệt: ${visited.join(' → ')}`,
            descriptionEn: `✅ DFS complete! Traversal order: ${visited.join(' → ')}`,
            codeLine: 18,
        });

        return steps;
    },
};
