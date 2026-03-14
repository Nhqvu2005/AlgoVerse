import { AlgorithmInfo, AlgorithmStep, TreeNode } from '@/lib/types';

// Simplified Heap implementation for generating steps
class MinHeap {
    heap: number[];
    steps: AlgorithmStep[];

    constructor() {
        this.heap = [];
        this.steps = [];
    }

    getParentIndex(i: number) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i: number) { return 2 * i + 1; }
    getRightChildIndex(i: number) { return 2 * i + 2; }

    swap(i1: number, i2: number) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }

    insert(value: number) {
        this.heap.push(value);
        this.addStep(`Chèn ${value} vào cuối hàng đợi ưu tiên (Heap).`, `Insert ${value} at end of priority queue (Heap).`, this.heap.length - 1);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.getParentIndex(index) >= 0) {
            const parentIndex = this.getParentIndex(index);

            this.addStep(
                `So sánh ${this.heap[index]} và cha ${this.heap[parentIndex]}.`,
                `Compare ${this.heap[index]} with parent ${this.heap[parentIndex]}.`,
                index, [index, parentIndex]
            );

            if (this.heap[parentIndex] > this.heap[index]) {
                this.swap(parentIndex, index);
                this.addStep(
                    `${this.heap[parentIndex]} > ${this.heap[index]} (Sai quy tắc Min Heap). Đổi chỗ.`,
                    `${this.heap[parentIndex]} > ${this.heap[index]} (Violates Min Heap). Swap.`,
                    parentIndex, [index, parentIndex]
                );
                index = parentIndex;
            } else {
                this.addStep(
                    `${this.heap[parentIndex]} <= ${this.heap[index]} (Đúng quy tắc). Dừng.`,
                    `${this.heap[parentIndex]} <= ${this.heap[index]} (Correct). Stop.`,
                    index
                );
                break;
            }
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];

        if (this.heap.length === 1) {
            this.heap.pop();
            this.addStep(`Lấy phần tử nhỏ nhất ${min}. Heap rỗng.`, `Extract min ${min}. Heap empty.`);
            return min;
        }

        this.steps.push({
            tree: this.toTree(),
            description: `Lấy phần tử nhỏ nhất (gốc) ${min}.`,
            descriptionEn: `Extract min (root) ${min}.`,
            highlights: [0],
        });

        this.heap[0] = this.heap.pop()!;
        this.addStep(
            `Di chuyển phần tử cuối ${this.heap[0]} lên gốc để lấp chỗ trống.`,
            `Move last element ${this.heap[0]} to root to fill gap.`,
            0
        );

        this.heapifyDown();
        return min;
    }

    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length && this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            this.addStep(
                `So sánh ${this.heap[index]} với con nhỏ hơn ${this.heap[smallerChildIndex]}.`,
                `Compare ${this.heap[index]} with smaller child ${this.heap[smallerChildIndex]}.`,
                index, [index, smallerChildIndex]
            );

            if (this.heap[index] > this.heap[smallerChildIndex]) {
                this.swap(index, smallerChildIndex);
                this.addStep(
                    `${this.heap[smallerChildIndex]} < ${this.heap[index]}. Đổi chỗ để duy trì Min Heap.`,
                    `${this.heap[smallerChildIndex]} < ${this.heap[index]}. Swap to maintain Min Heap.`,
                    smallerChildIndex, [index, smallerChildIndex]
                );
                index = smallerChildIndex;
            } else {
                this.addStep(
                    `${this.heap[index]} nhỏ hơn các con. Dừng.`,
                    `${this.heap[index]} is smaller than children. Stop.`,
                    index
                );
                break;
            }
        }
    }

    addStep(desc: string, descEn: string, activeIdx?: number, highlights?: number[]) {
        this.steps.push({
            tree: this.toTree(activeIdx, highlights),
            description: desc,
            descriptionEn: descEn,
            // Map flat array logic to tree visualizer
            codeLines: { js: 5, python: 5, c: 5, cpp: 5 } // Using arbitrary line as proxy for now
        });
    }

    toTree(activeIdx?: number, highlights: number[] = []): TreeNode | null {
        if (this.heap.length === 0) return null;
        return this.buildTree(0, activeIdx, highlights);
    }

    buildTree(i: number, activeIdx?: number, highlights: number[] = []): TreeNode | null {
        if (i >= this.heap.length) return null;

        const node: TreeNode = {
            value: this.heap[i],
            highlighted: highlights.includes(i) || i === activeIdx,
            isNew: i === activeIdx && highlights.length === 0 // rough heuristic
        };

        node.left = this.buildTree(2 * i + 1, activeIdx, highlights);
        node.right = this.buildTree(2 * i + 2, activeIdx, highlights);

        return node;
    }
}

const code = `// Min Heap (Priority Queue)
class MinHeap {
    constructor() { this.heap = []; }
    
    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }
    
    extractMin() {
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }
}`;

const codeLanguages = {
    js: code,
    python: `import heapq
min_heap = []
heapq.heappush(min_heap, val)
min_val = heapq.heappop(min_heap)`,
    c: `// C usually implements heap manually using array
void insert(int val) { ... }
int extractMin() { ... }`,
    cpp: `#include <queue>
priority_queue<int, vector<int>, greater<int>> minHeap;
minHeap.push(val);
int min = minHeap.top(); minHeap.pop();`
};

export const heap: AlgorithmInfo = {
    slug: 'heap',
    name: 'Min Heap',
    nameVi: 'Min Heap (Hàng đợi ưu tiên)',
    description: 'Min Heap là cây nhị phân hoàn chỉnh mà mỗi nút cha luôn nhỏ hơn hoặc bằng các nút con.',
    descriptionEn: 'Min Heap is a complete binary tree where every parent node is smaller than or equal to its children.',
    category: 'data-structure',
    categoryVi: 'Cấu trúc DL',
    difficulty: 'intermediate',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    code,
    codeLanguages,
    icon: '🔻',
    inputType: 'none', // Demo mode
    guide: {
        input: 'Danh sách số.',
        inputEn: 'List of numbers.',
        conditions: 'Cha <= Con.',
        conditionsEn: 'Parent <= Child.',
        output: 'Trạng thái cây sau các thao tác.',
        outputEn: 'Tree state after operations.',
        explanation: 'Min Heap là cây nhị phân đặc biệt: mỗi nút cha luôn ≤ các con. Phần tử nhỏ nhất luôn ở gốc → lấy min chỉ O(1). Khi chèn: thêm vào cuối rồi "nổi" lên (HeapifyUp) để duy trì tính chất. Khi lấy min: thay gốc bằng phần tử cuối rồi "chìm" xuống (HeapifyDown). Ứng dụng: Priority Queue, thuật toán Dijkstra, Heap Sort.',
        explanationEn: 'Min Heap is a special binary tree: every parent ≤ its children. Smallest element is always at root → get min in O(1). Insert: add to end then "bubble up" (HeapifyUp). Extract min: replace root with last element then "sink down" (HeapifyDown). Used in: Priority Queue, Dijkstra, Heap Sort.'
    },

    generateSteps: () => {
        const mh = new MinHeap();

        // Init
        mh.addStep('Khởi tạo Heap rỗng.', 'Initialize empty Heap.');

        const values = [10, 5, 20, 2, 8];
        for (const v of values) {
            mh.insert(v);
        }

        mh.extractMin();

        mh.addStep('✅ Hoàn tất demo Heap.', '✅ Heap demo complete.');
        return mh.steps;
    }
};
