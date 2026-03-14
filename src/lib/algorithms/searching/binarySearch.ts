import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const binarySearch: AlgorithmInfo = {
    slug: 'binary-search',
    name: 'Binary Search',
    nameVi: 'Tìm kiếm Nhị phân',
    category: 'searching',
    categoryVi: 'Tìm kiếm',
    difficulty: 'intermediate',
    description: 'Tìm kiếm trên mảng đã sắp xếp bằng cách chia đôi không gian tìm kiếm mỗi bước.',
    descriptionEn: 'Searches a sorted array by halving the search space each step. Compares the middle value with the target to eliminate half.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    icon: '🎯',
    inputType: 'array-target',
    defaultInput: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    defaultTarget: 23,
    guide: {
        input: 'Một mảng số nguyên ĐÃ SẮP XẾP tăng dần và một giá trị cần tìm (target).',
        inputEn: 'A SORTED (ascending) array of integers and a target value to search for.',
        conditions: 'Mảng PHẢI được sắp xếp tăng dần. Nếu chưa sắp xếp, kết quả sẽ sai.',
        conditionsEn: 'Array MUST be sorted in ascending order. Results will be incorrect if unsorted.',
        output: 'Vị trí (index) của phần tử cần tìm, hoặc -1 nếu không tìm thấy.',
        outputEn: 'The index of the target element, or -1 if not found.',
        explanation: 'So sánh target với phần tử giữa mảng. Nếu bằng, tìm thấy. Nếu target nhỏ hơn, tìm trong nửa trái. Nếu lớn hơn, tìm trong nửa phải. Mỗi bước loại bỏ một nửa không gian tìm kiếm → hiệu quả O(log n).',
        explanationEn: 'Compare target with the middle element. If equal, found. If target is smaller, search the left half. If larger, search the right half. Each step eliminates half the search space → efficient O(log n).',
    },
    code: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    codeLanguages: {
        js: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
        python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
        c: `int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
        cpp: `int binarySearch(vector<int>& arr, int target) {
    int low = 0, high = (int)arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateSteps: (input?: any): AlgorithmStep[] => {
        let arr: number[];
        let target: number;

        if (input && typeof input === 'object' && !Array.isArray(input)) {
            arr = [...(input.array || [2, 5, 8, 12, 16, 23, 38, 56, 72, 91])];
            target = input.target ?? 23;
        } else if (Array.isArray(input)) {
            arr = [...input];
            target = 23;
        } else {
            arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
            target = 23;
        }

        arr.sort((a, b) => a - b);
        const steps: AlgorithmStep[] = [];

        steps.push({
            array: [...arr], searchTarget: target,
            description: `Bắt đầu Binary Search: target = ${target}, mảng [${arr.join(', ')}]`,
            descriptionEn: `Start Binary Search: target = ${target}, array [${arr.join(', ')}]`,
            codeLine: 1,
            codeLines: { js: 1, python: 1, c: 1, cpp: 1 },
        });

        let low = 0, high = arr.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);

            steps.push({
                array: [...arr], highlights: [mid], low, high, mid, searchTarget: target,
                description: `low = ${low}, high = ${high}. Tính mid = floor((${low} + ${high}) / 2) = ${mid}. Giá trị arr[${mid}] = ${arr[mid]}`,
                descriptionEn: `low = ${low}, high = ${high}. Calc mid = floor((${low} + ${high}) / 2) = ${mid}. Value arr[${mid}] = ${arr[mid]}`,
                codeLine: 5,
                codeLines: { js: 5, python: 5, c: 5, cpp: 5 },
            });

            if (arr[mid] === target) {
                steps.push({
                    array: [...arr], found: mid, highlights: [mid], low, high, mid, searchTarget: target,
                    description: `arr[${mid}] (${arr[mid]}) == target (${target}) → Đã tìm thấy!`,
                    descriptionEn: `arr[${mid}] (${arr[mid]}) == target (${target}) → Found!`,
                    codeLine: 6,
                    codeLines: { js: 6, python: 7, c: 6, cpp: 6 },
                });
                return steps;
            } else if (arr[mid] < target) {
                steps.push({
                    array: [...arr], highlights: [mid], low, high, mid, searchTarget: target,
                    description: `arr[${mid}] (${arr[mid]}) < target (${target}) → Tìm ở nửa phải (low = mid + 1 = ${mid + 1})`,
                    descriptionEn: `arr[${mid}] (${arr[mid]}) < target (${target}) → Search right half (low = mid + 1 = ${mid + 1})`,
                    codeLine: 8,
                    codeLines: { js: 8, python: 9, c: 8, cpp: 8 },
                });
                low = mid + 1;
            } else {
                steps.push({
                    array: [...arr], highlights: [mid], low, high, mid, searchTarget: target,
                    description: `arr[${mid}] (${arr[mid]}) > target (${target}) → Tìm ở nửa trái (high = mid - 1 = ${mid - 1})`,
                    descriptionEn: `arr[${mid}] (${arr[mid]}) > target (${target}) → Search left half (high = mid - 1 = ${mid - 1})`,
                    codeLine: 10,
                    codeLines: { js: 10, python: 11, c: 10, cpp: 10 },
                });
                high = mid - 1;
            }
        }

        steps.push({
            array: [...arr], searchTarget: target,
            description: `Không tìm thấy ${target} (low > high).`,
            descriptionEn: `Target ${target} not found (low > high).`,
            codeLine: 13,
            codeLines: { js: 13, python: 13, c: 13, cpp: 13 },
        });
        return steps;
    },
};
