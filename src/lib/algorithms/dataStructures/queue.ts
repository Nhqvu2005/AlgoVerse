import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const queue: AlgorithmInfo = {
    slug: 'queue',
    name: 'Queue',
    nameVi: 'Hàng đợi',
    category: 'data-structure',
    categoryVi: 'Cấu trúc Dữ liệu',
    description: 'Cấu trúc dữ liệu FIFO (First In, First Out) — phần tử vào trước sẽ ra trước. Giống như hàng đợi mua vé: người đến trước được phục vụ trước.',
    descriptionEn: 'FIFO (First In, First Out) data structure — the first element added is the first removed. Like a ticket queue: first come, first served.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    icon: '🚶',
    code: `class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  
  front() {
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`,
    generateSteps: (): AlgorithmStep[] => {
        const steps: AlgorithmStep[] = [];
        const q: number[] = [];
        const operations = [
            { op: 'enqueue', val: 10 },
            { op: 'enqueue', val: 20 },
            { op: 'enqueue', val: 30 },
            { op: 'front', val: 0 },
            { op: 'dequeue', val: 0 },
            { op: 'enqueue', val: 40 },
            { op: 'dequeue', val: 0 },
            { op: 'enqueue', val: 50 },
        ];

        steps.push({
            queueData: [],
            operation: 'init',
            description: 'Khởi tạo Queue rỗng. Queue hoạt động theo nguyên tắc FIFO (First In, First Out).',
            descriptionEn: 'Initialize empty Queue. Queue follows FIFO (First In, First Out) principle.',
            codeLine: 1,
        });

        for (const { op, val } of operations) {
            if (op === 'enqueue') {
                q.push(val);
                steps.push({
                    queueData: [...q],
                    activeNode: q.length - 1,
                    operation: `enqueue(${val})`,
                    description: `Enqueue ${val} vào cuối hàng đợi. Queue: [${q.join(', ')}]`,
                    descriptionEn: `Enqueue ${val} at the back. Queue: [${q.join(', ')}]`,
                    codeLine: 6,
                });
            } else if (op === 'dequeue') {
                const dequeued = q.shift();
                steps.push({
                    queueData: [...q],
                    operation: `dequeue() → ${dequeued}`,
                    description: `Dequeue ${dequeued} từ đầu hàng đợi. Queue: [${q.join(', ')}]`,
                    descriptionEn: `Dequeue ${dequeued} from the front. Queue: [${q.join(', ')}]`,
                    codeLine: 10,
                });
            } else if (op === 'front') {
                steps.push({
                    queueData: [...q],
                    activeNode: 0,
                    operation: `front() → ${q[0]}`,
                    description: `Front: phần tử đầu hàng đợi = ${q[0]} (không xóa).`,
                    descriptionEn: `Front: first element = ${q[0]} (not removed).`,
                    codeLine: 15,
                });
            }
        }

        steps.push({
            queueData: [...q],
            description: `✅ Demo Queue hoàn tất! Queue hiện tại: [${q.join(', ')}]`,
            descriptionEn: `✅ Queue demo complete! Current queue: [${q.join(', ')}]`,
            codeLine: 20,
        });

        return steps;
    },
};
