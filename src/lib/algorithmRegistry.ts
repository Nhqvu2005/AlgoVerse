import { AlgorithmInfo } from './types';
import { bubbleSort } from './algorithms/sorting/bubbleSort';
import { selectionSort } from './algorithms/sorting/selectionSort';
import { insertionSort } from './algorithms/sorting/insertionSort';
import { mergeSort } from './algorithms/sorting/mergeSort';
import { quickSort } from './algorithms/sorting/quickSort';
import { linearSearch } from './algorithms/searching/linearSearch';
import { binarySearch } from './algorithms/searching/binarySearch';
import { bfs } from './algorithms/graph/bfs';
import { dfs } from './algorithms/graph/dfs';
import { stack } from './algorithms/dataStructures/stack';
import { queue } from './algorithms/dataStructures/queue';
import { linkedList } from './algorithms/dataStructures/linkedList';
import { binaryTree } from './algorithms/dataStructures/binaryTree';
import { arrays } from './algorithms/basics/arrays';
import { loops } from './algorithms/basics/loops';
import { conditionals } from './algorithms/basics/conditionals';
import { heap } from './algorithms/dataStructures/heap';
import { hashTable } from './algorithms/dataStructures/hashTable';
import { avlTree } from './algorithms/dataStructures/avlTree';

export const algorithms: AlgorithmInfo[] = [
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    linearSearch,
    binarySearch,
    bfs,
    dfs,
    stack,
    queue,
    linkedList,
    linkedList,
    binaryTree,
    arrays,
    loops,
    conditionals,
    heap,
    hashTable,
    avlTree,
];

export function getAlgorithmBySlug(slug: string): AlgorithmInfo | undefined {
    return algorithms.find(a => a.slug === slug);
}

export function getAlgorithmsByCategory(category: string): AlgorithmInfo[] {
    return algorithms.filter(a => a.category === category);
}
