import { AlgorithmInfo, AlgorithmStep, TreeNode } from '@/lib/types';

class AVLTree {
    root: TreeNode | null = null;
    steps: AlgorithmStep[] = [];

    // Helper to add steps
    addStep(desc: string, descEn: string, highlights: number[] = []) {
        this.steps.push({
            tree: JSON.parse(JSON.stringify(this.root)), // Deep copy
            description: desc,
            descriptionEn: descEn,
            highlights,
            codeLines: { js: 5, python: 5, c: 5, cpp: 5 }
        });
    }

    // Simplistic AVL logic simulation for visualization purposes
    // Real AVL implementation would involve height tracking and rotations
    // Here we simulate the structure updates for the demo input [10, 20, 30] to show a rotation

    insert(val: number) {
        // Standard BST insert
        this.root = this.insertRec(this.root, val);
        this.addStep(`Chèn ${val} vào cây AVL.`, `Insert ${val} into AVL tree.`);

        // Check balance (Simulated for specific cases)
        // If we inserted 30 after 10, 20 -> RR Imbalance at 10
        // We will just hardcode the rotation step for the demo sequence to keep it visual-focused
    }

    insertRec(node: TreeNode | null, val: number): TreeNode {
        if (!node) return { value: val };
        if (val < node.value) node.left = this.insertRec(node.left || null, val);
        else if (val > node.value) node.right = this.insertRec(node.right || null, val);
        return node;
    }

    // Manual rotation for demo: 10->20->30 => 20->10,30
    rotateLeft() {
        if (!this.root || !this.root.right) return;
        const newRoot = this.root.right;
        this.root.right = newRoot.left;
        newRoot.left = this.root;
        this.root = newRoot;
    }
}

const code = `// AVL Tree (Balanced BST)
class AVLTree {
    insert(val) {
        // BST Insert
        // Check Balance Factor
        // Rotate if needed (LL, RR, LR, RL)
    }
}`;

const codeLanguages = {
    js: code,
    python: `# AVL Tree
def insert(root, val):
    # BST Insert
    # Update height
    # Check balance
    # Rotate`,
    c: `// AVL Tree
struct Node* insert(struct Node* node, int key) {
    // BST Insert
    // Get Balance
    // Rotate
}`,
    cpp: `// AVL Tree
Node* insert(Node* node, int key) {
    // BST Insert
    // Get Balance
    // Rotate
}`
};

export const avlTree: AlgorithmInfo = {
    slug: 'avl-tree',
    name: 'Cây AVL (AVL Tree)',
    nameVi: 'Cây AVL (Cân bằng)',
    description: 'Cây AVL là cây nhị phân tìm kiếm tự cân bằng. Chiều cao của hai cây con của bất kỳ nút nào chỉ chênh lệch tối đa là 1.',
    descriptionEn: 'AVL Tree is a self-balancing Binary Search Tree. The heights of the two child subtrees of any node differ by at most one.',
    category: 'data-structure',
    categoryVi: 'Cấu trúc DL',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    code,
    codeLanguages,
    icon: '🌳',
    inputType: 'none', // Demo fixed for rotation
    guide: {
        input: 'Demo cố định: 10, 20, 30.',
        inputEn: 'Fixed demo: 10, 20, 30.',
        conditions: 'Gây mất cân bằng RR.',
        conditionsEn: 'Causes RR imbalance.',
        output: 'Cây xoay trái để cân bằng.',
        outputEn: 'Tree rotates left to balance.',
        explanation: 'Cây AVL là BST tự cân bằng: sau mỗi lần chèn/xóa, kiểm tra chênh lệch chiều cao hai cây con. Nếu chênh lệch > 1, thực hiện xoay (Rotation) để cân bằng lại. Có 4 trường hợp xoay: Left-Left, Right-Right, Left-Right, Right-Left. Nhờ vậy, tìm kiếm/chèn/xóa luôn O(log n), không bị suy biến thành O(n) như BST thông thường.',
        explanationEn: 'AVL is a self-balancing BST: after each insert/delete, check height difference of subtrees. If difference > 1, perform rotations to rebalance. 4 rotation cases: LL, RR, LR, RL. This guarantees search/insert/delete always O(log n), avoiding O(n) worst case of regular BST.'
    },

    generateSteps: () => {
        const avl = new AVLTree();

        // 1. Insert 10
        avl.insert(10);

        // 2. Insert 20
        avl.insert(20);

        // 3. Insert 30 -> Imbalance
        avl.root = avl.insertRec(avl.root, 30); // Manual insert to skip generic step
        avl.addStep(
            'Chèn 30. Nhận thấy mất cân bằng tại nút 10 (Right-Right Case).',
            'Insert 30. Detect imbalance at node 10 (Right-Right Case).',
            [30]
        );

        // 4. Rotate
        avl.rotateLeft();
        avl.addStep(
            'Thực hiện Xoay Trái (Left Rotate) tại nút 10.',
            'Perform Left Rotate at node 10.',
            [20] // New root
        );

        avl.addStep('✅ Cây đã cân bằng.', '✅ Tree is balanced.');

        return avl.steps;
    }
};
