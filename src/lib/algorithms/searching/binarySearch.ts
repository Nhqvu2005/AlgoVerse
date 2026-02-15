import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const binarySearch: AlgorithmInfo = {
    slug: 'binary-search',
    name: 'Binary Search',
    nameVi: 'Tìm kiếm Nhị phân',
    category: 'searching',
    categoryVi: 'Tìm kiếm',
    description: 'Tìm kiếm trong mảng ĐÃ SẮP XẾP bằng cách chia đôi phạm vi tìm kiếm. So sánh giá trị cần tìm với phần tử giữa, loại bỏ nửa không chứa kết quả. Hiệu quả hơn Linear Search rất nhiều.',
    descriptionEn: 'Searches a SORTED array by halving the search range. Compares the target with the middle element, eliminating the half that cannot contain the result. Much more efficient than Linear Search.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    icon: '🎯',
    defaultInput: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    code: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`,
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [2, 5, 8, 12, 16, 23, 38, 56, 72, 91])].sort((a, b) => a - b);
        const target = arr[Math.floor(Math.random() * arr.length)];
        const steps: AlgorithmStep[] = [];

        steps.push({
            array: [...arr],
            searchTarget: target,
            description: `Tìm kiếm nhị phân giá trị ${target} trong mảng đã sắp xếp [${arr.join(', ')}]`,
            descriptionEn: `Binary search for value ${target} in sorted array [${arr.join(', ')}]`,
            codeLine: 1,
        });

        let low = 0, high = arr.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);

            steps.push({
                array: [...arr],
                low, high, mid,
                searchTarget: target,
                highlights: [mid],
                description: `low=${low}, high=${high}, mid=${mid}. Kiểm tra arr[${mid}] = ${arr[mid]}`,
                descriptionEn: `low=${low}, high=${high}, mid=${mid}. Check arr[${mid}] = ${arr[mid]}`,
                codeLine: 4,
            });

            if (arr[mid] === target) {
                steps.push({
                    array: [...arr],
                    found: mid, low, high, mid,
                    searchTarget: target,
                    highlights: [mid],
                    description: `✅ Tìm thấy ${target} tại vị trí ${mid}!`,
                    descriptionEn: `✅ Found ${target} at position ${mid}!`,
                    codeLine: 7,
                });
                return steps;
            } else if (arr[mid] < target) {
                steps.push({
                    array: [...arr],
                    low: mid + 1, high,
                    searchTarget: target,
                    description: `arr[${mid}] = ${arr[mid]} < ${target} → Tìm nửa PHẢI (low = ${mid + 1})`,
                    descriptionEn: `arr[${mid}] = ${arr[mid]} < ${target} → Search RIGHT half (low = ${mid + 1})`,
                    codeLine: 9,
                });
                low = mid + 1;
            } else {
                steps.push({
                    array: [...arr],
                    low, high: mid - 1,
                    searchTarget: target,
                    description: `arr[${mid}] = ${arr[mid]} > ${target} → Tìm nửa TRÁI (high = ${mid - 1})`,
                    descriptionEn: `arr[${mid}] = ${arr[mid]} > ${target} → Search LEFT half (high = ${mid - 1})`,
                    codeLine: 11,
                });
                high = mid - 1;
            }
        }

        steps.push({
            array: [...arr],
            searchTarget: target,
            description: `❌ Không tìm thấy ${target} trong mảng.`,
            descriptionEn: `❌ ${target} not found in the array.`,
            codeLine: 14,
        });

        return steps;
    },
};
