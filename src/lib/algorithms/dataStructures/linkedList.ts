import { AlgorithmInfo, AlgorithmStep, LinkedListNode } from '../../types';

export const linkedList: AlgorithmInfo = {
  slug: 'linked-list',
  name: 'Linked List',
  nameVi: 'Danh sách Liên kết',
  category: 'data-structure',
  categoryVi: 'Cấu trúc Dữ liệu',
  description: 'Cấu trúc dữ liệu tuyến tính, mỗi phần tử (node) chứa dữ liệu và con trỏ đến node tiếp theo. Cho phép chèn/xóa hiệu quả ở bất kỳ vị trí nào.',
  descriptionEn: 'A linear data structure where each element (node) contains data and a pointer to the next node. Allows efficient insertion/deletion at any position.',
  timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',
  icon: '🔗',
  code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insertAtHead(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
  
  insertAtTail(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  
  deleteNode(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }
}`,
  generateSteps: (): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    let list: LinkedListNode[] = [];

    steps.push({
      linkedList: [],
      operation: 'init',
      description: 'Khởi tạo Linked List rỗng. Head = null.',
      descriptionEn: 'Initialize empty Linked List. Head = null.',
      codeLine: 8,
    });

    list = [{ value: 10, isHead: true, isNew: true }];
    steps.push({
      linkedList: list.map(n => ({ ...n })),
      operation: 'insertAtTail(10)',
      activeNode: 0,
      description: 'Insert 10 vào tail. Vì list rỗng nên 10 trở thành head.',
      descriptionEn: 'Insert 10 at tail. Since list is empty, 10 becomes the head.',
      codeLine: 18,
    });

    list = [{ value: 10, isHead: true, next: 1 }, { value: 20, isNew: true }];
    steps.push({
      linkedList: list.map(n => ({ ...n })),
      operation: 'insertAtTail(20)',
      activeNode: 1,
      description: 'Insert 20 vào tail. Duyệt đến cuối rồi nối 20.',
      descriptionEn: 'Insert 20 at tail. Traverse to end, then link 20.',
      codeLine: 27,
    });

    list = [{ value: 10, isHead: true, next: 1 }, { value: 20, next: 2 }, { value: 30, isNew: true }];
    steps.push({
      linkedList: list.map(n => ({ ...n })),
      operation: 'insertAtTail(30)',
      activeNode: 2,
      description: 'Insert 30 vào tail. 10 → 20 → 30.',
      descriptionEn: 'Insert 30 at tail. 10 → 20 → 30.',
      codeLine: 27,
    });

    list = [{ value: 5, isHead: true, isNew: true, next: 1 }, { value: 10, next: 2 }, { value: 20, next: 3 }, { value: 30 }];
    steps.push({
      linkedList: list.map(n => ({ ...n })),
      operation: 'insertAtHead(5)',
      activeNode: 0,
      description: 'Insert 5 vào head. newNode.next = head cũ. 5 → 10 → 20 → 30.',
      descriptionEn: 'Insert 5 at head. newNode.next = old head. 5 → 10 → 20 → 30.',
      codeLine: 13,
    });

    list = [{ value: 5, isHead: true, next: 1 }, { value: 10, next: 2 }, { value: 20, isRemoving: true, next: 3 }, { value: 30 }];
    steps.push({
      linkedList: list.map(n => ({ ...n })),
      operation: 'delete(20)',
      activeNode: 2,
      description: 'Xóa node 20. Tìm node có data=20, nối node trước nó đến node sau nó.',
      descriptionEn: 'Delete node 20. Find node with data=20, link previous node to next node.',
      codeLine: 38,
    });

    list = [{ value: 5, isHead: true, next: 1 }, { value: 10, next: 2 }, { value: 30 }];
    steps.push({
      linkedList: list.map(n => ({ ...n })),
      operation: 'delete(20) ✓',
      description: 'Đã xóa 20. Danh sách: 5 → 10 → 30.',
      descriptionEn: 'Deleted 20. List: 5 → 10 → 30.',
      codeLine: 40,
    });

    steps.push({
      linkedList: list.map(n => ({ ...n })),
      description: '✅ Demo Linked List hoàn tất! Danh sách: 5 → 10 → 30.',
      descriptionEn: '✅ Linked List demo complete! List: 5 → 10 → 30.',
      codeLine: 43,
    });

    return steps;
  },
};
