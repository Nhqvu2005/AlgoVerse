<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

<h1 align="center">🧮 AlgoVerse</h1>
<p align="center"><b>Trực quan hóa Thuật toán & Cấu trúc Dữ liệu</b></p>
<p align="center">
  Học thuật toán trực quan — từng bước một, với hoạt ảnh minh họa, code highlight, và giải thích song ngữ (Tiếng Anh & Tiếng Việt).
</p>

> 📖 [English version](README.md)

---

## ✨ Tính năng

- **13 Thuật toán** thuộc 4 danh mục: Sắp xếp, Tìm kiếm, Đồ thị, Cấu trúc Dữ liệu
- **Mô phỏng Trực quan** — biểu đồ cột, canvas đồ thị, cây/danh sách/ngăn xếp/hàng đợi
- **Phát theo Bước** — Play, Pause, Tiến/Lùi từng bước, Reset, Điều chỉnh tốc độ
- **Code Highlight** — hiển thị mã nguồn, tô sáng dòng đang thực thi
- **Song ngữ** — chuyển đổi Tiếng Anh 🇬🇧 và Tiếng Việt 🇻🇳 chỉ với 1 click
- **Nhập dữ liệu tùy chỉnh** — tự nhập mảng đầu vào cho thuật toán sắp xếp & tìm kiếm
- **Thông tin Độ phức tạp** — hiển thị thời gian & không gian cho mỗi thuật toán
- **Giao diện Gaming hiện đại** — glassmorphism, neon, dark theme, responsive

## 📚 Danh sách Thuật toán

| Danh mục | Thuật toán |
|----------|-----------|
| ⚡ **Sắp xếp** | Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort |
| 🔍 **Tìm kiếm** | Linear Search, Binary Search |
| 🕸️ **Đồ thị** | BFS (Tìm kiếm theo Chiều rộng), DFS (Tìm kiếm theo Chiều sâu) |
| 📦 **Cấu trúc DL** | Stack (Ngăn xếp), Queue (Hàng đợi), Linked List (Danh sách Liên kết), Binary Search Tree (Cây Nhị phân) |

## 🚀 Bắt đầu

### Yêu cầu

- [Node.js](https://nodejs.org/) (phiên bản 16 trở lên)
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone https://github.com/Nhqvu2005/AlgoVerse.git
cd AlgoVerse

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

### Build Production

```bash
npm run build
npm start
```

## 🏗️ Công nghệ sử dụng

| Công nghệ | Mục đích |
|-----------|---------|
| **Next.js 14** | React framework với App Router |
| **TypeScript** | Phát triển an toàn kiểu dữ liệu |
| **Tailwind CSS** | Styling tiện ích |
| **HTML Canvas** | Trực quan hóa đồ thị & cấu trúc dữ liệu |

## 📁 Cấu trúc Dự án

```
src/
├── app/
│   ├── page.tsx                    # Trang chủ với hero + lưới thuật toán
│   ├── layout.tsx                  # Layout gốc với providers
│   ├── providers.tsx               # Client-side context providers
│   └── algorithms/[slug]/page.tsx  # Trang chi tiết thuật toán (động)
├── components/
│   ├── Navbar.tsx                  # Thanh điều hướng + nút chuyển ngữ
│   ├── ControlPanel.tsx            # Điều khiển phát (play/pause/bước)
│   ├── CodeDisplay.tsx             # Hiển thị code + highlight dòng
│   └── visualizers/
│       ├── ArrayVisualizer.tsx     # Biểu đồ cột cho sắp xếp/tìm kiếm
│       ├── GraphVisualizer.tsx     # Canvas cho thuật toán đồ thị
│       └── DataStructureVisualizer.tsx  # Stack/Queue/List/Tree
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   ├── i18n.ts                     # Chuỗi dịch (EN/VI)
│   ├── LanguageContext.tsx          # Language context provider
│   ├── algorithmRegistry.ts        # Registry thuật toán
│   └── algorithms/                 # Triển khai thuật toán
│       ├── sorting/                # Bubble, Selection, Insertion, Merge, Quick
│       ├── searching/              # Linear, Binary
│       ├── graph/                  # BFS, DFS
│       └── dataStructures/         # Stack, Queue, Linked List, Binary Tree
```

## 🌐 Đa ngôn ngữ

AlgoVerse hỗ trợ **Tiếng Anh** và **Tiếng Việt**. Nhấn nút 🌐 trên thanh điều hướng để chuyển đổi ngôn ngữ. Toàn bộ giao diện, mô tả thuật toán, và giải thích từng bước đều được dịch.

## 📄 Giấy phép

Dự án mã nguồn mở theo [Giấy phép MIT](LICENSE).

---

<p align="center">
  Made with ❤️ bởi <a href="https://github.com/Nhqvu2005">Nhqvu2005</a>
</p>
