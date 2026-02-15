import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const stack: AlgorithmInfo = {
    slug: 'stack',
    name: 'Stack',
    nameVi: 'Ngăn xếp',
    category: 'data-structure',
    categoryVi: 'Cấu trúc dữ liệu',
    description: 'Cấu trúc dữ liệu LIFO (Last In, First Out). Phần tử được thêm và lấy ra từ cùng một đầu (đỉnh). Giống như chồng đĩa.',
    descriptionEn: 'LIFO (Last In, First Out) data structure. Elements are added and removed from the same end (top). Like a stack of plates.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    icon: '📚',
    inputType: 'none',
    guide: {
        input: 'Các thao tác: push (thêm phần tử vào đỉnh) và pop (lấy phần tử từ đỉnh).',
        inputEn: 'Operations: push (add element to top) and pop (remove element from top).',
        conditions: 'Pop chỉ thực hiện được khi stack không rỗng. Push thêm phần tử vào đỉnh.',
        conditionsEn: 'Pop can only be performed when the stack is not empty. Push adds to the top.',
        output: 'Với pop: phần tử được lấy ra là phần tử cuối cùng được thêm vào (LIFO).',
        outputEn: 'For pop: the removed element is the last one that was added (LIFO).',
        explanation: 'LIFO: phần tử vào sau ra trước. Push O(1) thêm vào đỉnh. Pop O(1) lấy từ đỉnh. Peek O(1) xem phần tử đỉnh mà không xóa. Ứng dụng: undo/redo, call stack, kiểm tra ngoặc, DFS.',
        explanationEn: 'LIFO: last in, first out. Push O(1) adds to top. Pop O(1) removes from top. Peek O(1) views top without removing. Used in: undo/redo, call stack, bracket matching, DFS.',
    },
    code: `class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}`,
    codeLanguages: {
        js: `class Stack {
  constructor() { this.items = []; }
  push(el)  { this.items.push(el); }
  pop()     { return this.items.pop(); }
  peek()    { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}`,
        python: `class Stack:
    def __init__(self):
        self.items = []
    def push(self, el):
        self.items.append(el)
    def pop(self):
        return self.items.pop()
    def peek(self):
        return self.items[-1]
    def is_empty(self):
        return len(self.items) == 0`,
        c: `#define MAX 100
int stack[MAX], top = -1;

void push(int val) {
    if (top < MAX - 1)
        stack[++top] = val;
}
int pop() {
    if (top >= 0)
        return stack[top--];
    return -1;
}
int peek() {
    return (top >= 0) ? stack[top] : -1;
}`,
        cpp: `class Stack {
    vector<int> items;
public:
    void push(int el) { items.push_back(el); }
    int pop() {
        int val = items.back();
        items.pop_back();
        return val;
    }
    int peek() { return items.back(); }
    bool isEmpty() { return items.empty(); }
};`,
    },
    generateSteps: (): AlgorithmStep[] => {
        const steps: AlgorithmStep[] = [];
        const st: number[] = [];

        steps.push({
            stack: [...st], operation: 'init',
            description: 'Khởi tạo Stack rỗng.',
            descriptionEn: 'Initialize an empty Stack.',
            codeLine: 1,
            codeLines: { js: 45, python: 52, c: 63, cpp: 78 },
        });

        const ops = [
            { type: 'push', val: 10 }, { type: 'push', val: 20 },
            { type: 'push', val: 30 }, { type: 'peek' },
            { type: 'pop' }, { type: 'push', val: 40 },
            { type: 'pop' }, { type: 'pop' },
        ];

        for (const op of ops) {
            if (op.type === 'push') {
                st.push(op.val!);
                steps.push({
                    stack: [...st], activeNode: op.val, operation: 'push',
                    description: `Push ${op.val} vào stack. Stack: [${st.join(', ')}]`,
                    descriptionEn: `Push ${op.val} onto stack. Stack: [${st.join(', ')}]`,
                    codeLine: 5,
                    codeLines: { js: 46, python: 54, c: 65, cpp: 80 },
                });
            } else if (op.type === 'pop') {
                const val = st.pop();
                steps.push({
                    stack: [...st], activeNode: val, operation: 'pop',
                    description: `Pop ${val} từ stack. Stack: [${st.join(', ')}]`,
                    descriptionEn: `Pop ${val} from stack. Stack: [${st.join(', ')}]`,
                    codeLine: 7,
                    codeLines: { js: 47, python: 56, c: 69, cpp: 81 },
                });
            } else if (op.type === 'peek') {
                const val = st[st.length - 1];
                steps.push({
                    stack: [...st], activeNode: val, operation: 'peek',
                    description: `Peek: phần tử đỉnh = ${val}. Stack không thay đổi.`,
                    descriptionEn: `Peek: top element = ${val}. Stack unchanged.`,
                    codeLine: 11,
                    codeLines: { js: 48, python: 58, c: 74, cpp: 86 },
                });
            }
        }

        steps.push({
            stack: [...st],
            description: `✅ Hoàn tất demo Stack! Stack cuối: [${st.join(', ')}]`,
            descriptionEn: `✅ Stack demo complete! Final stack: [${st.join(', ')}]`,
            codeLine: 17,
            codeLines: { js: 50, python: 61, c: 76, cpp: 87 },
        });
        return steps;
    },
};
