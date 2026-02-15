// Common types for algorithm steps and visualization

export interface AlgorithmStep {
    array?: number[];
    highlights?: number[];           // indices being compared/processed
    sorted?: number[];               // indices that are in final position
    swapping?: number[];             // indices being swapped
    pivot?: number;                  // pivot index for quicksort
    searchTarget?: number;           // target value for search algorithms
    found?: number;                  // found index for search
    low?: number;                    // low pointer for binary search
    high?: number;                   // high pointer for binary search
    mid?: number;                    // mid pointer for binary search

    // Graph-related
    graph?: GraphData;
    visited?: number[];              // visited nodes
    current?: number;                // current node being processed
    queue?: number[];                // queue/stack contents
    edges?: [number, number][];      // edges being traversed

    // Data structure related
    stack?: number[];
    queueData?: number[];
    linkedList?: LinkedListNode[];
    tree?: TreeNode | null;
    activeNode?: number;             // node being operated on
    operation?: string;              // push, pop, enqueue, dequeue, insert, delete

    description: string;             // Vietnamese explanation of this step
    descriptionEn?: string;          // English explanation of this step
    codeLine?: number;               // highlighted line in code display (fallback/legacy)
    codeLines?: { [key in CodeLanguage]?: number }; // highlighted line per language
    variables?: { [key: string]: string | number | boolean }; // step-specific variable state
    hashTable?: { index: number; content: string }[]; // simplified hash table state
}

export interface GraphData {
    nodes: { id: number; label: string; x: number; y: number }[];
    edges: { from: number; to: number }[];
    directed?: boolean;
}

export interface LinkedListNode {
    value: number;
    next?: number; // index of next node, undefined for null
    isHead?: boolean;
    isNew?: boolean;
    isRemoving?: boolean;
}

export interface TreeNode {
    value: number;
    left?: TreeNode | null;
    right?: TreeNode | null;
    x?: number;
    y?: number;
    highlighted?: boolean;
    isNew?: boolean;
}

export type CodeLanguage = 'js' | 'python' | 'c' | 'cpp';

export interface CodeLanguages {
    js: string;
    python: string;
    c: string;
    cpp: string;
}

export interface AlgorithmGuide {
    input: string;
    inputEn: string;
    conditions: string;
    conditionsEn: string;
    output: string;
    outputEn: string;
    explanation: string;
    explanationEn: string;
}

export type InputType = 'array' | 'array-target' | 'graph' | 'none';

export interface AlgorithmInfo {
    slug: string;
    name: string;
    nameVi: string;
    category: 'sorting' | 'searching' | 'graph' | 'data-structure' | 'concept';
    categoryVi: string;
    description: string;
    descriptionEn?: string;
    timeComplexity: { best: string; average: string; worst: string };
    spaceComplexity: string;
    code: string;
    codeLanguages?: CodeLanguages;
    guide?: AlgorithmGuide;
    inputType?: InputType;
    defaultTarget?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateSteps: (input?: any) => AlgorithmStep[];
    defaultInput?: number[];
    icon: string;
}

export const categoryConfig = {
    sorting: { label: 'Sắp xếp', color: 'purple', icon: '⚡' },
    searching: { label: 'Tìm kiếm', color: 'pink', icon: '🔍' },
    graph: { label: 'Đồ thị', color: 'cyan', icon: '🕸️' },
    'data-structure': { label: 'Cấu trúc DL', color: 'green', icon: '📦' },
    concept: { label: 'Cơ bản', color: 'orange', icon: '💡' },
} as const;
