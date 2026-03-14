import { AlgorithmInfo, AlgorithmStep, TreeNode } from '../../types';

function cloneTree(node: TreeNode | null | undefined): TreeNode | null {
    if (!node) return null;
    return { ...node, left: cloneTree(node.left), right: cloneTree(node.right) };
}

function insertBST(root: TreeNode | null, value: number): TreeNode {
    if (!root) return { value, highlighted: true, isNew: true };
    if (value < root.value) {
        return { ...root, left: insertBST(root.left ?? null, value) };
    } else {
        return { ...root, right: insertBST(root.right ?? null, value) };
    }
}

function clearHighlights(node: TreeNode | null): TreeNode | null {
    if (!node) return null;
    return { ...node, highlighted: false, isNew: false, left: clearHighlights(node.left ?? null), right: clearHighlights(node.right ?? null) };
}

export const binaryTree: AlgorithmInfo = {
    slug: 'binary-tree',
    name: 'Binary Search Tree',
    nameVi: 'Cây Nhị phân Tìm kiếm',
    category: 'data-structure',
    categoryVi: 'Cấu trúc dữ liệu',
    difficulty: 'intermediate',
    description: 'Cây nhị phân đặc biệt: mỗi node trái nhỏ hơn node cha, node phải lớn hơn. Cho phép tìm kiếm, chèn, xóa hiệu quả O(log n) trung bình.',
    descriptionEn: 'A special binary tree: each left child is smaller, each right child is larger than the parent. Enables efficient O(log n) search, insert, and delete on average.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    icon: '🌳',
    inputType: 'none',
    guide: {
        input: 'Các thao tác: insert (chèn giá trị) và search (tìm kiếm giá trị).',
        inputEn: 'Operations: insert (add a value) and search (find a value).',
        conditions: 'Giá trị chèn phải là số nguyên. Cây duy trì tính chất BST: trái < cha < phải.',
        conditionsEn: 'Insert values must be integers. Tree maintains BST property: left < parent < right.',
        output: 'Cây nhị phân tìm kiếm sau mỗi thao tác, với node mới được tô sáng.',
        outputEn: 'The binary search tree after each operation, with newly inserted nodes highlighted.',
        explanation: 'Insert: so sánh với node hiện tại, đi trái nếu nhỏ hơn, phải nếu lớn hơn, cho đến khi tìm vị trí trống. Search cũng tương tự. Trường hợp xấu nhất (cây suy biến thành list) là O(n). Cây cân bằng (AVL, Red-Black) đảm bảo O(log n).',
        explanationEn: 'Insert: compare with current node, go left if smaller, right if larger, until an empty spot is found. Search works similarly. Worst case (tree degenerates to a list) is O(n). Balanced trees (AVL, Red-Black) guarantee O(log n).',
    },
    code: `class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (!root) return new BSTNode(value);
  if (value < root.value)
    root.left = insert(root.left, value);
  else
    root.right = insert(root.right, value);
  return root;
}

function search(root, value) {
  if (!root || root.value === value) return root;
  if (value < root.value)
    return search(root.left, value);
  return search(root.right, value);
}`,
    codeLanguages: {
        js: `class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = this.right = null;
  }
}

function insert(root, value) {
  if (!root) return new BSTNode(value);
  if (value < root.value)
    root.left = insert(root.left, value);
  else
    root.right = insert(root.right, value);
  return root;
}`,
        python: `class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = self.right = None

def insert(root, value):
    if not root:
        return BSTNode(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root

def search(root, value):
    if not root or root.value == value:
        return root
    if value < root.value:
        return search(root.left, value)
    return search(root.right, value)`,
        c: `typedef struct BSTNode {
    int value;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode* newNode(int val) {
    BSTNode* n = (BSTNode*)malloc(sizeof(BSTNode));
    n->value = val;
    n->left = n->right = NULL;
    return n;
}

BSTNode* insert(BSTNode* root, int val) {
    if (!root) return newNode(val);
    if (val < root->value)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}`,
        cpp: `struct BSTNode {
    int value;
    BSTNode *left = nullptr, *right = nullptr;
    BSTNode(int v) : value(v) {}
};

BSTNode* insert(BSTNode* root, int val) {
    if (!root) return new BSTNode(val);
    if (val < root->value)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}

BSTNode* search(BSTNode* root, int val) {
    if (!root || root->value == val) return root;
    if (val < root->value)
        return search(root->left, val);
    return search(root->right, val);
}`,
    },
    generateSteps: (): AlgorithmStep[] => {
        const steps: AlgorithmStep[] = [];
        let root: TreeNode | null = null;

        steps.push({
            tree: null, operation: 'init',
            description: 'Khởi tạo cây BST rỗng.',
            descriptionEn: 'Initialize an empty BST.',
            codeLine: 1,
            codeLines: { js: 75, python: 88, c: 115, cpp: 129 },
        });

        const values = [50, 30, 70, 20, 40, 60, 80];
        for (const val of values) {
            root = clearHighlights(root);
            root = insertBST(root, val);
            steps.push({
                tree: cloneTree(root), activeNode: val, operation: 'insert',
                description: `Chèn ${val} vào BST. So sánh và đi theo nhánh phù hợp.`,
                descriptionEn: `Insert ${val} into BST. Compare and follow the appropriate branch.`,
                codeLine: 9,
                codeLines: { js: 75, python: 88, c: 115, cpp: 129 },
            });
        }

        // Search for 40
        root = clearHighlights(root);
        const searchHighlight = (node: TreeNode | null, target: number): TreeNode | null => {
            if (!node) return null;
            if (node.value === target) return { ...node, highlighted: true };
            if (target < node.value) return { ...node, highlighted: true, left: searchHighlight(node.left ?? null, target) };
            return { ...node, highlighted: true, right: searchHighlight(node.right ?? null, target) };
        };

        steps.push({
            tree: cloneTree(searchHighlight(root, 40)), activeNode: 40, operation: 'search',
            description: 'Tìm kiếm giá trị 40: 50→30→40. Tìm thấy!',
            descriptionEn: 'Search for value 40: 50→30→40. Found!',
            codeLine: 17,
            codeLines: { js: 75, python: 97, c: 115, cpp: 138 },
        });

        steps.push({
            tree: cloneTree(root),
            description: `✅ Hoàn tất demo BST! Cây chứa: [${values.join(', ')}]`,
            descriptionEn: `✅ BST demo complete! Tree contains: [${values.join(', ')}]`,
            codeLine: 22,
            codeLines: { js: 82, python: 102, c: 122, cpp: 143 },
        });
        return steps;
    },
};
