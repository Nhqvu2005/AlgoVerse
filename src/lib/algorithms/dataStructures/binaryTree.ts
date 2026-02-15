import { AlgorithmInfo, AlgorithmStep, TreeNode } from '../../types';

function cloneTree(node: TreeNode | null): TreeNode | null {
    if (!node) return null;
    return {
        value: node.value,
        left: cloneTree(node.left || null),
        right: cloneTree(node.right || null),
        highlighted: node.highlighted,
        isNew: node.isNew,
    };
}

function insertBST(root: TreeNode | null, val: number): TreeNode {
    if (!root) return { value: val, left: null, right: null, isNew: true };
    if (val < root.value) {
        root.left = insertBST(root.left || null, val);
    } else {
        root.right = insertBST(root.right || null, val);
    }
    return root;
}

export const binaryTree: AlgorithmInfo = {
    slug: 'binary-tree',
    name: 'Binary Search Tree',
    nameVi: 'Cây Nhị phân Tìm kiếm',
    category: 'data-structure',
    categoryVi: 'Cấu trúc Dữ liệu',
    description: 'Cây nhị phân mà mỗi node có tối đa 2 con. Node trái < Node cha < Node phải. Cho phép tìm kiếm, chèn, xóa hiệu quả với O(log n) trung bình.',
    descriptionEn: 'A binary tree where each node has at most 2 children. Left < Parent < Right. Allows efficient search, insert, and delete with O(log n) average.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    icon: '🌳',
    code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function insert(root, val) {
  if (!root) return new TreeNode(val);
  
  if (val < root.val) {
    root.left = insert(root.left, val);
  } else {
    root.right = insert(root.right, val);
  }
  return root;
}

function inorder(root) {
  if (!root) return;
  inorder(root.left);
  visit(root.val);
  inorder(root.right);
}`,
    generateSteps: (): AlgorithmStep[] => {
        const steps: AlgorithmStep[] = [];
        let root: TreeNode | null = null;
        const values = [50, 30, 70, 20, 40, 60, 80];

        steps.push({
            tree: null,
            operation: 'init',
            description: 'Khởi tạo BST rỗng. Sẽ chèn lần lượt: ' + values.join(', '),
            descriptionEn: 'Initialize empty BST. Will insert: ' + values.join(', '),
            codeLine: 1,
        });

        for (const val of values) {
            root = insertBST(root, val);
            steps.push({
                tree: cloneTree(root),
                operation: `insert(${val})`,
                description: `Chèn ${val} vào BST. Đi theo quy tắc: nhỏ hơn → trái, lớn hơn → phải.`,
                descriptionEn: `Insert ${val} into BST. Follow rule: smaller → left, larger → right.`,
                codeLine: 9,
            });

            const resetNew = (node: TreeNode | null): void => {
                if (!node) return;
                node.isNew = false;
                resetNew(node.left || null);
                resetNew(node.right || null);
            };
            resetNew(root);
        }

        const inorderResult: number[] = [];
        const inorderSteps = (node: TreeNode | null): void => {
            if (!node) return;
            inorderSteps(node.left || null);
            inorderResult.push(node.value);
            node.highlighted = true;
            steps.push({
                tree: cloneTree(root),
                operation: `inorder: visit(${node.value})`,
                description: `Duyệt In-order: thăm ${node.value}. Kết quả: [${inorderResult.join(', ')}]`,
                descriptionEn: `In-order traversal: visit ${node.value}. Result: [${inorderResult.join(', ')}]`,
                codeLine: 21,
            });
            node.highlighted = false;
            inorderSteps(node.right || null);
        };

        steps.push({
            tree: cloneTree(root),
            description: 'Bắt đầu duyệt In-order (Trái → Gốc → Phải) — kết quả sẽ là dãy tăng dần!',
            descriptionEn: 'Start In-order traversal (Left → Root → Right) — result will be sorted ascending!',
            codeLine: 20,
        });

        inorderSteps(root);

        steps.push({
            tree: cloneTree(root),
            description: `✅ In-order traversal: [${inorderResult.join(', ')}] — Dãy tăng dần!`,
            descriptionEn: `✅ In-order traversal: [${inorderResult.join(', ')}] — Sorted ascending!`,
            codeLine: 24,
        });

        return steps;
    },
};
