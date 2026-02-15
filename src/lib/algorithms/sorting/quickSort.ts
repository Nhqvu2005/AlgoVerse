import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const quickSort: AlgorithmInfo = {
    slug: 'quick-sort',
    name: 'Quick Sort',
    nameVi: 'Sắp xếp Nhanh',
    category: 'sorting',
    categoryVi: 'Sắp xếp',
    description: 'Chọn một phần tử làm pivot, phân hoạch mảng sao cho phần tử nhỏ hơn pivot ở bên trái, lớn hơn ở bên phải. Đệ quy sắp xếp hai phần. Thuật toán sắp xếp phổ biến nhất trong thực tế.',
    descriptionEn: 'Picks a pivot element, partitions the array so smaller elements go left and larger go right. Recursively sorts both partitions. The most popular sorting algorithm in practice.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    icon: '⚡',
    defaultInput: [10, 80, 30, 90, 40, 50, 70],
    code: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
  return i + 1;
}`,
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [10, 80, 30, 90, 40, 50, 70])];
        const steps: AlgorithmStep[] = [];
        const sortedIndices: number[] = [];

        steps.push({
            array: [...arr],
            description: `Bắt đầu Quick Sort với mảng: [${arr.join(', ')}]`,
            descriptionEn: `Starting Quick Sort with array: [${arr.join(', ')}]`,
            codeLine: 1,
        });

        function qs(low: number, high: number) {
            if (low < high) {
                const pivotVal = arr[high];
                steps.push({
                    array: [...arr],
                    pivot: high,
                    highlights: Array.from({ length: high - low + 1 }, (_, i) => low + i),
                    sorted: [...sortedIndices],
                    description: `Phân hoạch [${arr.slice(low, high + 1).join(', ')}], pivot = ${pivotVal} (vị trí ${high})`,
                    descriptionEn: `Partition [${arr.slice(low, high + 1).join(', ')}], pivot = ${pivotVal} (position ${high})`,
                    codeLine: 9,
                });

                let i = low - 1;
                for (let j = low; j < high; j++) {
                    steps.push({
                        array: [...arr],
                        pivot: high,
                        highlights: [j],
                        sorted: [...sortedIndices],
                        description: `So sánh arr[${j}] = ${arr[j]} với pivot = ${pivotVal}`,
                        descriptionEn: `Compare arr[${j}] = ${arr[j]} with pivot = ${pivotVal}`,
                        codeLine: 12,
                    });

                    if (arr[j] < pivotVal) {
                        i++;
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        steps.push({
                            array: [...arr],
                            pivot: high,
                            swapping: [i, j],
                            sorted: [...sortedIndices],
                            description: `${arr[i]} < pivot → Hoán đổi arr[${i}] và arr[${j}]`,
                            descriptionEn: `${arr[i]} < pivot → Swap arr[${i}] and arr[${j}]`,
                            codeLine: 14,
                        });
                    }
                }

                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                const pi = i + 1;
                sortedIndices.push(pi);

                steps.push({
                    array: [...arr],
                    pivot: pi,
                    sorted: [...sortedIndices],
                    description: `Đặt pivot ${arr[pi]} vào vị trí ${pi}. Pivot đã ở đúng chỗ!`,
                    descriptionEn: `Place pivot ${arr[pi]} at position ${pi}. Pivot is in correct place!`,
                    codeLine: 17,
                });

                qs(low, pi - 1);
                qs(pi + 1, high);
            } else if (low === high) {
                sortedIndices.push(low);
            }
        }

        qs(0, arr.length - 1);

        steps.push({
            array: [...arr],
            sorted: Array.from({ length: arr.length }, (_, i) => i),
            description: `✅ Sắp xếp hoàn tất! Mảng: [${arr.join(', ')}]`,
            descriptionEn: `✅ Sorting complete! Array: [${arr.join(', ')}]`,
            codeLine: 5,
        });

        return steps;
    },
};
