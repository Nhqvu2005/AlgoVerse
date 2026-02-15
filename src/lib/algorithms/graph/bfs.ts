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

export const bfs: AlgorithmInfo = {
    slug: 'bfs',
    name: 'Breadth-First Search',
    nameVi: 'Tìm kiếm theo Chiều rộng',
    category: 'graph',
    categoryVi: 'Đồ thị',
    description: 'Duyệt đồ thị theo chiều rộng, thăm tất cả đỉnh kề trước khi đi xa hơn. Sử dụng hàng đợi (Queue). BFS đảm bảo tìm đường đi ngắn nhất trong đồ thị không có trọng số.',
    descriptionEn: 'Traverses the graph level by level, visiting all adjacent vertices before going deeper. Uses a Queue. BFS guarantees the shortest path in unweighted graphs.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    icon: '🌊',
    code: `function BFS(graph, start) {
  let visited = new Set();
  let queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    let node = queue.shift();
    process(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
    generateSteps: (input?: number[] | GraphData): AlgorithmStep[] => {
        const graph = (input && !Array.isArray(input)) ? input as GraphData : defaultGraph;
        const steps: AlgorithmStep[] = [];
        const visited: number[] = [];
        const queue: number[] = [0];
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
            description: `Bắt đầu BFS từ đỉnh 0. Thêm đỉnh 0 vào hàng đợi.`,
            descriptionEn: `Start BFS from vertex 0. Add vertex 0 to the queue.`,
            codeLine: 2,
        });

        visited.push(0);

        while (queue.length > 0) {
            const node = queue.shift()!;

            steps.push({
                graph,
                visited: [...visited],
                current: node,
                queue: [...queue],
                edges: [...visitedEdges],
                description: `Lấy đỉnh ${node} từ hàng đợi. Queue: [${queue.join(', ')}]`,
                descriptionEn: `Dequeue vertex ${node}. Queue: [${queue.join(', ')}]`,
                codeLine: 6,
            });

            const neighbors = adj.get(node) || [];
            for (const neighbor of neighbors) {
                if (!visited.includes(neighbor)) {
                    visited.push(neighbor);
                    queue.push(neighbor);
                    visitedEdges.push([node, neighbor]);

                    steps.push({
                        graph,
                        visited: [...visited],
                        current: node,
                        queue: [...queue],
                        edges: [...visitedEdges],
                        description: `Thăm đỉnh ${neighbor} (kề của ${node}). Thêm vào queue. Queue: [${queue.join(', ')}]`,
                        descriptionEn: `Visit vertex ${neighbor} (neighbor of ${node}). Enqueue. Queue: [${queue.join(', ')}]`,
                        codeLine: 12,
                    });
                }
            }
        }

        steps.push({
            graph,
            visited: [...visited],
            edges: [...visitedEdges],
            description: `✅ BFS hoàn tất! Thứ tự duyệt: ${visited.join(' → ')}`,
            descriptionEn: `✅ BFS complete! Traversal order: ${visited.join(' → ')}`,
            codeLine: 16,
        });

        return steps;
    },
};
