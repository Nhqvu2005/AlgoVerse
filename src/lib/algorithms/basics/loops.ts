import { AlgorithmInfo, AlgorithmStep } from '@/lib/types';

const code = `// Vòng lặp (Loops)
// For Loop: In ra các số từ 0 đến 2
for (let i = 0; i < 3; i++) {
    console.log(i);
}

// While Loop: Đếm ngược từ 3 về 1
let count = 3;
while (count > 0) {
    console.log(count);
    count--;
}`;

const codeLanguages = {
    js: `// Vòng lặp (Loops)
// For Loop: In ra các số từ 0 đến 2
for (let i = 0; i < 3; i++) {
    console.log(i);
}

// While Loop: Đếm ngược từ 3 về 1
let count = 3;
while (count > 0) {
    console.log(count);
    count--;
}`,
    python: `# Vòng lặp (Loops)
# For Loop
for i in range(3):
    print(i)

# While Loop
count = 3
while count > 0:
    print(count)
    count -= 1`,
    c: `// Vòng lặp (Loops)
// For Loop
for (int i = 0; i < 3; i++) {
    printf("%d\\n", i);
}

// While Loop
int count = 3;
while (count > 0) {
    printf("%d\\n", count);
    count--;
}`,
    cpp: `// Vòng lặp (Loops)
// For Loop
for (int i = 0; i < 3; i++) {
    cout << i << endl;
}

// While Loop
int count = 3;
while (count > 0) {
    cout << count << endl;
    count--;
}`
};

export const loops: AlgorithmInfo = {
    slug: 'loops',
    name: 'Loops',
    nameVi: 'Vòng lặp',
    description: 'Vòng lặp cho phép thực thi một đoạn mã nhiều lần. For loop thường dùng khi biết trước số lần lặp, While loop dùng khi lặp theo điều kiện.',
    descriptionEn: 'Loops allow executing a block of code multiple times. For loops are used when the number of iterations is known, While loops are condition-based.',
    category: 'concept',
    categoryVi: 'Cơ bản',
    difficulty: 'beginner',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    code,
    codeLanguages,
    icon: '🔁',
    inputType: 'none',
    defaultInput: [],
    guide: {
        input: 'Không có input (demo cố định).',
        inputEn: 'No input (fixed demo).',
        conditions: 'Biến đếm i tăng dần, biến count giảm dần.',
        conditionsEn: 'Counter i increases, count decreases.',
        output: 'Giá trị của biến trong từng bước lặp.',
        outputEn: 'Variable values at each iteration step.',
        explanation: 'Vòng lặp cho phép thực thi một đoạn mã nhiều lần. For loop: biết trước số lần lặp, dùng biến đếm (i=0, i<n, i++). While loop: lặp khi điều kiện còn đúng, không biết trước số lần. Cẩn thận: nếu điều kiện không bao giờ sai sẽ gây vòng lặp vô hạn. Vòng lặp là nền tảng của mọi thuật toán.',
        explanationEn: 'Loops execute a block of code repeatedly. For loop: known iteration count, uses counter (i=0, i<n, i++). While loop: repeats while condition is true, unknown count. Caution: if condition never becomes false, infinite loop occurs. Loops are fundamental to all algorithms.'
    },

    generateSteps: () => {
        const steps: AlgorithmStep[] = [];

        // For Loop
        steps.push({
            description: 'Bắt đầu For Loop: Khởi tạo i = 0.',
            descriptionEn: 'Start For Loop: Init i = 0.',
            codeLines: { js: 3, python: 3, c: 3, cpp: 3 },
            variables: { i: 0, output: '' }
        });

        for (let i = 0; i < 3; i++) {
            // Check condition
            steps.push({
                description: `Kiểm tra điều kiện: ${i} < 3 (Đúng). Vào thân vòng lặp.`,
                descriptionEn: `Check condition: ${i} < 3 (True). Enter loop body.`,
                codeLines: { js: 3, python: 3, c: 3, cpp: 3 },
                variables: { i, output: '' }
            });

            // Body
            steps.push({
                description: `Thực thi thân vòng lặp: In ra ${i}.`,
                descriptionEn: `Execute variable body: Print ${i}.`,
                codeLines: { js: 4, python: 4, c: 4, cpp: 4 },
                variables: { i, output: String(i) }
            });

            // Increment step (visualize before update)
            steps.push({
                description: `Tăng i lên 1. Giá trị mới của i sẽ là ${i + 1}.`,
                descriptionEn: `Increment i by 1. New value of i will be ${i + 1}.`,
                codeLines: { js: 3, python: 3, c: 3, cpp: 3 },
                variables: { i: i + 1, output: '' }
            });
        }

        // Final condition check
        steps.push({
            description: 'Kiểm tra điều kiện: 3 < 3 (Sai). Kết thúc For Loop.',
            descriptionEn: 'Check condition: 3 < 3 (False). End For Loop.',
            codeLines: { js: 3, python: 3, c: 3, cpp: 3 },
            variables: { i: 3, output: '' }
        });

        // While Loop Init
        steps.push({
            description: 'Bắt đầu While Loop: Khởi tạo count = 3.',
            descriptionEn: 'Start While Loop: Init count = 3.',
            codeLines: { js: 8, python: 8, c: 9, cpp: 9 }, // Adjust line numbers
            variables: { count: 3, output: '' }
        });

        let count = 3;
        while (count > 0) {
            // Check
            steps.push({
                description: `Kiểm tra điều kiện: ${count} > 0 (Đúng).`,
                descriptionEn: `Check condition: ${count} > 0 (True).`,
                codeLines: { js: 9, python: 9, c: 10, cpp: 10 },
                variables: { count, output: '' }
            });

            // Body
            steps.push({
                description: `In ra count: ${count}.`,
                descriptionEn: `Print count: ${count}.`,
                codeLines: { js: 10, python: 10, c: 11, cpp: 11 },
                variables: { count, output: String(count) }
            });

            // Decrement
            count--;
            steps.push({
                description: `Giảm count. Giá trị mới: ${count}.`,
                descriptionEn: `Decrement count. New value: ${count}.`,
                codeLines: { js: 11, python: 11, c: 12, cpp: 12 },
                variables: { count, output: '' }
            });
        }

        // Final check
        steps.push({
            description: 'Kiểm tra điều kiện: 0 > 0 (Sai). Kết thúc While Loop.',
            descriptionEn: 'Check condition: 0 > 0 (False). End While Loop.',
            codeLines: { js: 9, python: 9, c: 10, cpp: 10 },
            variables: { count: 0, output: '' }
        });

        return steps;
    }
};
