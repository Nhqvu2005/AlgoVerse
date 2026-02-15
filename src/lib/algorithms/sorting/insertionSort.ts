import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const insertionSort: AlgorithmInfo = {
    slug: 'insertion-sort',
    name: 'Insertion Sort',
    nameVi: 'Sắp xếp Chèn',
    category: 'sorting',
    categoryVi: 'Sắp xếp',
    description: 'Xây dựng mảng đã sắp xếp từng phần tử một, bằng cách chèn mỗi phần tử vào đúng vị trí trong phần đã sắp xếp. Giống như cách sắp xếp bài trên tay.',
    descriptionEn: 'Builds the sorted array one element at a time by inserting each element into its correct position in the sorted portion. Like sorting cards in your hand.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    icon: '🃏',
    defaultInput: [12, 11, 13, 5, 6],
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
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [12, 11, 13, 5, 6])];
        const steps: AlgorithmStep[] = [];
        const n = arr.length;

        steps.push({
            array: [...arr],
            sorted: [0],
            description: `Bắt đầu: [${arr.join(', ')}]. Phần tử đầu tiên (${arr[0]}) coi như đã sắp xếp.`,
            descriptionEn: `Start: [${arr.join(', ')}]. First element (${arr[0]}) is considered sorted.`,
            codeLine: 1,
        });

        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;

            steps.push({
                array: [...arr],
                highlights: [i],
                sorted: Array.from({ length: i }, (_, k) => k),
                description: `Chọn key = arr[${i}] = ${key}. Tìm vị trí chèn trong phần đã sắp xếp.`,
                descriptionEn: `Pick key = arr[${i}] = ${key}. Find insertion position in sorted portion.`,
                codeLine: 2,
            });

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                steps.push({
                    array: [...arr],
                    highlights: [j, j + 1],
                    sorted: Array.from({ length: i }, (_, k) => k),
                    description: `arr[${j}] = ${arr[j]} > key = ${key} → Dịch sang phải.`,
                    descriptionEn: `arr[${j}] = ${arr[j]} > key = ${key} → Shift right.`,
                    codeLine: 5,
                });
                j--;
            }

            arr[j + 1] = key;
            steps.push({
                array: [...arr],
                highlights: [j + 1],
                sorted: Array.from({ length: i + 1 }, (_, k) => k),
                description: `Chèn key = ${key} vào vị trí ${j + 1}. Mảng: [${arr.join(', ')}]`,
                descriptionEn: `Insert key = ${key} at position ${j + 1}. Array: [${arr.join(', ')}]`,
                codeLine: 8,
            });
        }

        steps.push({
            array: [...arr],
            sorted: Array.from({ length: n }, (_, i) => i),
            description: `✅ Sắp xếp hoàn tất! Mảng: [${arr.join(', ')}]`,
            descriptionEn: `✅ Sorting complete! Array: [${arr.join(', ')}]`,
            codeLine: 10,
        });

        return steps;
    },
};
