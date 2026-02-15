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
    inputType: 'array',
    defaultInput: [38, 27, 43, 3, 9, 82, 10],
    guide: {
        input: 'Một mảng số nguyên chưa được sắp xếp.',
        inputEn: 'An unsorted array of integers.',
        conditions: 'Mảng phải có ít nhất 1 phần tử.',
        conditionsEn: 'Array must have at least 1 element.',
        output: 'Mảng đã được sắp xếp tăng dần.',
        outputEn: 'Array sorted in ascending order.',
        explanation: 'Chia đôi mảng liên tục cho đến khi mỗi phần chỉ còn 1 phần tử (đã sắp xếp). Sau đó trộn các phần nhỏ lại với nhau theo thứ tự, tạo thành mảng lớn hơn đã sắp xếp. Đảm bảo O(n log n) trong mọi trường hợp nhưng cần thêm bộ nhớ O(n).',
        explanationEn: 'Repeatedly divide the array until each part has 1 element (already sorted). Then merge the small parts back together in order, building larger sorted arrays. Guarantees O(n log n) in all cases but requires O(n) extra memory.',
    },
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
    codeLanguages: {
        js: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
        python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
        c: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
        cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> L(arr.begin()+l, arr.begin()+m+1);
    vector<int> R(arr.begin()+m+1, arr.begin()+r+1);
    int i = 0, j = 0, k = l;
    while (i < (int)L.size() && j < (int)R.size()) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < (int)L.size()) arr[k++] = L[i++];
    while (j < (int)R.size()) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    },
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
                array: [...working], highlights: Array.from({ length: end - start }, (_, i) => start + i),
                description: `Chia [${working.slice(start, end).join(', ')}] thành [${working.slice(start, mid).join(', ')}] và [${working.slice(mid, end).join(', ')}]`,
                descriptionEn: `Split [${working.slice(start, end).join(', ')}] into [${working.slice(start, mid).join(', ')}] and [${working.slice(mid, end).join(', ')}]`,
                codeLine: 3,
            });

            mergeSortHelper(start, mid);
            mergeSortHelper(mid, end);

            const left = working.slice(start, mid);
            const right = working.slice(mid, end);
            let i = 0, j = 0, k = start;

            steps.push({
                array: [...working], highlights: Array.from({ length: end - start }, (_, i) => start + i),
                description: `Trộn [${left.join(', ')}] và [${right.join(', ')}]`,
                descriptionEn: `Merge [${left.join(', ')}] and [${right.join(', ')}]`,
                codeLine: 9,
            });

            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) {
                    working[k] = left[i];
                    steps.push({
                        array: [...working], highlights: [k],
                        description: `${left[i]} ≤ ${right[j]} → Chọn ${left[i]} từ nửa trái`,
                        descriptionEn: `${left[i]} ≤ ${right[j]} → Pick ${left[i]} from left half`,
                        codeLine: 12,
                    });
                    i++;
                } else {
                    working[k] = right[j];
                    steps.push({
                        array: [...working], highlights: [k],
                        description: `${right[j]} < ${left[i]} → Chọn ${right[j]} từ nửa phải`,
                        descriptionEn: `${right[j]} < ${left[i]} → Pick ${right[j]} from right half`,
                        codeLine: 14,
                    });
                    j++;
                }
                k++;
            }

            while (i < left.length) { working[k] = left[i]; i++; k++; }
            while (j < right.length) { working[k] = right[j]; j++; k++; }

            steps.push({
                array: [...working], highlights: Array.from({ length: end - start }, (_, i) => start + i),
                description: `Kết quả trộn: [${working.slice(start, end).join(', ')}]`,
                descriptionEn: `Merge result: [${working.slice(start, end).join(', ')}]`,
                codeLine: 17,
            });
        }

        mergeSortHelper(0, working.length);

        steps.push({
            array: [...working], sorted: Array.from({ length: working.length }, (_, i) => i),
            description: `✅ Sắp xếp hoàn tất! Mảng: [${working.join(', ')}]`,
            descriptionEn: `✅ Sorting complete! Array: [${working.join(', ')}]`,
            codeLine: 6,
        });
        return steps;
    },
};
