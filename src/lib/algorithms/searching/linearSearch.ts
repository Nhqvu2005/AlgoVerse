import { AlgorithmInfo, AlgorithmStep } from '../../types';

export const linearSearch: AlgorithmInfo = {
    slug: 'linear-search',
    name: 'Linear Search',
    nameVi: 'Tìm kiếm Tuyến tính',
    category: 'searching',
    categoryVi: 'Tìm kiếm',
    description: 'Duyệt qua từng phần tử trong mảng từ đầu đến cuối cho đến khi tìm thấy giá trị cần tìm hoặc hết mảng. Đơn giản nhưng không hiệu quả cho dữ liệu lớn.',
    descriptionEn: 'Traverses each element from start to end until the target value is found or the array ends. Simple but inefficient for large data sets.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    icon: '🔎',
    defaultInput: [10, 23, 45, 70, 11, 15],
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    generateSteps: (input?: number[]): AlgorithmStep[] => {
        const arr = [...(input as number[] || [10, 23, 45, 70, 11, 15])];
        const target = arr[Math.floor(Math.random() * arr.length)];
        const steps: AlgorithmStep[] = [];

        steps.push({
            array: [...arr],
            searchTarget: target,
            description: `Tìm kiếm giá trị ${target} trong mảng [${arr.join(', ')}]`,
            descriptionEn: `Search for value ${target} in array [${arr.join(', ')}]`,
            codeLine: 1,
        });

        for (let i = 0; i < arr.length; i++) {
            steps.push({
                array: [...arr],
                highlights: [i],
                searchTarget: target,
                description: `Kiểm tra vị trí ${i}: arr[${i}] = ${arr[i]} ${arr[i] === target ? '==' : '≠'} ${target}`,
                descriptionEn: `Check position ${i}: arr[${i}] = ${arr[i]} ${arr[i] === target ? '==' : '≠'} ${target}`,
                codeLine: 2,
            });

            if (arr[i] === target) {
                steps.push({
                    array: [...arr],
                    highlights: [i],
                    found: i,
                    searchTarget: target,
                    description: `✅ Tìm thấy ${target} tại vị trí ${i}!`,
                    descriptionEn: `✅ Found ${target} at position ${i}!`,
                    codeLine: 3,
                });
                return steps;
            }
        }

        steps.push({
            array: [...arr],
            searchTarget: target,
            description: `❌ Không tìm thấy ${target} trong mảng.`,
            descriptionEn: `❌ ${target} not found in the array.`,
            codeLine: 6,
        });

        return steps;
    },
};
