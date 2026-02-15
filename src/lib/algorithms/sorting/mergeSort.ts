import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const mergeSort: AlgorithmInfo = {
    slug: 'merge-sort',
    name: 'Merge Sort',
    nameVi: 'Sắp xếp Trộn',
    category: 'sorting',
    categoryVi: 'Sắp xếp',
    description: 'Chia mảng thành hai nửa, sắp xếp đệ quy từng nửa, rồi trộn hai nửa đã sắp xếp lại. Thuật toán Chia để Trị (Divide and Conquer) kinh điển.',
    descriptionEn: 'Divides the array into two halves, recursively sorts each half, then merges the two sorted halves. A classic Divide and Conquer algorithm.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    icon: '🔀',
    defaultInput: [38, 27, 43, 3, 9, 82, 10],
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [38, 27, 43, 3, 9, 82, 10])];
        const steps: AlgorithmStep[] = [];
        const working = [...arr];

        steps.push({
            array: [...working],
            description: `Bắt đầu Merge Sort với mảng: [${working.join(', ')}]`,
            descriptionEn: `Starting Merge Sort with array: [${working.join(', ')}]`,
            codeLine: 1,
        });

        function mergeSortHelper(start: number, end: number) {
            if (end - start <= 1) return;

            const mid = Math.floor((start + end) / 2);

            steps.push({
                array: [...working],
                highlights: Array.from({ length: end - start }, (_, i) => start + i),
                description: `Chia [${working.slice(start, end).join(', ')}] thành [${working.slice(start, mid).join(', ')}] và [${working.slice(mid, end).join(', ')}]`,
                descriptionEn: `Split [${working.slice(start, end).join(', ')}] into [${working.slice(start, mid).join(', ')}] and [${working.slice(mid, end).join(', ')}]`,
                codeLine: 4,
            });

            mergeSortHelper(start, mid);
            mergeSortHelper(mid, end);

            const left = working.slice(start, mid);
            const right = working.slice(mid, end);
            let i = 0, j = 0, k = start;

            steps.push({
                array: [...working],
                highlights: Array.from({ length: end - start }, (_, i) => start + i),
                description: `Trộn [${left.join(', ')}] và [${right.join(', ')}]`,
                descriptionEn: `Merge [${left.join(', ')}] and [${right.join(', ')}]`,
                codeLine: 11,
            });

            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) {
                    working[k] = left[i];
                    steps.push({
                        array: [...working],
                        highlights: [k],
                        description: `${left[i]} ≤ ${right[j]} → Chọn ${left[i]} từ nửa trái`,
                        descriptionEn: `${left[i]} ≤ ${right[j]} → Pick ${left[i]} from left half`,
                        codeLine: 14,
                    });
                    i++;
                } else {
                    working[k] = right[j];
                    steps.push({
                        array: [...working],
                        highlights: [k],
                        description: `${right[j]} < ${left[i]} → Chọn ${right[j]} từ nửa phải`,
                        descriptionEn: `${right[j]} < ${left[i]} → Pick ${right[j]} from right half`,
                        codeLine: 16,
                    });
                    j++;
                }
                k++;
            }

            while (i < left.length) { working[k] = left[i]; i++; k++; }
            while (j < right.length) { working[k] = right[j]; j++; k++; }

            steps.push({
                array: [...working],
                highlights: Array.from({ length: end - start }, (_, i) => start + i),
                description: `Kết quả trộn: [${working.slice(start, end).join(', ')}]`,
                descriptionEn: `Merge result: [${working.slice(start, end).join(', ')}]`,
                codeLine: 19,
            });
        }

        mergeSortHelper(0, working.length);

        steps.push({
            array: [...working],
            sorted: Array.from({ length: working.length }, (_, i) => i),
            description: `✅ Sắp xếp hoàn tất! Mảng: [${working.join(', ')}]`,
            descriptionEn: `✅ Sorting complete! Array: [${working.join(', ')}]`,
            codeLine: 8,
        });

        return steps;
    },
};
