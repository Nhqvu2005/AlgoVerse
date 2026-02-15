import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const quickSort: AlgorithmInfo = {
    slug: 'quick-sort',
    name: 'Quick Sort',
    nameVi: 'Sắp xếp Nhanh',
    category: 'sorting',
    categoryVi: 'Sắp xếp',
    description: 'Chọn một phần tử làm pivot, phân hoạch mảng sao cho phần tử nhỏ hơn pivot ở bên trái, lớn hơn ở bên phải. Đệ quy sắp xếp hai phần.',
    descriptionEn: 'Picks a pivot element, partitions the array so smaller elements go left and larger go right. Recursively sorts both partitions.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    icon: '⚡',
    inputType: 'array',
    defaultInput: [10, 80, 30, 90, 40, 50, 70],
    guide: {
        input: 'Một mảng số nguyên chưa được sắp xếp.',
        inputEn: 'An unsorted array of integers.',
        conditions: 'Mảng phải có ít nhất 1 phần tử.',
        conditionsEn: 'Array must have at least 1 element.',
        output: 'Mảng đã được sắp xếp tăng dần.',
        outputEn: 'Array sorted in ascending order.',
        explanation: 'Chọn phần tử cuối làm pivot. Duyệt qua mảng, đưa các phần tử nhỏ hơn pivot sang trái, lớn hơn sang phải. Đặt pivot vào đúng vị trí. Đệ quy xử lý hai phần trái và phải. Trung bình nhanh hơn Merge Sort do hằng số nhỏ hơn, nhưng trường hợp xấu nhất O(n²) khi mảng đã sắp xếp.',
        explanationEn: 'Select the last element as pivot. Traverse the array, moving smaller elements left and larger right. Place pivot in correct position. Recursively process left and right subarrays. On average faster than Merge Sort due to smaller constants, but O(n²) worst case on already-sorted arrays.',
    },
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
    codeLanguages: {
        js: `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high], i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
  return i + 1;
}`,
        python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
        c: `int partition(int arr[], int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i+1]; arr[i+1] = arr[high]; arr[high] = t;
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    },
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [10, 80, 30, 90, 40, 50, 70])];
        const steps: AlgorithmStep[] = [];
        const sortedIndices: number[] = [];

        steps.push({
            array: [...arr],
            description: `Bắt đầu Quick Sort với mảng: [${arr.join(', ')}]`,
            descriptionEn: `Starting Quick Sort with array: [${arr.join(', ')}]`,
            codeLine: 1,
            codeLines: { js: 26, python: 66, c: 93, cpp: 112 },
        });

        function qs(low: number, high: number) {
            if (low < high) {
                const pivotVal = arr[high];
                steps.push({
                    array: [...arr], pivot: high, highlights: Array.from({ length: high - low + 1 }, (_, i) => low + i), sorted: [...sortedIndices],
                    description: `Phân hoạch [${arr.slice(low, high + 1).join(', ')}], pivot = ${pivotVal} (vị trí ${high})`,
                    descriptionEn: `Partition [${arr.slice(low, high + 1).join(', ')}], pivot = ${pivotVal} (position ${high})`,
                    codeLine: 9,
                    codeLines: { js: 28, python: 68, c: 95, cpp: 114 },
                });

                let i = low - 1;
                for (let j = low; j < high; j++) {
                    steps.push({
                        array: [...arr], pivot: high, highlights: [j], sorted: [...sortedIndices],
                        description: `So sánh arr[${j}] = ${arr[j]} với pivot = ${pivotVal}`,
                        descriptionEn: `Compare arr[${j}] = ${arr[j]} with pivot = ${pivotVal}`,
                        codeLine: 12,
                        codeLines: { js: 38, python: 76, c: 84, cpp: 103 },
                    });
                    if (arr[j] < pivotVal) {
                        i++;
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        steps.push({
                            array: [...arr], pivot: high, swapping: [i, j], sorted: [...sortedIndices],
                            description: `${arr[i]} < pivot → Hoán đổi arr[${i}] và arr[${j}]`,
                            descriptionEn: `${arr[i]} < pivot → Swap arr[${i}] and arr[${j}]`,
                            codeLine: 14,
                            codeLines: { js: 40, python: 78, c: 86, cpp: 105 },
                        });
                    }
                }

                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                const pi = i + 1;
                sortedIndices.push(pi);

                steps.push({
                    array: [...arr], pivot: pi, sorted: [...sortedIndices],
                    description: `Đặt pivot ${arr[pi]} vào vị trí ${pi}. Pivot đã ở đúng chỗ!`,
                    descriptionEn: `Place pivot ${arr[pi]} at position ${pi}. Pivot is in correct place!`,
                    codeLine: 17,
                    codeLines: { js: 43, python: 79, c: 89, cpp: 108 },
                });

                qs(low, pi - 1);
                qs(pi + 1, high);
            } else if (low === high) {
                sortedIndices.push(low);
            }
        }

        qs(0, arr.length - 1);

        steps.push({
            array: [...arr], sorted: Array.from({ length: arr.length }, (_, i) => i),
            description: `✅ Sắp xếp hoàn tất! Mảng: [${arr.join(', ')}]`,
            descriptionEn: `✅ Sorting complete! Array: [${arr.join(', ')}]`,
            codeLine: 5,
            codeLines: { js: 32, python: 70, c: 99, cpp: 118 },
        });
        return steps;
    },
};
