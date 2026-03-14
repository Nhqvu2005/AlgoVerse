import { AlgorithmInfo, AlgorithmStep, TrieNode } from '@/lib/types';

class Trie {
    root: TrieNode;
    steps: AlgorithmStep[];

    constructor() {
        this.root = { children: {}, isEndOfWord: false, char: '' };
        this.steps = [];
        this.addStep('Khởi tạo Trie rỗng.', 'Initialize empty Trie.');
    }

    insert(word: string) {
        let node = this.root;
        this.addStep(
            `Chèn từ "${word}" vào Trie.`,
            `Insert word "${word}" into Trie.`,
            [0] // Highlight root? Need a way to map nodes to IDs or just rely on structure
        );

        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = { children: {}, isEndOfWord: false, char, isNew: true };
                this.addStep(
                    `Ký tự '${char}' chưa tồn tại. Tạo nút mới.`,
                    `Character '${char}' not found. Create new node.`,
                );
                node.children[char].isNew = false; // Reset after step
            } else {
                this.addStep(
                    `Ký tự '${char}' đã tồn tại. Đi tiếp.`,
                    `Character '${char}' exists. Traverse.`,
                );
            }
            node = node.children[char];
            node.highlighted = true; // Highlight current path
        }

        if (!node.isEndOfWord) {
            node.isEndOfWord = true;
            this.addStep(
                `Đánh dấu kết thúc từ "${word}".`,
                `Mark end of word "${word}".`,
            );
        }

        // Use highlights to prevent unused var lint if we pass it, or just omit if logic handles internal state highlighting
    }

    addStep(desc: string, descEn: string, highlights: number[] = []) {
        // clone the trie state
        const state = JSON.parse(JSON.stringify(this.root));

        // Pass highlights to step even if unused by visualizer directly (visualizer uses node properties)
        // to satisfy the interface or lint consistency
        this.steps.push({
            trie: state,
            description: desc,
            descriptionEn: descEn,
            highlights: highlights,
            codeLines: { js: 5, python: 6, c: 7, cpp: 8 }
        });
    }
}

const code = `// Trie (Prefix Tree)
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() { this.root = new TrieNode(); }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
}`;

const codeLanguages = {
    js: code,
    python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True`,
    c: `// Trie in C
struct TrieNode {
    struct TrieNode *children[26];
    bool isEndOfWord;
};
// Insert function...`,
    cpp: `// Trie in C++
struct TrieNode {
    map<char, TrieNode*> children;
    bool isEndOfWord;
};
// Insert function...`
};

export const trie: AlgorithmInfo = {
    slug: 'trie',
    name: 'Trie (Prefix Tree)',
    nameVi: 'Cây Tiền tố (Trie)',
    description: 'Trie là cấu trúc dữ liệu cây dùng để lưu trữ các chuỗi, giúp tìm kiếm nhanh chóng theo tiền tố.',
    descriptionEn: 'Trie is a tree data structure used for storing strings, enabling fast prefix-based search.',
    category: 'data-structure',
    categoryVi: 'Cấu trúc DL',
    difficulty: 'advanced',
    timeComplexity: { best: 'O(L)', average: 'O(L)', worst: 'O(L)' },
    spaceComplexity: 'O(N * L)',
    code,
    codeLanguages,
    icon: '🌳',
    inputType: 'none', // Demo
    guide: {
        input: 'Danh sách từ: apple, app, ball.',
        inputEn: 'List of words: apple, app, ball.',
        conditions: 'Ký tự a-z.',
        conditionsEn: 'Characters a-z.',
        output: 'Cây Trie sau khi chèn.',
        outputEn: 'Trie structure after insertion.',
        explanation: 'Trie lưu mỗi ký tự trên một nút riêng biệt. Các từ có chung tiền tố (prefix) sẽ dùng chung đường dẫn trên cây. Ví dụ: "cat" và "car" dùng chung nhánh c→a. Chèn: đi theo từng ký tự, tạo nút mới nếu chưa có, đánh dấu kết thúc từ. Tìm kiếm theo prefix cực nhanh O(L) với L là độ dài từ. Ứng dụng: autocomplete, kiểm tra chính tả, từ điển.',
        explanationEn: 'Trie stores each character on a separate node. Words sharing common prefixes share paths. E.g., "cat" and "car" share c→a branch. Insert: follow each char, create new node if missing, mark word end. Prefix search is O(L) where L is word length. Used in: autocomplete, spell check, dictionaries.'
    },

    generateSteps: () => { // Removed unused input parameter
        const t = new Trie();

        t.insert("cat");
        t.insert("car");
        t.insert("dog");

        t.addStep('✅ Hoàn tất demo Trie.', '✅ Trie demo complete.');
        return t.steps;
    }
};
