import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const insertionSort: AlgorithmInfo = {
    slug: 'insertion-sort',
    name: 'Insertion Sort',
    nameVi: 'Sắp xếp Chèn',
    category: 'sorting',
    categoryVi: 'Sắp xếp',
    difficulty: 'beginner',
    description: 'Xây dựng mảng đã sắp xếp từng phần tử một, bằng cách chèn mỗi phần tử vào đúng vị trí trong phần đã sắp xếp. Giống như cách sắp xếp bài trên tay.',
    descriptionEn: 'Builds the sorted array one element at a time by inserting each element into its correct position in the sorted portion. Like sorting cards in your hand.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    icon: '🃏',
    inputType: 'array',
    defaultInput: [12, 11, 13, 5, 6],
    guide: {
        input: 'Một mảng số nguyên chưa được sắp xếp.',
        inputEn: 'An unsorted array of integers.',
        conditions: 'Mảng phải có ít nhất 1 phần tử.',
        conditionsEn: 'Array must have at least 1 element.',
        output: 'Mảng đã được sắp xếp tăng dần.',
        outputEn: 'Array sorted in ascending order.',
        explanation: 'Phần tử đầu coi như đã sắp xếp. Lần lượt lấy từng phần tử tiếp theo, tìm đúng vị trí và chèn vào phần đã sắp xếp bằng cách dịch các phần tử lớn hơn sang phải.',
        explanationEn: 'The first element is considered sorted. Each subsequent element is taken and inserted into its correct position by shifting larger elements to the right.',
    },
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    codeLanguages: {
        js: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
        python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        c: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        cpp: `void insertionSort(vector<int>& arr) {
    for (int i = 1; i < (int)arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    },
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [12, 11, 13, 5, 6])];
        const steps: AlgorithmStep[] = [];
        const n = arr.length;

        steps.push({
            array: [...arr], sorted: [0],
            description: `Bắt đầu: [${arr.join(', ')}]. Phần tử đầu tiên (${arr[0]}) coi như đã sắp xếp.`,
            descriptionEn: `Start: [${arr.join(', ')}]. First element (${arr[0]}) is considered sorted.`,
            codeLine: 1,
            codeLines: { js: 1, python: 1, c: 1, cpp: 1 },
        });

        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;

            steps.push({
                array: [...arr], highlights: [i], sorted: Array.from({ length: i }, (_, k) => k),
                description: `Chọn key = arr[${i}] = ${key}. Tìm vị trí chèn trong phần đã sắp xếp.`,
                descriptionEn: `Pick key = arr[${i}] = ${key}. Find insertion position in sorted portion.`,
                codeLine: 3,
                codeLines: { js: 3, python: 3, c: 3, cpp: 3 },
            });

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                steps.push({
                    array: [...arr], highlights: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => k),
                    description: `arr[${j}] = ${arr[j]} > key = ${key} → Dịch sang phải.`,
                    descriptionEn: `arr[${j}] = ${arr[j]} > key = ${key} → Shift right.`,
                    codeLine: 6,
                    codeLines: { js: 6, python: 6, c: 6, cpp: 6 },
                });
                j--;
            }

            arr[j + 1] = key;
            steps.push({
                array: [...arr], highlights: [j + 1], sorted: Array.from({ length: i + 1 }, (_, k) => k),
                description: `Chèn key = ${key} vào vị trí ${j + 1}. Mảng: [${arr.join(', ')}]`,
                descriptionEn: `Insert key = ${key} at position ${j + 1}. Array: [${arr.join(', ')}]`,
                codeLine: 9,
                codeLines: { js: 9, python: 8, c: 9, cpp: 9 },
            });
        }

        steps.push({
            array: [...arr], sorted: Array.from({ length: n }, (_, i) => i),
            description: `✅ Sắp xếp hoàn tất! Mảng: [${arr.join(', ')}]`,
            descriptionEn: `✅ Sorting complete! Array: [${arr.join(', ')}]`,
            codeLine: 11,
            codeLines: { js: 11, python: 9, c: 11, cpp: 11 },
        });
        return steps;
    },
};
