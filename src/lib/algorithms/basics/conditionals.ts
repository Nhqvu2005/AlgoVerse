import { AlgorithmInfo, AlgorithmStep } from '@/lib/types';

const code = `// Cấu trúc rẽ nhánh (Conditionals)
let score = 75;
let result = "";

// Kiểm tra điều kiện
if (score >= 90) {
    result = "A";
} else if (score >= 70) {
    result = "B";
} else {
    result = "C";
}

// Kết quả
console.log(result);`;

const codeLanguages = {
    js: `// Cấu trúc rẽ nhánh (Conditionals)
let score = 75;
let result = "";

// Kiểm tra điều kiện
if (score >= 90) {
    result = "A";
} else if (score >= 70) {
    result = "B";
} else {
    result = "C";
}

// Kết quả
console.log(result);`,
    python: `# Conditionals
score = 75
result = ""

# Check conditions
if score >= 90:
    result = "A"
elif score >= 70:
    result = "B"
else:
    result = "C"

print(result)`,
    c: `// Conditionals
int score = 75;
char result;

if (score >= 90) {
    result = 'A';
} else if (score >= 70) {
    result = 'B';
} else {
    result = 'C';
}

printf("%c", result);`,
    cpp: `// Conditionals
int score = 75;
char result;

if (score >= 90) {
    result = 'A';
} else if (score >= 70) {
    result = 'B';
} else {
    result = 'C';
}

cout << result << endl;`
};

export const conditionals: AlgorithmInfo = {
    slug: 'conditionals',
    name: 'Rẽ nhánh (If-Else)',
    nameVi: 'Rẽ nhánh (If-Else)',
    description: 'Cấu trúc rẽ nhánh cho phép chương trình thực hiện các hành động khác nhau tùy thuộc vào điều kiện boolean.',
    descriptionEn: 'Conditionals allow the program to execute different actions based on boolean conditions.',
    category: 'concept',
    categoryVi: 'Cơ bản',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    code,
    codeLanguages,
    icon: '🔀',
    inputType: 'array', // Allow inputting score
    defaultInput: [75],
    guide: {
        input: 'Nhập một số nguyên (điểm số).',
        inputEn: 'Enter an integer (score).',
        conditions: '0 <= score <= 100.',
        conditionsEn: '0 <= score <= 100.',
        output: 'Xếp loại A, B hoặc C.',
        outputEn: 'Grade A, B, or C.',
        explanation: 'Câu lệnh điều kiện cho phép chương trình "ra quyết định". If: kiểm tra điều kiện, nếu đúng thì thực thi. Else if: kiểm tra điều kiện tiếp theo. Else: thực thi khi không có điều kiện nào đúng. Các điều kiện được kiểm tra tuần tự từ trên xuống, chỉ thực thi khối đầu tiên thỏa mãn. Đây là nền tảng logic của mọi chương trình.',
        explanationEn: 'Conditionals let programs make decisions. If: check condition, execute if true. Else if: check next condition. Else: execute when no condition is true. Conditions are checked top-to-bottom, only the first matching block executes. This is the foundation of all program logic.'
    },

    generateSteps: (input: number[] = [75]) => {
        const steps: AlgorithmStep[] = [];
        const score = input[0] || 75;
        let result = '';

        // Init
        steps.push({
            description: `Khởi tạo: score = ${score}, result = "".`,
            descriptionEn: `Initialize: score = ${score}, result = "".`,
            codeLines: { js: 2, python: 2, c: 2, cpp: 2 },
            variables: { score, result: '""' }
        });

        // Check 1
        steps.push({
            description: `Kiểm tra: ${score} >= 90?`,
            descriptionEn: `Check: ${score} >= 90?`,
            codeLines: { js: 6, python: 6, c: 5, cpp: 5 },
            variables: { score, result: '""' }
        });

        if (score >= 90) {
            steps.push({
                description: 'Đúng (True). Gán result = "A".',
                descriptionEn: 'True. Set result = "A".',
                codeLines: { js: 7, python: 7, c: 6, cpp: 6 },
                variables: { score, result: '"A"' }
            });
            result = "A";
        } else {
            steps.push({
                description: 'Sai (False). Chuyển sang điều kiện tiếp theo.',
                descriptionEn: 'False. Move to next condition.',
                codeLines: { js: 6, python: 6, c: 5, cpp: 5 }, // Highlight the check still? Or user expects next line. Maybe next line.
                // Or just highlight the 'else if' line?
                variables: { score, result: '""' }
            });

            // Check 2
            steps.push({
                description: `Kiểm tra: ${score} >= 70?`,
                descriptionEn: `Check: ${score} >= 70?`,
                codeLines: { js: 8, python: 8, c: 7, cpp: 7 },
                variables: { score, result: '""' }
            });

            if (score >= 70) {
                steps.push({
                    description: 'Đúng (True). Gán result = "B".',
                    descriptionEn: 'True. Set result = "B".',
                    codeLines: { js: 9, python: 9, c: 8, cpp: 8 },
                    variables: { score, result: '"B"' }
                });
                result = "B";
            } else {
                steps.push({
                    description: 'Sai (False). Vào nhánh Else.',
                    descriptionEn: 'False. Enter Else branch.',
                    codeLines: { js: 8, python: 8, c: 7, cpp: 7 },
                    variables: { score, result: '""' }
                });

                steps.push({
                    description: 'Thực hiện Else: Gán result = "C".',
                    descriptionEn: 'Execute Else: Set result = "C".',
                    codeLines: { js: 11, python: 11, c: 10, cpp: 10 },
                    variables: { score, result: '"C"' }
                });
                result = "C";
            }
        }

        // Final
        steps.push({
            description: `Kết quả cuối cùng: ${result}`,
            descriptionEn: `Final result: ${result}`,
            codeLines: { js: 15, python: 14, c: 13, cpp: 13 },
            variables: { score, result: `"${result}"` }
        });

        return steps;
    }
};
