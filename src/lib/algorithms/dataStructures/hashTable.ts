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
        } else {
            this.addStep(
                `❗ Va chạm tại bucket ${index}! (Đã có ${this.table[index].length} phần tử). Thêm vào cuối danh sách.`,
                `❗ Collision at bucket ${index}! (${this.table[index].length} elements exist). Appending to list.`,
                undefined, index
            );
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
    name: 'Hash Table',
    nameVi: 'Bảng băm',
    description: 'Bảng băm lưu trữ dữ liệu dưới dạng cặp khóa-giá trị. Sử dụng hàm băm (Vd: Modulo) để ánh xạ khóa vào chỉ mục. Nếu hai khóa có cùng chỉ mục (Va chạm), ta dùng Chaining (Danh sách liên kết) hoặc Open Addressing.',
    descriptionEn: 'Hash Table stores data as key-value pairs using a hash function (e.g., Modulo). Checking for collisions (keys mapping to same index), handled via Chaining (Linked Lists) or Open Addressing.',
    category: 'data-structure',
    categoryVi: 'Cấu trúc DL',
    difficulty: 'intermediate',
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
        conditions: 'Hàm băm: key % 7 (công thức đơn giản minh họa).',
        conditionsEn: 'Hash Function: key % 7 (simplified for illustration).',
        output: 'Trạng thái bảng băm và xử lý va chạm.',
        outputEn: 'Hash table state and collision handling.',
        explanation: 'Ở đây sử dụng công thức đơn giản h(k) = k mod m (Phương pháp chia) để dễ hình dung. Thực tế còn nhiều hàm băm khác như: Phương pháp nhân (Multiplication), Băm phổ quát (Universal Hashing), SHA, MD5... Xử lý va chạm bằng Chaining (Xâu chuỗi).',
        explanationEn: 'This demo uses a simple formula h(k) = k mod m (Division Method) for easy visualization. In practice, there are many other hash functions: Multiplication Method, Universal Hashing, SHA, MD5, etc. Collisions are resolved via Chaining.'
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
