import { AlgorithmInfo, AlgorithmStep, LinkedListNode } from '../../types';

export const linkedList: AlgorithmInfo = {
  slug: 'linked-list',
  name: 'Linked List',
  nameVi: 'Danh sách Liên kết',
  category: 'data-structure',
  categoryVi: 'Cấu trúc dữ liệu',
  difficulty: 'intermediate',
  description: 'Cấu trúc dữ liệu tuyến tính với các node liên kết nhau qua con trỏ. Mỗi node chứa dữ liệu và tham chiếu đến node tiếp theo.',
  descriptionEn: 'A linear data structure with nodes linked via pointers. Each node contains data and a reference to the next node.',
  timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(n)',
  icon: '🔗',
  inputType: 'none',
  guide: {
    input: 'Các thao tác: insert (chèn node) và delete (xóa node).',
    inputEn: 'Operations: insert (add a node) and delete (remove a node).',
    conditions: 'Chèn đầu O(1), chèn cuối O(n). Xóa cần tìm node trước node cần xóa.',
    conditionsEn: 'Insert at head O(1), insert at tail O(n). Deletion requires finding the node before the target.',
    output: 'Danh sách liên kết sau mỗi thao tác, thể hiện bằng node → node → ... → null.',
    outputEn: 'The linked list after each operation, shown as node → node → ... → null.',
    explanation: 'Linked List lưu trữ dữ liệu phi liên tục trong bộ nhớ. Mỗi node trỏ đến node tiếp theo. Ưu điểm: chèn/xóa đầu O(1), kích thước linh hoạt. Nhược điểm: truy cập ngẫu nhiên O(n), tốn thêm bộ nhớ cho con trỏ.',
    explanationEn: 'Linked List stores data non-contiguously in memory. Each node points to the next. Advantages: O(1) head insert/delete, flexible size. Disadvantages: O(n) random access, extra memory for pointers.',
  },
  code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() { this.head = null; }
  insertAtHead(value) {
    let node = new Node(value);
    node.next = this.head;
    this.head = node;
  }
  insertAtTail(value) {
    let node = new Node(value);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }
  delete(value) {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next; return;
    }
    let curr = this.head;
    while (curr.next && curr.next.value !== value)
      curr = curr.next;
    if (curr.next) curr.next = curr.next.next;
  }
}`,
  codeLanguages: {
    js: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  constructor() { this.head = null; }
  insertAtHead(val) {
    let n = new Node(val);
    n.next = this.head;
    this.head = n;
  }
  delete(val) {
    if (!this.head) return;
    if (this.head.value === val) {
      this.head = this.head.next; return;
    }
    let c = this.head;
    while (c.next && c.next.value !== val) c = c.next;
    if (c.next) c.next = c.next.next;
  }
}`,
    python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    def insert_at_head(self, val):
        n = Node(val)
        n.next = self.head
        self.head = n
    def delete(self, val):
        if not self.head: return
        if self.head.value == val:
            self.head = self.head.next; return
        c = self.head
        while c.next and c.next.value != val:
            c = c.next
        if c.next:
            c.next = c.next.next`,
    c: `typedef struct Node {
    int value;
    struct Node* next;
} Node;

Node* insertAtHead(Node* head, int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->value = val;
    n->next = head;
    return n;
}

Node* deleteNode(Node* head, int val) {
    if (!head) return NULL;
    if (head->value == val) {
        Node* t = head->next; free(head); return t;
    }
    Node* c = head;
    while (c->next && c->next->value != val)
        c = c->next;
    if (c->next) {
        Node* t = c->next;
        c->next = t->next; free(t);
    }
    return head;
}`,
    cpp: `struct Node {
    int value;
    Node* next;
    Node(int v) : value(v), next(nullptr) {}
};

class LinkedList {
    Node* head = nullptr;
public:
    void insertAtHead(int val) {
        Node* n = new Node(val);
        n->next = head;
        head = n;
    }
    void deleteNode(int val) {
        if (!head) return;
        if (head->value == val) {
            Node* t = head; head = head->next;
            delete t; return;
        }
        Node* c = head;
        while (c->next && c->next->value != val)
            c = c->next;
        if (c->next) {
            Node* t = c->next;
            c->next = t->next;
            delete t;
        }
    }
};`,
  },
  generateSteps: (): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    let list: LinkedListNode[] = [];

    steps.push({
      linkedList: [...list], operation: 'init',
      description: 'Khởi tạo Linked List rỗng.',
      descriptionEn: 'Initialize an empty Linked List.',
      codeLine: 8,
      codeLines: { js: 65, python: 87, c: 102, cpp: 134 },
    });

    // Insert at head: 10, 20, 30
    const inserts = [10, 20, 30];
    for (const val of inserts) {
      const newNode: LinkedListNode = { value: val, isHead: true, isNew: true };
      if (list.length > 0) list[0].isHead = false;
      list = [newNode, ...list.map(n => ({ ...n, isNew: false }))];
      for (let i = 0; i < list.length - 1; i++) list[i].next = i + 1;
      steps.push({
        linkedList: list.map(n => ({ ...n })), activeNode: val, operation: 'insert',
        description: `Chèn ${val} vào đầu. List: ${list.map(n => n.value).join(' → ')} → null`,
        descriptionEn: `Insert ${val} at head. List: ${list.map(n => n.value).join(' → ')} → null`,
        codeLine: 10,
        codeLines: { js: 66, python: 89, c: 107, cpp: 137 },
      });
    }

    // Insert at tail: 5
    const tailVal = 5;
    const tailNode: LinkedListNode = { value: tailVal, isNew: true };
    list = [...list.map(n => ({ ...n, isNew: false })), tailNode];
    for (let i = 0; i < list.length - 1; i++) list[i].next = i + 1;
    steps.push({
      linkedList: list.map(n => ({ ...n })), activeNode: tailVal, operation: 'insert',
      description: `Chèn ${tailVal} vào cuối. List: ${list.map(n => n.value).join(' → ')} → null`,
      descriptionEn: `Insert ${tailVal} at tail. List: ${list.map(n => n.value).join(' → ')} → null`,
      codeLine: 16,
      codeLines: { js: 66, python: 89, c: 107, cpp: 137 },
    });

    // Delete 20
    const delVal = 20;
    const delIdx = list.findIndex(n => n.value === delVal);
    if (delIdx >= 0) {
      list[delIdx] = { ...list[delIdx], isRemoving: true };
      steps.push({
        linkedList: list.map(n => ({ ...n })), activeNode: delVal, operation: 'delete',
        description: `Tìm và xóa node ${delVal}.`,
        descriptionEn: `Find and delete node ${delVal}.`,
        codeLine: 22,
        codeLines: { js: 71, python: 93, c: 114, cpp: 142 },
      });
      list = list.filter(n => n.value !== delVal);
      for (let i = 0; i < list.length; i++) { list[i].next = i < list.length - 1 ? i + 1 : undefined; list[i].isNew = false; }
      steps.push({
        linkedList: list.map(n => ({ ...n })), operation: 'delete',
        description: `Đã xóa ${delVal}. List: ${list.map(n => n.value).join(' → ')} → null`,
        descriptionEn: `Deleted ${delVal}. List: ${list.map(n => n.value).join(' → ')} → null`,
        codeLine: 29,
        codeLines: { js: 79, python: 101, c: 126, cpp: 156 },
      });
    }

    steps.push({
      linkedList: list.map(n => ({ ...n })),
      description: `✅ Hoàn tất demo! List cuối: ${list.map(n => n.value).join(' → ')} → null`,
      descriptionEn: `✅ Demo complete! Final list: ${list.map(n => n.value).join(' → ')} → null`,
      codeLine: 30,
      codeLines: { js: 80, python: 101, c: 127, cpp: 157 },
    });
    return steps;
  },
};
