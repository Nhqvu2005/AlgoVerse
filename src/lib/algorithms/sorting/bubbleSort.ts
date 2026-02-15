import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const bubbleSort: AlgorithmInfo = {
    slug: 'bubble-sort',
    name: 'Bubble Sort',
    nameVi: 'Sắp xếp Nổi bọt',
    category: 'sorting',
    categoryVi: 'Sắp xếp',
    description: 'So sánh các phần tử liền kề và hoán đổi nếu chúng sai thứ tự. Quá trình lặp lại cho đến khi mảng được sắp xếp. Phần tử lớn nhất sẽ "nổi" lên cuối mảng sau mỗi lượt.',
    descriptionEn: 'Compares adjacent elements and swaps them if they are in the wrong order. This process repeats until the array is sorted. The largest element "bubbles" to the end after each pass.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    icon: '🫧',
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
    code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [64, 34, 25, 12, 22, 11, 90])];
        const steps: AlgorithmStep[] = [];
        const n = arr.length;
        const sorted: number[] = [];

        steps.push({
            array: [...arr],
            highlights: [],
            sorted: [],
            description: `Bắt đầu với mảng: [${arr.join(', ')}]. Bubble Sort sẽ so sánh từng cặp phần tử liền kề.`,
            descriptionEn: `Starting with array: [${arr.join(', ')}]. Bubble Sort will compare each pair of adjacent elements.`,
            codeLine: 1,
        });

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                steps.push({
                    array: [...arr],
                    highlights: [j, j + 1],
                    sorted: [...sorted],
                    description: `So sánh arr[${j}] = ${arr[j]} với arr[${j + 1}] = ${arr[j + 1]}`,
                    descriptionEn: `Compare arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}`,
                    codeLine: 4,
                });

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    steps.push({
                        array: [...arr],
                        highlights: [j, j + 1],
                        swapping: [j, j + 1],
                        sorted: [...sorted],
                        description: `${arr[j + 1]} > ${arr[j]} → Hoán đổi! Mảng: [${arr.join(', ')}]`,
                        descriptionEn: `${arr[j + 1]} > ${arr[j]} → Swap! Array: [${arr.join(', ')}]`,
                        codeLine: 6,
                    });
                } else {
                    steps.push({
                        array: [...arr],
                        highlights: [j, j + 1],
                        sorted: [...sorted],
                        description: `${arr[j]} ≤ ${arr[j + 1]} → Không cần hoán đổi.`,
                        descriptionEn: `${arr[j]} ≤ ${arr[j + 1]} → No swap needed.`,
                        codeLine: 4,
                    });
                }
            }
            sorted.push(n - 1 - i);
            steps.push({
                array: [...arr],
                sorted: [...sorted],
                description: `Lượt ${i + 1} hoàn thành! Phần tử ${arr[n - 1 - i]} đã ở đúng vị trí.`,
                descriptionEn: `Pass ${i + 1} complete! Element ${arr[n - 1 - i]} is now in its correct position.`,
                codeLine: 3,
            });
        }

        sorted.push(0);
        steps.push({
            array: [...arr],
            sorted: Array.from({ length: n }, (_, i) => i),
            description: `✅ Sắp xếp hoàn tất! Mảng: [${arr.join(', ')}]`,
            descriptionEn: `✅ Sorting complete! Array: [${arr.join(', ')}]`,
            codeLine: 9,
        });

        return steps;
    },
};
