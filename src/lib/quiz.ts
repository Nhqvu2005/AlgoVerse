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
                correctAnswer: 0,
                explanation: 'Đúng! Selection Sort luôn thực hiện đúng n-1 lần hoán đổi.',
                explanationEn: 'Correct! Selection Sort always performs exactly n-1 swaps.'
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
            }
        ]
    }
];

export function getQuizBySlug(slug: string): Quiz | undefined {
    return quizzes.find(q => q.slug === slug);
}
