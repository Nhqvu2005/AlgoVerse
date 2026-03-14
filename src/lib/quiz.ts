// Quiz data and types for algorithm practice

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';

export interface QuizQuestion {
    id: string;
    type: QuestionType;
    question: string;
    questionEn: string;
    options?: string[]; // for multiple choice
    optionsEn?: string[];
    correctAnswer: number | string; // index for multiple choice, or value for fill-blank
    explanation: string;
    explanationEn: string;
}

export interface Quiz {
    slug: string;
    questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
    {
        slug: 'bubble-sort',
        questions: [
            {
                id: 'bs-1',
                type: 'multiple-choice',
                question: 'Bubble Sort so sánh những phần tử nào?',
                questionEn: 'What elements does Bubble Sort compare?',
                options: ['Các phần tử đầu và cuối mảng', 'Các phần tử liền kề nhau', 'Các phần tử ngẫu nhiên', 'Các phần tử có chỉ số chẵn'],
                optionsEn: ['First and last elements', 'Adjacent elements', 'Random elements', 'Even-indexed elements'],
                correctAnswer: 1,
                explanation: 'Bubble Sort so sánh và hoán đổi các cặp phần tử liền kề nhau.',
                explanationEn: 'Bubble Sort compares and swaps adjacent pairs of elements.'
            },
            {
                id: 'bs-2',
                type: 'true-false',
                question: 'Sau mỗi lượt duyệt, phần tử lớn nhất sẽ ở cuối mảng đúng không?',
                questionEn: 'After each pass, the largest element will be at the end of the array, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Phần tử lớn nhất sẽ "nổi" lên cuối mảng sau mỗi lượt.',
                explanationEn: 'Correct! The largest element "bubbles" to the end after each pass.'
            },
            {
                id: 'bs-3',
                type: 'multiple-choice',
                question: 'Độ phức tạp thời gian trung bình của Bubble Sort là gì?',
                questionEn: 'What is the average time complexity of Bubble Sort?',
                options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
                optionsEn: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
                correctAnswer: 2,
                explanation: 'Bubble Sort có độ phức tạp O(n²) trong trường hợp trung bình và xấu nhất.',
                explanationEn: 'Bubble Sort has O(n²) average and worst case complexity.'
            },
            {
                id: 'bs-4',
                type: 'multiple-choice',
                question: 'Bubble Sort có ổn định (stable) không?',
                questionEn: 'Is Bubble Sort stable?',
                options: ['Có', 'Không', 'Tùy thuộc vào cách cài đặt', 'Chỉ khi sử dụng đệ quy'],
                optionsEn: ['Yes', 'No', 'Depends on implementation', 'Only with recursion'],
                correctAnswer: 0,
                explanation: 'Bubble Sort là thuật toán ổn định vì không hoán đổi các phần tử bằng nhau.',
                explanationEn: 'Bubble Sort is stable because it does not swap equal elements.'
            },
            {
                id: 'bs-5',
                type: 'true-false',
                question: 'Bubble Sort hiệu quả nhất khi mảng đã sắp xếp đúng không?',
                questionEn: 'Bubble Sort is most efficient when the array is already sorted, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Khi mảng đã sắp xếp, Bubble Sort chỉ cần một lượt duyệt O(n).',
                explanationEn: 'Correct! When sorted, Bubble Sort only needs one pass O(n).'
            },
            {
                id: 'bs-6',
                type: 'multiple-choice',
                question: 'Số lượng so sánh tối đa trong Bubble Sort với n phần tử là bao nhiêu?',
                questionEn: 'What is the maximum number of comparisons in Bubble Sort with n elements?',
                options: ['n', 'n-1', 'n(n-1)/2', 'n²'],
                optionsEn: ['n', 'n-1', 'n(n-1)/2', 'n²'],
                correctAnswer: 2,
                explanation: 'Số lượng so sánh tối đa là n(n-1)/2 trong trường hợp xấu nhất.',
                explanationEn: 'Maximum comparisons is n(n-1)/2 in worst case.'
            }
        ]
    },
    {
        slug: 'selection-sort',
        questions: [
            {
                id: 'ss-1',
                type: 'multiple-choice',
                question: 'Selection Sort tìm phần tử nhỏ nhất ở đâu trong mỗi lượt?',
                questionEn: 'Where does Selection Sort find the smallest element in each pass?',
                options: ['Toàn bộ mảng', 'Phần chưa sắp xếp', 'Phần đã sắp xếp', 'Nửa đầu mảng'],
                optionsEn: ['Entire array', 'Unsorted portion', 'Sorted portion', 'First half of array'],
                correctAnswer: 1,
                explanation: 'Selection Sort tìm phần tử nhỏ nhất trong phần chưa sắp xếp.',
                explanationEn: 'Selection Sort finds the smallest element in the unsorted portion.'
            },
            {
                id: 'ss-2',
                type: 'true-false',
                question: 'Selection Sort luôn thực hiện hoán đổi n lần đúng không?',
                questionEn: 'Selection Sort always performs n swaps, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Selection Sort chỉ thực hiện n-1 lần hoán đổi (tối đa).',
                explanationEn: 'False! Selection Sort performs at most n-1 swaps.'
            },
            {
                id: 'ss-3',
                type: 'multiple-choice',
                question: 'Selection Sort có phải thuật toán ổn định không?',
                questionEn: 'Is Selection Sort a stable algorithm?',
                options: ['Có, luôn luôn', 'Không, luôn luôn', 'Có thể ổn định tùy cách cài đặt', 'Chỉ khi dùng mảng phụ'],
                optionsEn: ['Yes, always', 'No, always', 'Can be stable depending on implementation', 'Only with extra array'],
                correctAnswer: 1,
                explanation: 'Selection Sort KHÔNG ổn định vì có thể hoán đổi các phần tử bằng nhau.',
                explanationEn: 'Selection Sort is NOT stable because it may swap equal elements.'
            },
            {
                id: 'ss-4',
                type: 'multiple-choice',
                question: 'Điểm nào là điểm mạnh của Selection Sort?',
                questionEn: 'What is the advantage of Selection Sort?',
                options: ['Nhanh nhất', 'Ít so sánh nhất', 'Không tốn bộ nhớ phụ', 'Cả A và C'],
                optionsEn: ['Fastest', 'Fewest comparisons', 'No extra space needed', 'Both A and C'],
                correctAnswer: 2,
                explanation: 'Selection Sort không tốn bộ nhớ phụ ngoài mảng ban đầu - O(1) space.',
                explanationEn: 'Selection Sort needs no extra space - O(1) space complexity.'
            },
            {
                id: 'ss-5',
                type: 'true-false',
                question: 'Selection Sort làm việc tốt với danh sách lớn đúng không?',
                questionEn: 'Selection Sort works well with large lists, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Selection Sort không hiệu quả với danh sách lớn do O(n²).',
                explanationEn: 'False! Selection Sort is not efficient for large lists due to O(n²).'
            }
        ]
    },
    {
        slug: 'insertion-sort',
        questions: [
            {
                id: 'is-1',
                type: 'multiple-choice',
                question: 'Insertion Sort hoạt động giống như cách sắp xếp gì trong thực tế?',
                questionEn: 'Insertion Sort works like sorting what in real life?',
                options: ['Sắp xếp bài trên tay', 'Sắp xếp tiền', 'Xếp hàng mua vé', 'Sắp xếp sách'],
                optionsEn: ['Sorting cards in hand', 'Sorting money', 'Queuing up', 'Organizing books'],
                correctAnswer: 0,
                explanation: 'Giống như sắp xếp bài trên tay - chèn từng lá bài vào vị trí đúng.',
                explanationEn: 'Like sorting cards in hand - inserting each card into its correct position.'
            },
            {
                id: 'is-2',
                type: 'multiple-choice',
                question: 'Insertion Sort hiệu quả nhất khi nào?',
                questionEn: 'When is Insertion Sort most efficient?',
                options: ['Mảng đã sắp xếp', 'Mảng ngẫu nhiên', 'Mảng đảo ngược', 'Mảng rỗng'],
                optionsEn: ['Already sorted array', 'Random array', 'Reversed array', 'Empty array'],
                correctAnswer: 0,
                explanation: 'Insertion Sort hiệu quả nhất O(n) khi mảng đã sắp xếp.',
                explanationEn: 'Insertion Sort is most efficient O(n) when the array is already sorted.'
            },
            {
                id: 'is-3',
                type: 'true-false',
                question: 'Insertion Sort là thuật toán ổn định đúng không?',
                questionEn: 'Insertion Sort is a stable algorithm, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Insertion Sort giữ nguyên thứ tự của các phần tử bằng nhau.',
                explanationEn: 'Correct! Insertion Sort maintains the relative order of equal elements.'
            },
            {
                id: 'is-4',
                type: 'multiple-choice',
                question: 'Insertion Sort phù hợp nhất với loại dữ liệu nào?',
                questionEn: 'What type of data is Insertion Sort best suited for?',
                options: ['Dữ liệu lớn', 'Dữ liệu nhỏ hoặc gần như đã sắp xếp', 'Dữ liệu ngẫu nhiên', 'Dữ liệu có nhiều trùng lặp'],
                optionsEn: ['Large data', 'Small or nearly sorted data', 'Random data', 'Data with many duplicates'],
                correctAnswer: 1,
                explanation: 'Insertion Sort rất hiệu quả với dữ liệu nhỏ hoặc gần như đã sắp xếp.',
                explanationEn: 'Insertion Sort is very efficient for small or nearly sorted data.'
            },
            {
                id: 'is-5',
                type: 'true-false',
                question: 'Insertion Sort yêu cầu bộ nhớ phụ O(n) đúng không?',
                questionEn: 'Insertion Sort requires O(n) extra space, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Insertion Sort chỉ cần O(1) bộ nhớ phụ.',
                explanationEn: 'False! Insertion Sort only needs O(1) extra space.'
            },
            {
                id: 'is-6',
                type: 'multiple-choice',
                question: 'Trong Insertion Sort, "insertion" (chèn) xảy ra ở đâu?',
                questionEn: 'In Insertion Sort, where does "insertion" happen?',
                options: ['Đầu mảng', 'Cuối mảng', 'Vị trí đúng trong phần đã sắp xếp', 'Ngẫu nhiên'],
                optionsEn: ['Beginning of array', 'End of array', 'Correct position in sorted portion', 'Random position'],
                correctAnswer: 2,
                explanation: 'Chèn vào vị trí đúng trong phần đã sắp xếp của mảng.',
                explanationEn: 'Inserting at the correct position in the sorted portion of the array.'
            }
        ]
    },
    {
        slug: 'merge-sort',
        questions: [
            {
                id: 'ms-1',
                type: 'multiple-choice',
                question: 'Merge Sort sử dụng kỹ thuật nào?',
                questionEn: 'What technique does Merge Sort use?',
                options: ['Divide and Conquer', 'Greedy', 'Dynamic Programming', 'Backtracking'],
                optionsEn: ['Divide and Conquer', 'Greedy', 'Dynamic Programming', 'Backtracking'],
                correctAnswer: 0,
                explanation: 'Merge Sort chia mảng thành các nửa, sắp xếp đệ quy, rồi trộn lại.',
                explanationEn: 'Merge Sort divides the array, sorts recursively, then merges.'
            },
            {
                id: 'ms-2',
                type: 'multiple-choice',
                question: 'Độ phức tạp thời gian của Merge Sort là gì?',
                questionEn: 'What is the time complexity of Merge Sort?',
                options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
                optionsEn: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
                correctAnswer: 1,
                explanation: 'Merge Sort luôn có độ phức tạp O(n log n) trong mọi trường hợp.',
                explanationEn: 'Merge Sort always has O(n log n) complexity in all cases.'
            },
            {
                id: 'ms-3',
                type: 'true-false',
                question: 'Merge Sort là thuật toán ổn định đúng không?',
                questionEn: 'Merge Sort is a stable algorithm, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Merge Sort giữ nguyên thứ tự các phần tử bằng nhau.',
                explanationEn: 'Correct! Merge Sort maintains the relative order of equal elements.'
            },
            {
                id: 'ms-4',
                type: 'multiple-choice',
                question: 'Nhược điểm chính của Merge Sort là gì?',
                questionEn: 'What is the main disadvantage of Merge Sort?',
                options: ['Chậm với dữ liệu nhỏ', 'Không ổn định', 'Tốn bộ nhớ O(n)', 'Không hiệu quả với đệ quy'],
                optionsEn: ['Slow for small data', 'Not stable', 'Requires O(n) extra space', 'Inefficient with recursion'],
                correctAnswer: 2,
                explanation: 'Merge Sort cần O(n) bộ nhớ phụ cho mảng tạm.',
                explanationEn: 'Merge Sort needs O(n) extra space for temporary array.'
            },
            {
                id: 'ms-5',
                type: 'true-false',
                question: 'Merge Sort tốt hơn Quick Sort cho danh sách liên kết đúng không?',
                questionEn: 'Merge Sort is better than Quick Sort for linked lists, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Merge Sort hoạt động hiệu quả với linked list mà không cần random access.',
                explanationEn: 'Correct! Merge Sort works efficiently with linked lists without random access.'
            },
            {
                id: 'ms-6',
                type: 'multiple-choice',
                question: 'Bước "merge" trong Merge Sort làm gì?',
                questionEn: 'What does the "merge" step in Merge Sort do?',
                options: ['Chia mảng', 'Sắp xếp từng nửa', 'Kết hợp hai mảng đã sắp xếp thành một', 'Đệ quy gọi chính nó'],
                optionsEn: ['Dividing the array', 'Sorting each half', 'Combining two sorted arrays into one', 'Recursive calls'],
                correctAnswer: 2,
                explanation: 'Merge kết hợp hai mảng đã sắp xếp thành một mảng đã sắp xếp.',
                explanationEn: 'Merge combines two sorted arrays into one sorted array.'
            }
        ]
    },
    {
        slug: 'quick-sort',
        questions: [
            {
                id: 'qs-1',
                type: 'multiple-choice',
                question: 'Quick Sort chọn phần tử gì làm pivot?',
                questionEn: 'What element does Quick Sort choose as pivot?',
                options: ['Phần tử đầu tiên', 'Phần tử cuối cùng', 'Phần tử giữa', 'Có thể là bất kỳ phần tử nào'],
                optionsEn: ['First element', 'Last element', 'Middle element', 'Can be any element'],
                correctAnswer: 3,
                explanation: 'Quick Sort có thể chọn bất kỳ phần tử nào làm pivot.',
                explanationEn: 'Quick Sort can choose any element as the pivot.'
            },
            {
                id: 'qs-2',
                type: 'true-false',
                question: 'Quick Sort có độ phức tạp O(n²) trong trường hợp xấu nhất đúng không?',
                questionEn: 'Quick Sort has O(n²) worst case complexity, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Khi pivot luôn là phần tử lớn nhất hoặc nhỏ nhất.',
                explanationEn: 'Correct! When pivot is always the largest or smallest element.'
            },
            {
                id: 'qs-3',
                type: 'multiple-choice',
                question: 'Để tránh trường hợp xấu nhất của Quick Sort, ta có thể làm gì?',
                questionEn: 'To avoid worst case of Quick Sort, what can we do?',
                options: ['Chọn pivot ngẫu nhiên', 'Sử dụng 3-way partition', 'Cả A và B', 'Không làm gì được'],
                optionsEn: ['Choose random pivot', 'Use 3-way partition', 'Both A and B', 'Nothing can be done'],
                correctAnswer: 2,
                explanation: 'Chọn pivot ngẫu nhiên hoặc dùng 3-way partition giúp tránh worst case.',
                explanationEn: 'Random pivot selection or 3-way partition helps avoid worst case.'
            },
            {
                id: 'qs-4',
                type: 'true-false',
                question: 'Quick Sort thường nhanh hơn Merge Sort trong thực tế đúng không?',
                questionEn: 'Quick Sort is usually faster than Merge Sort in practice, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Quick Sort thường nhanh hơn do cache locality tốt hơn và không cần mảng phụ.',
                explanationEn: 'Correct! Quick Sort is usually faster due to better cache locality and no extra array.'
            },
            {
                id: 'qs-5',
                type: 'multiple-choice',
                question: 'Quick Sort có phải thuật toán ổn định không?',
                questionEn: 'Is Quick Sort a stable algorithm?',
                options: ['Có', 'Không', 'Tùy cách cài đặt', 'Chỉ khi chọn pivot đặc biệt'],
                optionsEn: ['Yes', 'No', 'Depends on implementation', 'Only with special pivot'],
                correctAnswer: 1,
                explanation: 'Quick Sort cơ bản KHÔNG ổn định.',
                explanationEn: 'Basic Quick Sort is NOT stable.'
            },
            {
                id: 'qs-6',
                type: 'multiple-choice',
                question: 'Thuật toán partitioning trong Quick Sort làm gì?',
                questionEn: 'What does the partitioning algorithm in Quick Sort do?',
                options: ['Chia mảng thành nhiều phần', 'Sắp xếp các phần tử quanh pivot', 'Hợp nhất các mảng con', 'Tất cả đều sai'],
                optionsEn: ['Divides array into many parts', 'Arranges elements around pivot', 'Merges subarrays', 'All are wrong'],
                correctAnswer: 1,
                explanation: 'Partition sắp xếp các phần tử: nhỏ hơn pivot bên trái, lớn hơn bên phải.',
                explanationEn: 'Partition arranges elements: smaller than pivot on left, larger on right.'
            }
        ]
    },
    {
        slug: 'linear-search',
        questions: [
            {
                id: 'ls-1',
                type: 'multiple-choice',
                question: 'Linear Search phù hợp nhất với loại mảng nào?',
                questionEn: 'What type of array is Linear Search best suited for?',
                options: ['Mảng đã sắp xếp', 'Mảng chưa sắp xếp nhỏ', 'Mảng lớn', 'Mảng rỗng'],
                optionsEn: ['Sorted array', 'Small unsorted array', 'Large array', 'Empty array'],
                correctAnswer: 1,
                explanation: 'Linear Search phù hợp với mảng nhỏ, chưa sắp xếp.',
                explanationEn: 'Linear Search is best for small, unsorted arrays.'
            },
            {
                id: 'ls-2',
                type: 'multiple-choice',
                question: 'Độ phức tạp thời gian của Linear Search là gì?',
                questionEn: 'What is the time complexity of Linear Search?',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                optionsEn: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                correctAnswer: 2,
                explanation: 'Linear Search có độ phức tạp O(n) - duyệt từng phần tử.',
                explanationEn: 'Linear Search has O(n) complexity - scans each element.'
            },
            {
                id: 'ls-3',
                type: 'true-false',
                question: 'Linear Search luôn tìm thấy phần tử nếu nó tồn tại đúng không?',
                questionEn: 'Linear Search always finds the element if it exists, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Linear Search sẽ tìm thấy nếu phần tử tồn tại trong mảng.',
                explanationEn: 'Correct! Linear Search will find the element if it exists in the array.'
            },
            {
                id: 'ls-4',
                type: 'multiple-choice',
                question: 'Trường hợp tốt nhất của Linear Search là gì?',
                questionEn: 'What is the best case of Linear Search?',
                options: ['Phần tử đầu tiên', 'Phần tử cuối cùng', 'Không tìm thấy', 'Phần tử ở giữa'],
                optionsEn: ['First element', 'Last element', 'Not found', 'Middle element'],
                correctAnswer: 0,
                explanation: 'Best case O(1) khi phần tử cần tìm ở vị trí đầu tiên.',
                explanationEn: 'Best case O(1) when target is at the first position.'
            },
            {
                id: 'ls-5',
                type: 'true-false',
                question: 'Linear Search có thể tìm phần tử lớn nhất trong mảng không sắp xếp đúng không?',
                questionEn: 'Linear Search can find the largest element in an unsorted array, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Linear Search có thể tìm max/min bằng cách so sánh trong một lượt.',
                explanationEn: 'Correct! Linear Search can find max/min by comparing in one pass.'
            }
        ]
    },
    {
        slug: 'binary-search',
        questions: [
            {
                id: 'bs-1',
                type: 'multiple-choice',
                question: 'Binary Search yêu cầu gì về mảng?',
                questionEn: 'What does Binary Search require about the array?',
                options: ['Mảng bất kỳ', 'Mảng đã sắp xếp', 'Mảng có phần tử duy nhất', 'Mảng không trùng lặp'],
                optionsEn: ['Any array', 'Sorted array', 'Array with unique elements', 'Array with no duplicates'],
                correctAnswer: 1,
                explanation: 'Binary Search yêu cầu mảng đã sắp xếp để hoạt động.',
                explanationEn: 'Binary Search requires a sorted array to work.'
            },
            {
                id: 'bs-2',
                type: 'multiple-choice',
                question: 'Binary Search giảm không gian tìm kiếm bao nhiêu lần sau mỗi bước?',
                questionEn: 'How many times does Binary Search reduce the search space after each step?',
                options: ['1 lần', '2 lần', '3 lần', 'n lần'],
                optionsEn: ['1 time', '2 times', '3 times', 'n times'],
                correctAnswer: 1,
                explanation: 'Binary Search giảm một nửa không gian tìm kiếm sau mỗi bước.',
                explanationEn: 'Binary Search halves the search space after each step.'
            },
            {
                id: 'bs-3',
                type: 'true-false',
                question: 'Binary Search có thể cài đặt đệ quy đúng không?',
                questionEn: 'Binary Search can be implemented recursively, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Binary Search có thể cài đặt cả đệ quy và vòng lặp.',
                explanationEn: 'Correct! Binary Search can be implemented both recursively and iteratively.'
            },
            {
                id: 'bs-4',
                type: 'multiple-choice',
                question: 'Số lần tối đa để tìm kiếm trong mảng 100 phần tử là bao nhiêu?',
                questionEn: 'What is the maximum number of steps to search in an array of 100 elements?',
                options: ['10', '7', '50', '100'],
                optionsEn: ['10', '7', '50', '100'],
                correctAnswer: 1,
                explanation: 'log₂(100) ≈ 7 lần. Binary Search cần log₂(n) bước.',
                explanationEn: 'log₂(100) ≈ 7 steps. Binary Search needs log₂(n) steps.'
            },
            {
                id: 'bs-5',
                type: 'true-false',
                question: 'Binary Search luôn tìm được vị trí đầu tiên của phần tử trùng lặp đúng không?',
                questionEn: 'Binary Search always finds the first position of duplicate elements, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Binary Search có thể tìm bất kỳ vị trí nào của phần tử trùng.',
                explanationEn: 'False! Binary Search may find any position of duplicate elements.'
            },
            {
                id: 'bs-6',
                type: 'multiple-choice',
                question: 'Binary Search phù hợp nhất với loại dữ liệu nào?',
                questionEn: 'What type of data is Binary Search best suited for?',
                options: ['Dữ liệu thay đổi thường xuyên', 'Dữ liệu tĩnh, được tìm kiếm nhiều lần', 'Dữ liệu nhỏ', 'Dữ liệu ngẫu nhiên'],
                optionsEn: ['Frequently changing data', 'Static data searched many times', 'Small data', 'Random data'],
                correctAnswer: 1,
                explanation: 'Binary Search tốt nhất khi dữ liệu ít thay đổi và được tìm kiếm nhiều lần.',
                explanationEn: 'Binary Search is best when data changes rarely and is searched many times.'
            }
        ]
    },
    {
        slug: 'bfs',
        questions: [
            {
                id: 'bfs-1',
                type: 'multiple-choice',
                question: 'BFS sử dụng cấu trúc dữ liệu nào?',
                questionEn: 'What data structure does BFS use?',
                options: ['Stack', 'Queue', 'Heap', 'Tree'],
                optionsEn: ['Stack', 'Queue', 'Heap', 'Tree'],
                correctAnswer: 1,
                explanation: 'BFS sử dụng Queue để duyệt theo chiều rộng.',
                explanationEn: 'BFS uses Queue to traverse breadth-first.'
            },
            {
                id: 'bfs-2',
                type: 'true-false',
                question: 'BFS tìm đường đi ngắn nhất trong đồ thị không trọng số đúng không?',
                questionEn: 'BFS finds the shortest path in unweighted graphs, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! BFS đảm bảo tìm đường đi ngắn nhất.',
                explanationEn: 'Correct! BFS guarantees finding the shortest path.'
            },
            {
                id: 'bfs-3',
                type: 'multiple-choice',
                question: 'BFS bắt đầu từ đâu và mở rộng theo hướng nào?',
                questionEn: 'Where does BFS start and expand?',
                options: ['Từ bất kỳ đỉnh nào', 'Từ đỉnh bắt đầu, mở rộng theo tất cả hướng cùng lúc', 'Từ đỉnh có degree cao nhất', 'Ngẫu nhiên'],
                optionsEn: ['From any vertex', 'From start vertex, expanding to all directions simultaneously', 'From highest degree vertex', 'Randomly'],
                correctAnswer: 1,
                explanation: 'BFS bắt đầu từ đỉnh nguồn và mở rộng theo từng tầng.',
                explanationEn: 'BFS starts from source vertex and expands level by level.'
            },
            {
                id: 'bfs-4',
                type: 'true-false',
                question: 'BFS có thể detect cycle trong đồ thị đúng không?',
                questionEn: 'BFS can detect cycles in graphs, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! BFS có thể detect cycle bằng cách kiểm tra visited.',
                explanationEn: 'Correct! BFS can detect cycles by checking visited vertices.'
            },
            {
                id: 'bfs-5',
                type: 'multiple-choice',
                question: 'Độ phức tạp của BFS trên đồ thị G(V, E) là bao nhiêu?',
                questionEn: 'What is the time complexity of BFS on graph G(V, E)?',
                options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
                optionsEn: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
                correctAnswer: 2,
                explanation: 'BFS có độ phức tạp O(V + E) - thăm mỗi đỉnh và cạnh một lần.',
                explanationEn: 'BFS has O(V + E) complexity - visits each vertex and edge once.'
            },
            {
                id: 'bfs-6',
                type: 'true-false',
                question: 'BFS sử dụng nhiều bộ nhớ hơn DFS đúng không?',
                questionEn: 'BFS uses more memory than DFS, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! BFS cần lưu tất cả các đỉnh ở frontier trong khi DFS chỉ cần stack.',
                explanationEn: 'Correct! BFS needs to store all frontier vertices while DFS only needs a stack.'
            }
        ]
    },
    {
        slug: 'dfs',
        questions: [
            {
                id: 'dfs-1',
                type: 'multiple-choice',
                question: 'DFS sử dụng cấu trúc dữ liệu nào?',
                questionEn: 'What data structure does DFS use?',
                options: ['Queue', 'Stack', 'Heap', 'Array'],
                optionsEn: ['Queue', 'Stack', 'Heap', 'Array'],
                correctAnswer: 1,
                explanation: 'DFS sử dụng Stack (hoặc đệ quy) để duyệt theo chiều sâu.',
                explanationEn: 'DFS uses Stack (or recursion) to traverse depth-first.'
            },
            {
                id: 'dfs-2',
                type: 'multiple-choice',
                question: 'DFS phù hợp với bài toán nào?',
                questionEn: 'What problems is DFS best suited for?',
                options: ['Tìm đường đi ngắn nhất', 'Detect cycle', 'Topological sort', 'Tất cả các đáp án'],
                optionsEn: ['Shortest path', 'Detect cycle', 'Topological sort', 'All of the above'],
                correctAnswer: 3,
                explanation: 'DFS dùng để detect cycle, topological sort, và nhiều bài toán khác.',
                explanationEn: 'DFS is used for cycle detection, topological sort, and more.'
            },
            {
                id: 'dfs-3',
                type: 'true-false',
                question: 'DFS có thể bị stuck trong infinite loop nếu có cycle đúng không?',
                questionEn: 'DFS can get stuck in infinite loop if there is a cycle, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Cần track visited để tránh infinite loop.',
                explanationEn: 'Correct! Need to track visited to avoid infinite loop.'
            },
            {
                id: 'dfs-4',
                type: 'multiple-choice',
                question: 'DFS có thể được cài đặt bằng cách nào?',
                questionEn: 'How can DFS be implemented?',
                options: ['Chỉ đệ quy', 'Chỉ iterative', 'Cả đệ quy và iterative', 'Không thể cài đặt'],
                optionsEn: ['Only recursive', 'Only iterative', 'Both recursive and iterative', 'Cannot be implemented'],
                correctAnswer: 2,
                explanation: 'DFS có thể cài đặt bằng đệ quy hoặc dùng stack explicit.',
                explanationEn: 'DFS can be implemented recursively or using explicit stack.'
            },
            {
                id: 'dfs-5',
                type: 'true-false',
                question: 'DFS không đảm bảo tìm đường đi ngắn nhất đúng không?',
                questionEn: 'DFS does not guarantee finding the shortest path, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! DFS không tìm đường đi ngắn nhất.',
                explanationEn: 'Correct! DFS does not find the shortest path.'
            }
        ]
    },
    {
        slug: 'stack',
        questions: [
            {
                id: 'st-1',
                type: 'multiple-choice',
                question: 'Stack hoạt động theo nguyên tắc nào?',
                questionEn: 'What principle does Stack follow?',
                options: ['FIFO', 'LIFO', 'Random', 'Priority'],
                optionsEn: ['FIFO', 'LIFO', 'Random', 'Priority'],
                correctAnswer: 1,
                explanation: 'Stack hoạt động theo LIFO - Last In, First Out.',
                explanationEn: 'Stack follows LIFO - Last In, First Out.'
            },
            {
                id: 'st-2',
                type: 'true-false',
                question: 'Phần tử được thêm vào sau cùng sẽ được lấy ra đầu tiên đúng không?',
                questionEn: 'The element added last will be removed first, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Đó là nguyên tắc LIFO của Stack.',
                explanationEn: 'Correct! That is the LIFO principle of Stack.'
            },
            {
                id: 'st-3',
                type: 'multiple-choice',
                question: 'Thao tác nào KHÔNG phải của Stack?',
                questionEn: 'Which operation is NOT part of Stack?',
                options: ['push', 'pop', 'enqueue', 'peek'],
                optionsEn: ['push', 'pop', 'enqueue', 'peek'],
                correctAnswer: 2,
                explanation: 'enqueue là thao tác của Queue, không phải Stack.',
                explanationEn: 'enqueue is a Queue operation, not Stack.'
            },
            {
                id: 'st-4',
                type: 'multiple-choice',
                question: 'Stack thường được dùng trong trường hợp nào?',
                questionEn: 'What is Stack commonly used for?',
                options: ['Breadth-first search', 'Function call management', 'Level order traversal', 'Tất cả đều sai'],
                optionsEn: ['Breadth-first search', 'Function call management', 'Level order traversal', 'All are wrong'],
                correctAnswer: 1,
                explanation: 'Stack dùng để quản lý function calls, undo operations.',
                explanationEn: 'Stack is used for function call management, undo operations.'
            },
            {
                id: 'st-5',
                type: 'true-false',
                question: 'Stack có thể implemented bằng Array đúng không?',
                questionEn: 'Stack can be implemented using Array, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Stack có thể implemented bằng Array hoặc Linked List.',
                explanationEn: 'Correct! Stack can be implemented using Array or Linked List.'
            }
        ]
    },
    {
        slug: 'queue',
        questions: [
            {
                id: 'q-1',
                type: 'multiple-choice',
                question: 'Queue hoạt động theo nguyên tắc nào?',
                questionEn: 'What principle does Queue follow?',
                options: ['LIFO', 'FIFO', 'Random', 'Priority'],
                optionsEn: ['LIFO', 'FIFO', 'Random', 'Priority'],
                correctAnswer: 1,
                explanation: 'Queue hoạt động theo FIFO - First In, First Out.',
                explanationEn: 'Queue follows FIFO - First In, First Out.'
            },
            {
                id: 'q-2',
                type: 'multiple-choice',
                question: 'Queue thường được dùng trong tình huống nào?',
                questionEn: 'In what situation is Queue commonly used?',
                options: ['Undo functionality', 'Breadth-first search', 'Function call stack', 'Recursive algorithms'],
                optionsEn: ['Undo functionality', 'Breadth-first search', 'Function call stack', 'Recursive algorithms'],
                correctAnswer: 1,
                explanation: 'Queue được dùng trong BFS và xử lý hàng đợi.',
                explanationEn: 'Queue is used in BFS and handling waiting lines.'
            },
            {
                id: 'q-3',
                type: 'true-false',
                question: 'Queue chỉ có thể implemented bằng Linked List đúng không?',
                questionEn: 'Queue can only be implemented using Linked List, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Queue có thể implemented bằng Array, Linked List, hoặc circular buffer.',
                explanationEn: 'False! Queue can be implemented using Array, Linked List, or circular buffer.'
            },
            {
                id: 'q-4',
                type: 'multiple-choice',
                question: 'Thao tác nào KHÔNG phải của Queue?',
                questionEn: 'Which operation is NOT part of Queue?',
                options: ['enqueue', 'dequeue', 'push', 'peek'],
                optionsEn: ['enqueue', 'dequeue', 'push', 'peek'],
                correctAnswer: 2,
                explanation: 'push là thao tác của Stack, enqueue mới là của Queue.',
                explanationEn: 'push is a Stack operation, enqueue is for Queue.'
            },
            {
                id: 'q-5',
                type: 'true-false',
                question: 'Priority Queue có thể implemented bằng Heap đúng không?',
                questionEn: 'Priority Queue can be implemented using Heap, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Heap là cách hiệu quả nhất để implement Priority Queue.',
                explanationEn: 'Correct! Heap is the most efficient way to implement Priority Queue.'
            }
        ]
    },
    {
        slug: 'linked-list',
        questions: [
            {
                id: 'll-1',
                type: 'multiple-choice',
                question: 'Điểm mạnh của Linked List so với Array là gì?',
                questionEn: 'What is the advantage of Linked List over Array?',
                options: ['Truy cập nhanh theo index', 'Chèn/xóa phần tử hiệu quả', 'Tiết kiệm bộ nhớ hơn', 'Duy trì thứ tự tốt hơn'],
                optionsEn: ['Fast index access', 'Efficient insert/delete', 'More memory efficient', 'Better order maintenance'],
                correctAnswer: 1,
                explanation: 'Linked List chèn/xóa phần tử hiệu quả O(1) không cần dời các phần tử khác.',
                explanationEn: 'Linked List can insert/delete in O(1) without shifting other elements.'
            },
            {
                id: 'll-2',
                type: 'true-false',
                question: 'Linked List có thể truy cập phần tử theo index nhanh như Array đúng không?',
                questionEn: 'Linked List can access elements by index as fast as Array, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Linked List cần duyệt từ đầu O(n) để truy cập theo index.',
                explanationEn: 'False! Linked List needs O(n) traversal to access by index.'
            },
            {
                id: 'll-3',
                type: 'multiple-choice',
                question: 'Có mấy loại Linked List?',
                questionEn: 'How many types of Linked List are there?',
                options: ['1', '2', '3', '4'],
                optionsEn: ['1', '2', '3', '4'],
                correctAnswer: 2,
                explanation: 'Có 3 loại: Singly, Doubly, Circular Linked List.',
                explanationEn: 'There are 3 types: Singly, Doubly, Circular Linked List.'
            },
            {
                id: 'll-4',
                type: 'true-false',
                question: 'Doubly Linked List có con trỏ previous đúng không?',
                questionEn: 'Doubly Linked List has previous pointer, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Doubly Linked List có cả next và previous pointers.',
                explanationEn: 'Correct! Doubly Linked List has both next and previous pointers.'
            },
            {
                id: 'll-5',
                type: 'multiple-choice',
                question: 'Nhược điểm chính của Linked List là gì?',
                questionEn: 'What is the main disadvantage of Linked List?',
                options: ['Không thể mở rộng', 'Không support random access', 'Chậm hơn Array', 'Tất cả đều đúng'],
                optionsEn: ['Cannot grow', 'Does not support random access', 'Slower than Array', 'All are correct'],
                correctAnswer: 1,
                explanation: 'Linked List không support random access - cần traverse từ đầu.',
                explanationEn: 'Linked List does not support random access - needs traversal from head.'
            },
            {
                id: 'll-6',
                type: 'true-false',
                question: 'Linked List tiêu tốn nhiều bộ nhớ hơn Array do lưu con trỏ đúng không?',
                questionEn: 'Linked List uses more memory than Array due to storing pointers, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Mỗi node cần lưu thêm con trỏ nên tốn bộ nhớ hơn.',
                explanationEn: 'Correct! Each node needs to store pointers, using more memory.'
            }
        ]
    },
    {
        slug: 'binary-tree',
        questions: [
            {
                id: 'bt-1',
                type: 'multiple-choice',
                question: 'Trong BST, node bên trái như thế nào so với node cha?',
                questionEn: 'In BST, how is the left node compared to its parent?',
                options: ['Lớn hơn', 'Nhỏ hơn', 'Bằng', 'Không có quy tắc'],
                optionsEn: ['Greater than', 'Less than', 'Equal to', 'No rule'],
                correctAnswer: 1,
                explanation: 'Trong BST, node trái luôn nhỏ hơn node cha.',
                explanationEn: 'In BST, left node is always less than its parent.'
            },
            {
                id: 'bt-2',
                type: 'multiple-choice',
                question: 'Độ phức tạp tìm kiếm trong BST cân bằng là gì?',
                questionEn: 'What is the search complexity in a balanced BST?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                optionsEn: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                correctAnswer: 2,
                explanation: 'BST cân bằng có độ phức tạp tìm kiếm O(log n).',
                explanationEn: 'Balanced BST has O(log n) search complexity.'
            },
            {
                id: 'bt-3',
                type: 'true-false',
                question: 'BST có thể bị mất cân bằng khi chèn dữ liệu theo thứ tự đúng không?',
                questionEn: 'BST can become unbalanced when inserting data in order, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Chèn theo thứ tự tạo ra skewed tree O(n).',
                explanationEn: 'Correct! Inserting in order creates skewed tree O(n).'
            },
            {
                id: 'bt-4',
                type: 'multiple-choice',
                question: 'Cây nhị phân đầy đủ (full) có đặc điểm gì?',
                questionEn: 'What is the property of a full binary tree?',
                options: ['Mỗi node có 0 hoặc 2 con', 'Mọi tầng đều đầy', 'Chiều cao tối thiểu', 'Tất cả đều đúng'],
                optionsEn: ['Each node has 0 or 2 children', 'All levels are full', 'Minimum height', 'All are correct'],
                correctAnswer: 0,
                explanation: 'Full binary tree: mỗi node có 0 hoặc 2 con.',
                explanationEn: 'Full binary tree: each node has 0 or 2 children.'
            },
            {
                id: 'bt-5',
                type: 'true-false',
                question: 'In-order traversal của BST cho kết quả đã sắp xếp đúng không?',
                questionEn: 'In-order traversal of BST gives sorted result, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! In-order traversal của BST cho mảng sorted theo thứ tự tăng dần.',
                explanationEn: 'Correct! In-order traversal of BST gives sorted array in ascending order.'
            },
            {
                id: 'bt-6',
                type: 'multiple-choice',
                question: 'Số node tối đa trong cây chiều cao h là bao nhiêu?',
                questionEn: 'What is the maximum number of nodes in a tree with height h?',
                options: ['h', 'h+1', '2^h - 1', '2^h'],
                optionsEn: ['h', 'h+1', '2^h - 1', '2^h'],
                correctAnswer: 2,
                explanation: 'Cây đầy đủ (full) có tối đa 2^h - 1 nodes.',
                explanationEn: 'Full tree has maximum 2^h - 1 nodes.'
            }
        ]
    },
    {
        slug: 'arrays',
        questions: [
            {
                id: 'arr-1',
                type: 'multiple-choice',
                question: 'Truy cập phần tử trong Array có độ phức tạp bao nhiêu?',
                questionEn: 'What is the complexity of accessing an element in Array?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                optionsEn: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correctAnswer: 0,
                explanation: 'Array truy cập theo index là O(1) vì các phần tử lưu liên tiếp trong bộ nhớ.',
                explanationEn: 'Array index access is O(1) because elements are stored contiguously in memory.'
            },
            {
                id: 'arr-2',
                type: 'true-false',
                question: 'Chèn phần tử vào đầu mảng hiệu quả đúng không?',
                questionEn: 'Inserting at the beginning of an array is efficient, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Chèn vào đầu mảng cần dời tất cả các phần tử khác - O(n).',
                explanationEn: 'False! Inserting at the beginning requires shifting all elements - O(n).'
            },
            {
                id: 'arr-3',
                type: 'multiple-choice',
                question: 'Array có đặc điểm gì về bộ nhớ?',
                questionEn: 'What is the memory characteristic of Array?',
                options: ['Phân tán', 'Liên tiếp', 'Ngẫu nhiên', 'Liên kết'],
                optionsEn: ['Scattered', 'Contiguous', 'Random', 'Linked'],
                correctAnswer: 1,
                explanation: 'Array lưu trữ các phần tử liên tiếp trong bộ nhớ.',
                explanationEn: 'Array stores elements contiguously in memory.'
            },
            {
                id: 'arr-4',
                type: 'true-false',
                question: 'Array động (dynamic array) có thể thay đổi kích thước đúng không?',
                questionEn: 'Dynamic array can change size, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Dynamic array (ArrayList, Vector) tự động resize khi cần.',
                explanationEn: 'Correct! Dynamic array (ArrayList, Vector) automatically resizes when needed.'
            },
            {
                id: 'arr-5',
                type: 'multiple-choice',
                question: 'Xóa phần tử ở cuối mảng có độ phức tạp bao nhiêu?',
                questionEn: 'What is the complexity of removing an element at the end of an array?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                optionsEn: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correctAnswer: 0,
                explanation: 'Xóa ở cuối mảng là O(1) - không cần dời phần tử.',
                explanationEn: 'Removing at end is O(1) - no element shifting needed.'
            },
            {
                id: 'arr-6',
                type: 'true-false',
                question: 'Array 2D lưu trữ trong memory theo row-major order đúng không?',
                questionEn: '2D arrays are stored in row-major order in memory, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Trong hầu hết languages, array 2D lưu row by row.',
                explanationEn: 'Correct! In most languages, 2D arrays are stored row by row.'
            }
        ]
    },
    {
        slug: 'dijkstra',
        questions: [
            {
                id: 'dk-1',
                type: 'multiple-choice',
                question: 'Dijkstra tìm đường đi ngắn nhất với loại đồ thị nào?',
                questionEn: 'What type of graph does Dijkstra find shortest path for?',
                options: ['Đồ thị bất kỳ', 'Đồ thị có trọng số dương', 'Đồ thị có hướng', 'Đồ thị vô hướng'],
                optionsEn: ['Any graph', 'Graph with positive weights', 'Directed graph', 'Undirected graph'],
                correctAnswer: 1,
                explanation: 'Dijkstra chỉ hoạt động với trọng số dương.',
                explanationEn: 'Dijkstra only works with positive edge weights.'
            },
            {
                id: 'dk-2',
                type: 'multiple-choice',
                question: 'Cấu trúc dữ liệu nào thường được dùng trong Dijkstra?',
                questionEn: 'What data structure is commonly used in Dijkstra?',
                options: ['Stack', 'Queue', 'Priority Queue/Heap', 'Array'],
                optionsEn: ['Stack', 'Queue', 'Priority Queue/Heap', 'Array'],
                correctAnswer: 2,
                explanation: 'Dijkstra sử dụng Priority Queue (Heap) để chọn đỉnh gần nhất.',
                explanationEn: 'Dijkstra uses Priority Queue (Heap) to select the nearest vertex.'
            },
            {
                id: 'dk-3',
                type: 'true-false',
                question: 'Dijkstra có thể hoạt động với trọng số âm đúng không?',
                questionEn: 'Dijkstra can work with negative weights, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Dijkstra KHÔNG hoạt động với trọng số âm.',
                explanationEn: 'False! Dijkstra does NOT work with negative weights.'
            },
            {
                id: 'dk-4',
                type: 'multiple-choice',
                question: 'Độ phức tạp của Dijkstra với Priority Queue là gì?',
                questionEn: 'What is the complexity of Dijkstra with Priority Queue?',
                options: ['O(V)', 'O(E)', 'O(V log V)', 'O((V + E) log V)'],
                optionsEn: ['O(V)', 'O(E)', 'O(V log V)', 'O((V + E) log V)'],
                correctAnswer: 3,
                explanation: 'Dijkstra với Binary Heap: O((V + E) log V).',
                explanationEn: 'Dijkstra with Binary Heap: O((V + E) log V).'
            },
            {
                id: 'dk-5',
                type: 'true-false',
                question: 'Dijkstra tìm tất cả các đường đi từ một đỉnh nguồn đúng không?',
                questionEn: 'Dijkstra finds all paths from a single source vertex, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Dijkstra tìm đường đi ngắn nhất từ đỉnh nguồn đến tất cả các đỉnh.',
                explanationEn: 'Correct! Dijkstra finds shortest paths from source to all vertices.'
            },
            {
                id: 'dk-6',
                type: 'multiple-choice',
                question: 'Thuật toán nào thay thế cho Dijkstra khi có trọng số âm?',
                questionEn: 'Which algorithm replaces Dijkstra when there are negative weights?',
                options: ['Bellman-Ford', 'Floyd-Warshall', 'A*', 'Prim'],
                optionsEn: ['Bellman-Ford', 'Floyd-Warshall', 'A*', 'Prim'],
                correctAnswer: 0,
                explanation: 'Bellman-Ford có thể xử lý trọng số âm.',
                explanationEn: 'Bellman-Ford can handle negative weights.'
            }
        ]
    },
    {
        slug: 'heap',
        questions: [
            {
                id: 'hp-1',
                type: 'multiple-choice',
                question: 'Trong Min Heap, phần tử nhỏ nhất nằm ở đâu?',
                questionEn: 'Where is the smallest element in Min Heap?',
                options: ['Cuối heap', 'Đầu heap (root)', 'Ngẫu nhiên', 'Không có quy tắc'],
                optionsEn: ['End of heap', 'Root of heap', 'Random', 'No rule'],
                correctAnswer: 1,
                explanation: 'Trong Min Heap, phần tử nhỏ nhất luôn ở root.',
                explanationEn: 'In Min Heap, the smallest element is always at the root.'
            },
            {
                id: 'hp-2',
                type: 'multiple-choice',
                question: 'Heap được dùng để cài đặt cấu trúc nào?',
                questionEn: 'What data structure is Heap commonly used to implement?',
                options: ['Stack', 'Queue', 'Priority Queue', 'Linked List'],
                optionsEn: ['Stack', 'Queue', 'Priority Queue', 'Linked List'],
                correctAnswer: 2,
                explanation: 'Heap thường dùng để cài đặt Priority Queue.',
                explanationEn: 'Heap is commonly used to implement Priority Queue.'
            },
            {
                id: 'hp-3',
                type: 'true-false',
                question: 'Heap là cây nhị phân đầy đủ đúng không?',
                questionEn: 'Heap is a complete binary tree, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Heap là complete binary tree.',
                explanationEn: 'Correct! Heap is a complete binary tree.'
            },
            {
                id: 'hp-4',
                type: 'multiple-choice',
                question: 'Độ phức tạp của heapify là bao nhiêu?',
                questionEn: 'What is the complexity of heapify?',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                optionsEn: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                correctAnswer: 1,
                explanation: 'Heapify có độ phức tạp O(log n).',
                explanationEn: 'Heapify has O(log n) complexity.'
            },
            {
                id: 'hp-5',
                type: 'true-false',
                question: 'Max Heap thì phần tử lớn nhất ở root đúng không?',
                questionEn: 'In Max Heap, the largest element is at the root, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Max Heap có phần tử lớn nhất ở root.',
                explanationEn: 'Correct! Max Heap has the largest element at the root.'
            },
            {
                id: 'hp-6',
                type: 'multiple-choice',
                question: 'Heap Sort có độ phức tạp trung bình là gì?',
                questionEn: 'What is the average complexity of Heap Sort?',
                options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
                optionsEn: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
                correctAnswer: 1,
                explanation: 'Heap Sort có độ phức tạp O(n log n) trong mọi trường hợp.',
                explanationEn: 'Heap Sort has O(n log n) complexity in all cases.'
            }
        ]
    },
    {
        slug: 'hash-table',
        questions: [
            {
                id: 'ht-1',
                type: 'multiple-choice',
                question: 'Hash Table thường có độ phức tạp trung bình là bao nhiêu?',
                questionEn: 'What is the average time complexity of Hash Table?',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                optionsEn: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                correctAnswer: 0,
                explanation: 'Hash Table có độ phức tạp O(1) trung bình cho insert, search, delete.',
                explanationEn: 'Hash Table has O(1) average complexity for insert, search, delete.'
            },
            {
                id: 'ht-2',
                type: 'multiple-choice',
                question: 'Hiện tượng khi hai key khác nhau băm ra cùng một index gọi là gì?',
                questionEn: 'What is it called when two different keys hash to the same index?',
                options: ['Overflow', 'Collision', 'Duplicate', 'Conflict'],
                optionsEn: ['Overflow', 'Collision', 'Duplicate', 'Conflict'],
                correctAnswer: 1,
                explanation: 'Hiện tượng này gọi là Collision (va chạm).',
                explanationEn: 'This phenomenon is called Collision.'
            },
            {
                id: 'ht-3',
                type: 'true-false',
                question: 'Hash function tốt phân bổ đều các key đúng không?',
                questionEn: 'A good hash function distributes keys evenly, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Hash function tốt minimize collisions bằng cách phân bổ đều.',
                explanationEn: 'Correct! Good hash function minimizes collisions by distributing evenly.'
            },
            {
                id: 'ht-4',
                type: 'multiple-choice',
                question: 'Phương pháp nào xử lý collision bằng cách lưu nhiều phần tử tại cùng một index?',
                questionEn: 'Which method handles collisions by storing multiple elements at the same index?',
                options: ['Open Addressing', 'Chaining', 'Linear Probing', 'Quadratic Probing'],
                optionsEn: ['Open Addressing', 'Chaining', 'Linear Probing', 'Quadratic Probing'],
                correctAnswer: 1,
                explanation: 'Chaining lưu nhiều phần tử tại cùng index (linked list).',
                explanationEn: 'Chaining stores multiple elements at same index (linked list).'
            },
            {
                id: 'ht-5',
                type: 'true-false',
                question: 'Load factor cao làm tăng collisions đúng không?',
                questionEn: 'High load factor increases collisions, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Load factor = n/m, cao hơn means more collisions.',
                explanationEn: 'Correct! Higher load factor means more collisions.'
            },
            {
                id: 'ht-6',
                type: 'multiple-choice',
                question: 'Khi nào nên resize Hash Table?',
                questionEn: 'When should Hash Table be resized?',
                options: ['Khi đầy 100%', 'Khi load factor vượt ngưỡng (thường 0.75)', 'Khi có collision', 'Khi tìm không thấy'],
                optionsEn: ['When 100% full', 'When load factor exceeds threshold (usually 0.75)', 'When collision occurs', 'When not found'],
                correctAnswer: 1,
                explanation: 'Resize khi load factor > 0.75 để tránh nhiều collisions.',
                explanationEn: 'Resize when load factor > 0.75 to avoid excessive collisions.'
            }
        ]
    },
    {
        slug: 'avl-tree',
        questions: [
            {
                id: 'avl-1',
                type: 'multiple-choice',
                question: 'AVL Tree là loại cây gì?',
                questionEn: 'What type of tree is AVL Tree?',
                options: ['Binary Tree', 'Binary Search Tree tự cân bằng', 'N-ary Tree', 'B-Tree'],
                optionsEn: ['Binary Tree', 'Self-balancing BST', 'N-ary Tree', 'B-Tree'],
                correctAnswer: 1,
                explanation: 'AVL Tree là Binary Search Tree tự cân bằng.',
                explanationEn: 'AVL Tree is a self-balancing Binary Search Tree.'
            },
            {
                id: 'avl-2',
                type: 'multiple-choice',
                question: 'AVL Tree duy trì độ chênh lệch chiều cao tối đa giữa hai cây con là bao nhiêu?',
                questionEn: 'What is the maximum height difference AVL Tree maintains between subtrees?',
                options: ['0', '1', '2', 'Không giới hạn'],
                optionsEn: ['0', '1', '2', 'Unlimited'],
                correctAnswer: 1,
                explanation: 'AVL Tree duy trì chênh lệch tối đa là 1.',
                explanationEn: 'AVL Tree maintains a maximum difference of 1.'
            },
            {
                id: 'avl-3',
                type: 'true-false',
                question: 'AVL Tree sử dụng 4 loại rotation để cân bằng đúng không?',
                questionEn: 'AVL Tree uses 4 types of rotations to balance, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! AVL có: LL, RR, LR, RL rotations.',
                explanationEn: 'Correct! AVL has: LL, RR, LR, RL rotations.'
            },
            {
                id: 'avl-4',
                type: 'multiple-choice',
                question: 'Độ phức tạp của các thao tác trong AVL Tree là gì?',
                questionEn: 'What is the complexity of operations in AVL Tree?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                optionsEn: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                correctAnswer: 2,
                explanation: 'Tất cả thao tác trong AVL Tree đều O(log n).',
                explanationEn: 'All operations in AVL Tree are O(log n).'
            },
            {
                id: 'avl-5',
                type: 'true-false',
                question: 'AVL Tree cân bằng hơn Red-Black Tree đúng không?',
                questionEn: 'AVL Tree is more balanced than Red-Black Tree, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! AVL Tree cân bằng hơn (max diff = 1) nhưng insert/delete chậm hơn.',
                explanationEn: 'Correct! AVL is more balanced but insert/delete is slower than RB Tree.'
            },
            {
                id: 'avl-6',
                type: 'multiple-choice',
                question: 'Rotation nào cần thiết khi cây bị mất cân bằng kiểu Left-Right?',
                questionEn: 'Which rotation is needed when tree is unbalanced in Left-Right pattern?',
                options: ['Single rotation', 'Double rotation (LR)', 'Không cần rotation', 'Tất cả đều sai'],
                optionsEn: ['Single rotation', 'Double rotation (LR)', 'No rotation needed', 'All are wrong'],
                correctAnswer: 1,
                explanation: 'LR imbalance cần double rotation: left rồi right.',
                explanationEn: 'LR imbalance needs double rotation: left then right.'
            }
        ]
    },
    {
        slug: 'trie',
        questions: [
            {
                id: 'trie-1',
                type: 'multiple-choice',
                question: 'Trie thường được dùng cho loại bài toán nào?',
                questionEn: 'What type of problems is Trie commonly used for?',
                options: ['Tìm kiếm chuỗi', 'Sắp xếp số', 'Tìm đường đi ngắn nhất', 'Mã hóa'],
                optionsEn: ['String searching', 'Number sorting', 'Shortest path', 'Encoding'],
                correctAnswer: 0,
                explanation: 'Trie được dùng cho bài toán tìm kiếm chuỗi, autocomplete.',
                explanationEn: 'Trie is used for string searching, autocomplete problems.'
            },
            {
                id: 'trie-2',
                type: 'true-false',
                question: 'Trie lưu trữ các ký tự theo từng node đúng không?',
                questionEn: 'Trie stores characters at each node, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Mỗi node trong Trie đại diện cho một ký tự.',
                explanationEn: 'Correct! Each node in Trie represents a character.'
            },
            {
                id: 'trie-3',
                type: 'multiple-choice',
                question: 'Độ phức tạp để tìm một từ trong Trie là gì?',
                questionEn: 'What is the complexity to find a word in Trie?',
                options: ['O(1)', 'O(n)', 'O(L)', 'O(log n)'],
                optionsEn: ['O(1)', 'O(n)', 'O(L)', 'O(log n)'],
                correctAnswer: 2,
                explanation: 'Tìm kiếm trong Trie mất O(L) với L là độ dài từ.',
                explanationEn: 'Search in Trie takes O(L) where L is word length.'
            },
            {
                id: 'trie-4',
                type: 'true-false',
                question: 'Trie có thể dùng để kiểm tra prefix đúng không?',
                questionEn: 'Trie can be used to check for prefixes, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Trie rất hiệu quả cho prefix matching.',
                explanationEn: 'Correct! Trie is very efficient for prefix matching.'
            },
            {
                id: 'trie-5',
                type: 'multiple-choice',
                question: 'Nhược điểm chính của Trie là gì?',
                questionEn: 'What is the main disadvantage of Trie?',
                options: ['Tìm kiếm chậm', 'Tốn nhiều bộ nhớ', 'Không support xóa', 'Tất cả đều sai'],
                optionsEn: ['Slow search', 'High memory usage', 'Does not support deletion', 'All are wrong'],
                correctAnswer: 1,
                explanation: 'Trie tốn nhiều bộ nhớ vì mỗi node cần nhiều con trỏ.',
                explanationEn: 'Trie uses a lot of memory because each node needs many pointers.'
            },
            {
                id: 'trie-6',
                type: 'true-false',
                question: 'Trie còn được gọi là Prefix Tree đúng không?',
                questionEn: 'Trie is also called Prefix Tree, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Trie = Retrieval, còn gọi là Prefix Tree.',
                explanationEn: 'Correct! Trie = Retrieval, also called Prefix Tree.'
            }
        ]
    },
    {
        slug: 'prim',
        questions: [
            {
                id: 'prim-1',
                type: 'multiple-choice',
                question: 'Thuật toán Prim tìm gì?',
                questionEn: 'What does Prim\'s algorithm find?',
                options: ['Đường đi ngắn nhất', 'Cây khung nhỏ nhất (MST)', 'Topological sort', 'Cycle ngắn nhất'],
                optionsEn: ['Shortest path', 'Minimum Spanning Tree (MST)', 'Topological sort', 'Shortest cycle'],
                correctAnswer: 1,
                explanation: 'Prim tìm cây khung nhỏ nhất (MST) của đồ thị.',
                explanationEn: 'Prim\'s algorithm finds the Minimum Spanning Tree (MST).'
            },
            {
                id: 'prim-2',
                type: 'multiple-choice',
                question: 'Prim tương tự thuật toán nào?',
                questionEn: 'Prim is similar to which algorithm?',
                options: ['Dijkstra', 'BFS', 'Kruskal', 'DFS'],
                optionsEn: ['Dijkstra', 'BFS', 'Kruskal', 'DFS'],
                correctAnswer: 0,
                explanation: 'Prim tương tự Dijkstra, đều sử dụng Priority Queue.',
                explanationEn: 'Prim is similar to Dijkstra, both use Priority Queue.'
            },
            {
                id: 'prim-3',
                type: 'true-false',
                question: 'Prim là thuật toán Greedy đúng không?',
                questionEn: 'Prim is a Greedy algorithm, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Prim chọn cạnh có trọng số nhỏ nhất mỗi bước.',
                explanationEn: 'Correct! Prim picks the minimum weight edge at each step.'
            },
            {
                id: 'prim-4',
                type: 'multiple-choice',
                question: 'Độ phức tạp của Prim với adjacency matrix là gì?',
                questionEn: 'What is the complexity of Prim with adjacency matrix?',
                options: ['O(E log V)', 'O(V²)', 'O(E + V log V)', 'O(V³)'],
                optionsEn: ['O(E log V)', 'O(V²)', 'O(E + V log V)', 'O(V³)'],
                correctAnswer: 1,
                explanation: 'Prim với array: O(V²). Với binary heap: O(E log V).',
                explanationEn: 'Prim with array: O(V²). With binary heap: O(E log V).'
            },
            {
                id: 'prim-5',
                type: 'true-false',
                question: 'Prim và Kruskal cho cùng kết quả MST đúng không?',
                questionEn: 'Prim and Kruskal give the same MST result, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Cùng một MST nhưng có thể khác nhau nếu có nhiều cạnh cùng trọng số.',
                explanationEn: 'Correct! Same MST but may differ if multiple edges have same weight.'
            }
        ]
    },
    {
        slug: 'loops',
        questions: [
            {
                id: 'loop-1',
                type: 'multiple-choice',
                question: 'Vòng lặp nào phù hợp khi biết trước số lần lặp?',
                questionEn: 'Which loop is best when you know the number of iterations in advance?',
                options: ['while', 'do-while', 'for', 'Tất cả đều được'],
                optionsEn: ['while', 'do-while', 'for', 'All work'],
                correctAnswer: 2,
                explanation: 'Vòng for phù hợp khi biết trước số lần lặp.',
                explanationEn: 'For loop is best when you know the number of iterations.'
            },
            {
                id: 'loop-2',
                type: 'true-false',
                question: 'Vòng while có thể chạy 0 lần đúng không?',
                questionEn: 'While loop can run 0 times, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! Nếu điều kiện ban đầu false, vòng while sẽ không chạy.',
                explanationEn: 'Correct! If the condition is initially false, while loop won\'t run.'
            },
            {
                id: 'loop-3',
                type: 'multiple-choice',
                question: 'Sự khác biệt giữa while và do-while là gì?',
                questionEn: 'What is the difference between while and do-while?',
                options: ['Không có khác biệt', 'do-while chạy ít nhất 1 lần', 'while hiệu quả hơn', 'Tất cả đều sai'],
                optionsEn: ['No difference', 'do-while runs at least once', 'while is more efficient', 'All are wrong'],
                correctAnswer: 1,
                explanation: 'do-while luôn chạy ít nhất 1 lần, while có thể 0 lần.',
                explanationEn: 'do-while always runs at least once, while may run 0 times.'
            },
            {
                id: 'loop-4',
                type: 'true-false',
                question: 'Infinite loop luôn là xấu trong lập trình đúng không?',
                questionEn: 'Infinite loops are always bad in programming, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! Infinite loop đôi khi cần thiết (event handlers, game loops).',
                explanationEn: 'False! Infinite loops are sometimes necessary (event handlers, game loops).'
            },
            {
                id: 'loop-5',
                type: 'multiple-choice',
                question: 'Từ khóa nào dùng để thoát khỏi vòng lặp ngay lập tức?',
                questionEn: 'Which keyword is used to exit a loop immediately?',
                options: ['break', 'continue', 'exit', 'return'],
                optionsEn: ['break', 'continue', 'exit', 'return'],
                correctAnswer: 0,
                explanation: 'break thoát khỏi vòng lặp ngay lập tức.',
                explanationEn: 'break exits the loop immediately.'
            },
            {
                id: 'loop-6',
                type: 'true-false',
                question: 'continue chỉ bỏ qua lần lặp hiện tại đúng không?',
                questionEn: 'continue skips only the current iteration, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Đúng! continue bỏ qua phần còn lại của lần lặp hiện tại.',
                explanationEn: 'Correct! continue skips the rest of current iteration.'
            }
        ]
    },
    {
        slug: 'conditionals',
        questions: [
            {
                id: 'cond-1',
                type: 'multiple-choice',
                question: 'Cấu trúc if-else dùng để làm gì?',
                questionEn: 'What is if-else structure used for?',
                options: ['Lặp lại code', 'Rẽ nhánh theo điều kiện', 'Lưu trữ dữ liệu', 'Tính toán số học'],
                optionsEn: ['Repeat code', 'Branch based on condition', 'Store data', 'Mathematical calculations'],
                correctAnswer: 1,
                explanation: 'If-else dùng để rẽ nhánh, thực thi code khác nhau theo điều kiện.',
                explanationEn: 'If-else is used for branching, executing different code based on conditions.'
            },
            {
                id: 'cond-2',
                type: 'multiple-choice',
                question: 'Toán tử nào trả về giá trị boolean?',
                questionEn: 'Which operator returns a boolean value?',
                options: ['=', '==', '===', 'Tất cả đáp án B và C'],
                optionsEn: ['=', '==', '===', 'Both B and C'],
                correctAnswer: 3,
                explanation: '== và === đều trả về boolean, === so sánh cả kiểu dữ liệu.',
                explanationEn: '== and === both return boolean, === compares both value and type.'
            },
            {
                id: 'cond-3',
                type: 'true-false',
                question: 'switch-case có thể thay thế hoàn toàn if-else đúng không?',
                questionEn: 'switch-case can completely replace if-else, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! switch chỉ dùng cho so sánh bằng với constant values.',
                explanationEn: 'False! switch only works for equality with constant values.'
            },
            {
                id: 'cond-4',
                type: 'multiple-choice',
                question: 'Toán tử ternary là gì?',
                questionEn: 'What is the ternary operator?',
                options: ['?', '&&', '||', '!'],
                optionsEn: ['?', '&&', '||', '!'],
                correctAnswer: 0,
                explanation: 'Toán tử ternary là ? : để viết if-else ngắn gọn.',
                explanationEn: 'Ternary operator is ? : for concise if-else.'
            },
            {
                id: 'cond-5',
                type: 'true-false',
                question: 'Toán tử && sẽ kiểm tra cả hai vế khi vế đầu false đúng không?',
                questionEn: 'The && operator checks both sides when the first side is false, right?',
                options: ['Đúng', 'Sai'],
                optionsEn: ['True', 'False'],
                correctAnswer: 1,
                explanation: 'Sai! && có short-circuit: nếu vế đầu false thì không kiểm tra vế sau.',
                explanationEn: 'False! && has short-circuit: if first is false, second is not evaluated.'
            },
            {
                id: 'cond-6',
                type: 'multiple-choice',
                question: 'Khi nào nên dùng switch-case thay vì if-else?',
                questionEn: 'When should you use switch-case instead of if-else?',
                options: ['Khi có nhiều điều kiện', 'Khi so sánh với nhiều giá trị cố định', 'Khi cần range checks', 'Tất cả đều đúng'],
                optionsEn: ['When there are many conditions', 'When comparing with many fixed values', 'When needing range checks', 'All are correct'],
                correctAnswer: 1,
                explanation: 'switch-case tốt khi so sánh với nhiều giá trị cố định.',
                explanationEn: 'switch-case is good when comparing with many fixed values.'
            }
        ]
    }
];

export function getQuizBySlug(slug: string): Quiz | undefined {
    return quizzes.find(q => q.slug === slug);
}
