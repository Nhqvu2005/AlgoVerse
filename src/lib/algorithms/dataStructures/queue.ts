import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const queue: AlgorithmInfo = {
    slug: 'queue',
    name: 'Queue',
    nameVi: 'Hàng đợi',
    category: 'data-structure',
    categoryVi: 'Cấu trúc dữ liệu',
    description: 'Cấu trúc dữ liệu FIFO (First In, First Out). Phần tử được thêm vào cuối và lấy ra từ đầu. Giống như hàng đợi mua vé.',
    descriptionEn: 'FIFO (First In, First Out) data structure. Elements are added at the rear and removed from the front. Like a ticket queue.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    icon: '🚶‍♂️',
    inputType: 'none',
    guide: {
        input: 'Các thao tác: enqueue (thêm vào cuối) và dequeue (lấy ra từ đầu).',
        inputEn: 'Operations: enqueue (add to rear) and dequeue (remove from front).',
        conditions: 'Dequeue chỉ thực hiện được khi queue không rỗng.',
        conditionsEn: 'Dequeue can only be performed when the queue is not empty.',
        output: 'Với dequeue: phần tử được lấy ra là phần tử đầu tiên được thêm vào (FIFO).',
        outputEn: 'For dequeue: the removed element is the first one that was added (FIFO).',
        explanation: 'FIFO: phần tử vào trước ra trước. Enqueue O(1) thêm vào cuối. Dequeue O(1) lấy từ đầu. Ứng dụng: BFS, hàng đợi in, xử lý tác vụ theo thứ tự.',
        explanationEn: 'FIFO: first in, first out. Enqueue O(1) adds to rear. Dequeue O(1) removes from front. Used in: BFS, print queue, task scheduling.',
    },
    code: `class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}`,
    codeLanguages: {
        js: `class Queue {
  constructor() { this.items = []; }
  enqueue(el) { this.items.push(el); }
  dequeue()   { return this.items.shift(); }
  front()     { return this.items[0]; }
  isEmpty()   { return this.items.length === 0; }
}`,
        python: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    def enqueue(self, el):
        self.items.append(el)
    def dequeue(self):
        return self.items.popleft()
    def front(self):
        return self.items[0]
    def is_empty(self):
        return len(self.items) == 0`,
        c: `#define MAX 100
int queue[MAX], front = 0, rear = -1;

void enqueue(int val) {
    if (rear < MAX - 1)
        queue[++rear] = val;
}
int dequeue() {
    if (front <= rear)
        return queue[front++];
    return -1;
}
int peek() {
    return (front <= rear) ? queue[front] : -1;
}`,
        cpp: `class Queue {
    deque<int> items;
public:
    void enqueue(int el) { items.push_back(el); }
    int dequeue() {
        int val = items.front();
        items.pop_front();
        return val;
    }
    int front() { return items.front(); }
    bool isEmpty() { return items.empty(); }
};`,
    },
    generateSteps: (): AlgorithmStep[] => {
        const steps: AlgorithmStep[] = [];
        const q: number[] = [];

        steps.push({
            queueData: [...q], operation: 'init',
            description: 'Khởi tạo Queue rỗng.',
            descriptionEn: 'Initialize an empty Queue.',
            codeLine: 1,
        });

        const ops = [
            { type: 'enqueue', val: 10 }, { type: 'enqueue', val: 20 },
            { type: 'enqueue', val: 30 }, { type: 'front' },
            { type: 'dequeue' }, { type: 'enqueue', val: 40 },
            { type: 'dequeue' }, { type: 'dequeue' },
        ];

        for (const op of ops) {
            if (op.type === 'enqueue') {
                q.push(op.val!);
                steps.push({
                    queueData: [...q], activeNode: op.val, operation: 'enqueue',
                    description: `Enqueue ${op.val}. Queue: [${q.join(', ')}]`,
                    descriptionEn: `Enqueue ${op.val}. Queue: [${q.join(', ')}]`,
                    codeLine: 5,
                });
            } else if (op.type === 'dequeue') {
                const val = q.shift();
                steps.push({
                    queueData: [...q], activeNode: val, operation: 'dequeue',
                    description: `Dequeue ${val} (phần tử đầu). Queue: [${q.join(', ')}]`,
                    descriptionEn: `Dequeue ${val} (front element). Queue: [${q.join(', ')}]`,
                    codeLine: 7,
                });
            } else if (op.type === 'front') {
                const val = q[0];
                steps.push({
                    queueData: [...q], activeNode: val, operation: 'front',
                    description: `Front: phần tử đầu = ${val}. Queue không thay đổi.`,
                    descriptionEn: `Front: first element = ${val}. Queue unchanged.`,
                    codeLine: 12,
                });
            }
        }

        steps.push({
            queueData: [...q],
            description: `✅ Hoàn tất demo Queue! Queue cuối: [${q.join(', ')}]`,
            descriptionEn: `✅ Queue demo complete! Final queue: [${q.join(', ')}]`,
            codeLine: 17,
        });
        return steps;
    },
};
