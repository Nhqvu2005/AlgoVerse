import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const linearSearch: AlgorithmInfo = {
    slug: 'linear-search',
    name: 'Linear Search',
    nameVi: 'Tìm kiếm Tuyến tính',
    category: 'searching',
    categoryVi: 'Tìm kiếm',
    description: 'Duyệt qua từng phần tử trong mảng từ đầu đến cuối để tìm giá trị mục tiêu. Đơn giản nhưng không hiệu quả cho mảng lớn.',
    descriptionEn: 'Scans each element from start to end to find the target value. Simple but inefficient for large arrays.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    icon: '🔍',
    inputType: 'array-target',
    defaultInput: [23, 45, 12, 67, 34, 89, 56],
    defaultTarget: 67,
    guide: {
        input: 'Một mảng số nguyên và một giá trị cần tìm (target).',
        inputEn: 'An array of integers and a target value to search for.',
        conditions: 'Mảng có thể chưa sắp xếp. Không có yêu cầu đặc biệt.',
        conditionsEn: 'Array can be unsorted. No special requirements.',
        output: 'Vị trí (index) của phần tử cần tìm, hoặc -1 nếu không tìm thấy.',
        outputEn: 'The index of the target element, or -1 if not found.',
        explanation: 'Duyệt tuần tự từ đầu đến cuối mảng, so sánh từng phần tử với target. Khi tìm thấy phần tử bằng target, trả về vị trí. Nếu duyệt hết mà không tìm thấy, trả về -1. Không yêu cầu mảng sắp xếp.',
        explanationEn: 'Sequentially scan from start to end, comparing each element with target. When a match is found, return its index. If the entire array is traversed without a match, return -1. No requirement for a sorted array.',
    },
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found!
    }
  }
  return -1; // Not found
}`,
    codeLanguages: {
        js: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found!
    }
  }
  return -1; // Not found
}`,
        python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Found!
    return -1  # Not found`,
        c: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i;  // Found!
    }
    return -1;  // Not found
}`,
        cpp: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); i++) {
        if (arr[i] == target)
            return i;  // Found!
    }
    return -1;  // Not found
}`,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateSteps: (input?: any): AlgorithmStep[] => {
        let arr: number[];
        let target: number;

        if (input && typeof input === 'object' && !Array.isArray(input)) {
            arr = [...(input.array || [23, 45, 12, 67, 34, 89, 56])];
            target = input.target ?? 67;
        } else if (Array.isArray(input)) {
            arr = [...input];
            target = 67;
        } else {
            arr = [23, 45, 12, 67, 34, 89, 56];
            target = 67;
        }

        const steps: AlgorithmStep[] = [];

        steps.push({
            array: [...arr], searchTarget: target,
            description: `Tìm kiếm giá trị ${target} trong mảng [${arr.join(', ')}]. Duyệt từ đầu đến cuối.`,
            descriptionEn: `Search for value ${target} in array [${arr.join(', ')}]. Scan from start to end.`,
            codeLine: 1,
            codeLines: { js: 1, python: 1, c: 1, cpp: 1 },
        });

        for (let i = 0; i < arr.length; i++) {
            steps.push({
                array: [...arr], highlights: [i], searchTarget: target,
                description: `So sánh arr[${i}] = ${arr[i]} với ${target}`,
                descriptionEn: `Compare arr[${i}] = ${arr[i]} with ${target}`,
                codeLine: 3,
                codeLines: { js: 3, python: 3, c: 2, cpp: 2 },
            });
            if (arr[i] === target) {
                steps.push({
                    array: [...arr], highlights: [i], found: i, searchTarget: target,
                    description: `Tìm thấy ${target} tại vị trí ${i}!`,
                    descriptionEn: `Found ${target} at index ${i}!`,
                    codeLine: 4,
                    codeLines: { js: 4, python: 4, c: 3, cpp: 3 },
                });
                return steps;
            }
        }

        steps.push({
            array: [...arr], searchTarget: target,
            description: `❌ Không tìm thấy ${target} trong mảng. Trả về -1.`,
            descriptionEn: `❌ ${target} not found in array. Return -1.`,
            codeLine: 6,
        });
        return steps;
    },
};
