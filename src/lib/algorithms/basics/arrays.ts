import { AlgorithmInfo, AlgorithmStep } from '@/lib/types';

const code = `// Mảng (Array)
let arr = [10, 20, 30, 40, 50];

// 1. Truy cập (Access)
let val = arr[2]; // 30

// 2. Cập nhật (Update)
arr[2] = 99;

// 3. Thêm (Insert)
arr.push(60);

// 4. Xóa (Delete)
arr.pop();`;

const codeLanguages = {
    js: `// Mảng (Array)
let arr = [10, 20, 30, 40, 50];

// 1. Truy cập (Access)
let val = arr[2]; // 30

// 2. Cập nhật (Update)
arr[2] = 99;

// 3. Thêm (Insert)
arr.push(60);

// 4. Xóa (Delete)
arr.pop();`,
    python: `# Mảng (List)
arr = [10, 20, 30, 40, 50]

# 1. Truy cập (Access)
val = arr[2] # 30

# 2. Cập nhật (Update)
arr[2] = 99

# 3. Thêm (Insert)
arr.append(60)

# 4. Xóa (Delete)
arr.pop()`,
    c: `// Mảng (Array)
int arr[10] = {10, 20, 30, 40, 50};
int size = 5;

// 1. Truy cập (Access)
int val = arr[2]; // 30

// 2. Cập nhật (Update)
arr[2] = 99;

// 3. Thêm (Insert - giả lập)
arr[size++] = 60;

// 4. Xóa (Delete - giả lập)
size--;`,
    cpp: `// Vector (Mảng động)
vector<int> arr = {10, 20, 30, 40, 50};

// 1. Truy cập (Access)
int val = arr[2]; // 30

// 2. Cập nhật (Update)
arr[2] = 99;

// 3. Thêm (Insert)
arr.push_back(60);

// 4. Xóa (Delete)
arr.pop_back();`
};

export const arrays: AlgorithmInfo = {
    slug: 'arrays',
    name: 'Arrays',
    nameVi: 'Mảng',
    description: 'Mảng là tập hợp các phần tử được lưu trữ tại các ô nhớ liền kề. Truy cập phần tử rất nhanh theo chỉ số (O(1)).',
    descriptionEn: 'An Array is a collection of elements stored at contiguous memory locations. Accessing elements by index is very fast (O(1)).',
    category: 'concept',
    categoryVi: 'Cơ bản',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    code,
    codeLanguages,
    icon: '📊',
    inputType: 'array',
    defaultInput: [10, 20, 30, 40, 50],
    guide: {
        input: 'Danh sách các số nguyên ngăn cách bởi dấu phẩy.',
        inputEn: 'List of integers separated by commas.',
        conditions: 'Các số nguyên dương hoặc âm.',
        conditionsEn: 'Positive or negative integers.',
        output: 'Trạng thái mảng sau các thao tác truy cập, cập nhật, thêm và xóa.',
        outputEn: 'Array state after access, update, insert, and delete operations.',
        explanation: 'Mảng lưu các phần tử liên tiếp trong bộ nhớ, mỗi phần tử có chỉ số (bắt đầu từ 0). Truy cập theo chỉ số rất nhanh O(1). Thêm/xóa cuối nhanh, nhưng thêm/xóa giữa chậm O(n) vì phải dịch các phần tử. Mảng là nền tảng của hầu hết cấu trúc dữ liệu khác.',
        explanationEn: 'Arrays store elements contiguously in memory, each with an index (starting from 0). Access by index is O(1). Add/remove at end is fast, but in middle is O(n) due to shifting. Arrays are the foundation of most other data structures.'
    },

    generateSteps: (input: number[] = [10, 20, 30, 40, 50]) => {
        const steps: AlgorithmStep[] = [];
        const arr = [...input];

        // 0. Init
        steps.push({
            array: [...arr],
            visited: [],
            highlights: [],
            description: `Khởi tạo mảng với ${arr.length} phần tử: [${arr.join(', ')}]`,
            descriptionEn: `Initialize array with ${arr.length} elements: [${arr.join(', ')}]`,
            codeLines: { js: 2, python: 2, c: 2, cpp: 2 },
        });

        // 1. Access index 2 (middle)
        const idx = Math.floor(arr.length / 2);
        const val = arr[idx];
        steps.push({
            array: [...arr],
            highlights: [idx],
            description: `1. Truy cập phần tử tại chỉ số ${idx}: ${val}. Độ phức tạp O(1).`,
            descriptionEn: `1. Access element at index ${idx}: ${val}. Complexity O(1).`,
            codeLines: { js: 5, python: 5, c: 5, cpp: 5 },
        });

        // 2. Update index 2 to 99
        arr[idx] = 99;
        steps.push({
            array: [...arr],
            highlights: [idx],
            description: `2. Cập nhật phần tử tại chỉ số ${idx} thành 99.`,
            descriptionEn: `2. Update element at index ${idx} to 99.`,
            codeLines: { js: 8, python: 8, c: 9, cpp: 9 },
        });

        // 3. Insert 60
        arr.push(60);
        steps.push({
            array: [...arr],
            highlights: [arr.length - 1],
            description: `3. Thêm 60 vào cuối mảng. Độ dài mới: ${arr.length}.`,
            descriptionEn: `3. Insert 60 at the end. New length: ${arr.length}.`,
            codeLines: { js: 11, python: 11, c: 12, cpp: 12 },
        });

        // 4. Delete last
        arr.pop();
        steps.push({
            array: [...arr],
            description: `4. Xóa phần tử cuối cùng. Độ dài còn lại: ${arr.length}.`,
            descriptionEn: `4. Delete last element. Remaining length: ${arr.length}.`,
            codeLines: { js: 14, python: 14, c: 15, cpp: 15 },
        });

        // End
        steps.push({
            array: [...arr],
            sorted: Array.from({ length: arr.length }, (_, i) => i), // Mark all green
            description: '✅ Hoàn tất các thao tác cơ bản trên Mảng!',
            descriptionEn: '✅ Basic Array operations complete!',
            codeLines: { js: 14, python: 14, c: 15, cpp: 15 },
        });

        return steps;
    }
};
