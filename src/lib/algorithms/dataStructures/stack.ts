import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const stack: AlgorithmInfo = {
    slug: 'stack',
    name: 'Stack',
    nameVi: 'Ngăn xếp',
    category: 'data-structure',
    categoryVi: 'Cấu trúc Dữ liệu',
    description: 'Cấu trúc dữ liệu LIFO (Last In, First Out) — phần tử vào sau sẽ ra trước. Giống như một chồng đĩa: bạn chỉ có thể lấy đĩa trên cùng.',
    descriptionEn: 'LIFO (Last In, First Out) data structure — the last element added is the first removed. Like a stack of plates: you can only take the top one.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    icon: '📚',
    code: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`,
    generateSteps: (): AlgorithmStep[] => {
        const steps: AlgorithmStep[] = [];
        const s: number[] = [];
        const operations = [
            { op: 'push', val: 10 },
            { op: 'push', val: 20 },
            { op: 'push', val: 30 },
            { op: 'peek', val: 0 },
            { op: 'pop', val: 0 },
            { op: 'push', val: 40 },
            { op: 'pop', val: 0 },
            { op: 'pop', val: 0 },
        ];

        steps.push({
            stack: [],
            operation: 'init',
            description: 'Khởi tạo Stack rỗng. Stack hoạt động theo nguyên tắc LIFO (Last In, First Out).',
            descriptionEn: 'Initialize empty Stack. Stack follows LIFO (Last In, First Out) principle.',
            codeLine: 1,
        });

        for (const { op, val } of operations) {
            if (op === 'push') {
                s.push(val);
                steps.push({
                    stack: [...s],
                    activeNode: s.length - 1,
                    operation: `push(${val})`,
                    description: `Push ${val} vào đỉnh stack. Stack: [${s.join(', ')}]`,
                    descriptionEn: `Push ${val} onto top of stack. Stack: [${s.join(', ')}]`,
                    codeLine: 6,
                });
            } else if (op === 'pop') {
                const popped = s.pop();
                steps.push({
                    stack: [...s],
                    operation: `pop() → ${popped}`,
                    description: `Pop ${popped} từ đỉnh stack. Stack: [${s.join(', ')}]`,
                    descriptionEn: `Pop ${popped} from top of stack. Stack: [${s.join(', ')}]`,
                    codeLine: 10,
                });
            } else if (op === 'peek') {
                const top = s[s.length - 1];
                steps.push({
                    stack: [...s],
                    activeNode: s.length - 1,
                    operation: `peek() → ${top}`,
                    description: `Peek: phần tử đỉnh stack = ${top} (không xóa).`,
                    descriptionEn: `Peek: top element = ${top} (not removed).`,
                    codeLine: 15,
                });
            }
        }

        steps.push({
            stack: [...s],
            description: `✅ Demo Stack hoàn tất! Stack hiện tại: [${s.join(', ')}]`,
            descriptionEn: `✅ Stack demo complete! Current stack: [${s.join(', ')}]`,
            codeLine: 20,
        });

        return steps;
    },
};
