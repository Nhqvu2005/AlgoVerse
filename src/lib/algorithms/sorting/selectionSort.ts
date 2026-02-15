import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const selectionSort: AlgorithmInfo = {
    slug: 'selection-sort',
    name: 'Selection Sort',
    nameVi: 'Sắp xếp Chọn',
    category: 'sorting',
    categoryVi: 'Sắp xếp',
    description: 'Tìm phần tử nhỏ nhất trong phần chưa sắp xếp và đặt nó vào đầu. Lặp lại cho đến khi toàn bộ mảng được sắp xếp.',
    descriptionEn: 'Finds the smallest element in the unsorted part and places it at the beginning. Repeats until the entire array is sorted.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    icon: '👆',
    inputType: 'array',
    defaultInput: [64, 25, 12, 22, 11],
    guide: {
        input: 'Một mảng số nguyên chưa được sắp xếp.',
        inputEn: 'An unsorted array of integers.',
        conditions: 'Mảng phải có ít nhất 1 phần tử. Các phần tử là số nguyên.',
        conditionsEn: 'Array must have at least 1 element. Elements must be integers.',
        output: 'Mảng đã được sắp xếp tăng dần.',
        outputEn: 'Array sorted in ascending order.',
        explanation: 'Thuật toán chia mảng thành 2 phần: đã sắp xếp (trái) và chưa sắp xếp (phải). Mỗi lượt, tìm phần tử nhỏ nhất trong phần chưa sắp xếp và hoán đổi với phần tử đầu tiên của phần chưa sắp xếp.',
        explanationEn: 'The algorithm divides the array into sorted (left) and unsorted (right) portions. Each pass finds the smallest element in the unsorted portion and swaps it with the first unsorted element.',
    },
    code: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    codeLanguages: {
        js: `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
        python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
        c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
        cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
    },
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [64, 25, 12, 22, 11])];
        const steps: AlgorithmStep[] = [];
        const n = arr.length;
        const sorted: number[] = [];

        steps.push({
            array: [...arr], sorted: [],
            description: `Bắt đầu với mảng: [${arr.join(', ')}]. Selection Sort sẽ tìm phần tử nhỏ nhất và đưa lên đầu.`,
            descriptionEn: `Starting with array: [${arr.join(', ')}]. Selection Sort will find the smallest element and move it to the front.`,
            codeLine: 1,
        });

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            steps.push({
                array: [...arr], highlights: [i], sorted: [...sorted],
                description: `Lượt ${i + 1}: Tìm phần tử nhỏ nhất từ vị trí ${i} đến ${n - 1}. Giả sử min = arr[${i}] = ${arr[i]}`,
                descriptionEn: `Pass ${i + 1}: Find smallest from index ${i} to ${n - 1}. Assume min = arr[${i}] = ${arr[i]}`,
                codeLine: 3,
            });

            for (let j = i + 1; j < n; j++) {
                steps.push({
                    array: [...arr], highlights: [minIdx, j], sorted: [...sorted],
                    description: `So sánh arr[${j}] = ${arr[j]} với min hiện tại = ${arr[minIdx]}`,
                    descriptionEn: `Compare arr[${j}] = ${arr[j]} with current min = ${arr[minIdx]}`,
                    codeLine: 5,
                });
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                    steps.push({
                        array: [...arr], highlights: [minIdx], sorted: [...sorted],
                        description: `Tìm thấy giá trị nhỏ hơn! minIdx = ${minIdx}, min = ${arr[minIdx]}`,
                        descriptionEn: `Found smaller value! minIdx = ${minIdx}, min = ${arr[minIdx]}`,
                        codeLine: 6,
                    });
                }
            }

            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                steps.push({
                    array: [...arr], swapping: [i, minIdx], sorted: [...sorted],
                    description: `Hoán đổi arr[${i}] với arr[${minIdx}]. Đặt ${arr[i]} vào vị trí ${i}.`,
                    descriptionEn: `Swap arr[${i}] with arr[${minIdx}]. Place ${arr[i]} at position ${i}.`,
                    codeLine: 10,
                });
            }
            sorted.push(i);
        }

        sorted.push(n - 1);
        steps.push({
            array: [...arr], sorted: Array.from({ length: n }, (_, i) => i),
            description: `✅ Sắp xếp hoàn tất! Mảng: [${arr.join(', ')}]`,
            descriptionEn: `✅ Sorting complete! Array: [${arr.join(', ')}]`,
            codeLine: 12,
        });

        return steps;
    },
};
