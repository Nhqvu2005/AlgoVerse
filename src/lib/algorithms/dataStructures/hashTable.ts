import { AlgorithmInfo, AlgorithmStep } from '@/lib/types';

class HashTable {
    size: number;
    table: { [key: number]: number[] }; // Index -> List of values
    steps: AlgorithmStep[];

    constructor(size: number = 7) {
        this.size = size;
        this.table = {};
        this.steps = [];
        this.addStep('Khởi tạo bảng băm với kích thước 7.', 'Initialize hash table with size 7.');
    }

    hash(key: number) {
        return key % this.size;
    }

    insert(key: number) {
        const index = this.hash(key);
        this.addStep(
            `Tính HASH(${key}) = ${key} % ${this.size} = ${index}.`,
            `Calculate HASH(${key}) = ${key} % ${this.size} = ${index}.`,
            undefined, index
        );

        if (!this.table[index]) {
            this.table[index] = [];
        }

        this.table[index].push(key);
        this.addStep(
            `Chèn ${key} vào bucket ${index}.`,
            `Insert ${key} into bucket ${index}.`,
            undefined, index
        );
    }

    addStep(desc: string, descEn: string, codeLine?: number, highlightIndex?: number) {
        const tableState = Array.from({ length: this.size }, (_, i) => ({
            index: i,
            content: this.table[i] ? this.table[i].join(' → ') : ''
        }));

        this.steps.push({
            hashTable: tableState,
            description: desc,
            descriptionEn: descEn,
            highlights: highlightIndex !== undefined ? [highlightIndex] : [],
            codeLines: { js: 5, python: 5, c: 5, cpp: 5 } // Proxy
        });
    }
}

const code = `// Hash Table (Chaining)
class HashTable {
    constructor(size) {
        this.table = new Array(size);
    }

    hash(key) {
        return key % this.size;
    }

    insert(key) {
        const idx = this.hash(key);
        if (!this.table[idx]) this.table[idx] = [];
        this.table[idx].push(key);
    }
}`;

const codeLanguages = {
    js: code,
    python: `class HashTable:
    def __init__(self, size):
        self.table = [[] for _ in range(size)]

    def hash(self, key):
        return key % len(self.table)

    def insert(self, key):
        idx = self.hash(key)
        self.table[idx].append(key)`,
    c: `// Hash Table using arrays of pointers (simplified)
void insert(int key) {
    int idx = key % SIZE;
    // Add to linked list at table[idx]
}`,
    cpp: `// Hash Table
list<int> table[SIZE];
void insert(int key) {
    int idx = key % SIZE;
    table[idx].push_back(key);
}`
};

export const hashTable: AlgorithmInfo = {
    slug: 'hash-table',
    name: 'Bảng băm (Hash Table)',
    nameVi: 'Bảng băm (Hash Table)',
    description: 'Bảng băm lưu trữ dữ liệu dưới dạng cặp khóa-giá trị. Sử dụng hàm băm để ánh xạ khóa vào chỉ mục của mảng.',
    descriptionEn: 'Hash Table stores data as key-value pairs. It uses a hash function to map keys to indices of an array.',
    category: 'data-structure',
    categoryVi: 'Cấu trúc DL',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    code,
    codeLanguages,
    icon: '#️⃣',
    inputType: 'array',
    defaultInput: [10, 20, 15, 7, 22], // 10%7=3, 20%7=6, 15%7=1, 7%7=0, 22%7=1 (collision with 15)
    guide: {
        input: 'Danh sách số nguyên.',
        inputEn: 'List of integers.',
        conditions: 'Số nguyên bất kỳ.',
        conditionsEn: 'Any integers.',
        output: 'Trạng thái bảng băm và xử lý va chạm.',
        outputEn: 'Hash table state and collision handling.',
        explanation: 'Minh họa phương pháp Chaining để xử lý va chạm.',
        explanationEn: 'Illustrates Chaining method for collision resolution.'
    },

    generateSteps: (input: number[] = [10, 20, 15, 7, 22]) => {
        const ht = new HashTable(7);
        for (const val of input) {
            ht.insert(val);
        }
        ht.addStep('✅ Hoàn tất chèn dữ liệu.', '✅ Insertion complete.');
        return ht.steps;
    }
};
