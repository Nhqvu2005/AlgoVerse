<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

<h1 align="center">🧮 AlgoVerse</h1>
<p align="center"><b>Interactive Algorithm & Data Structure Visualization</b></p>
<p align="center">
  Learn algorithms visually — step by step, with animated visualizations, code highlighting, and bilingual explanations (English & Vietnamese).
</p>

---

## ✨ Features

- **13 Algorithms** across 4 categories: Sorting, Searching, Graph, Data Structures
- **Interactive Visualization** — bar charts, graph canvas, tree/list/stack/queue rendering
- **Step-by-Step Playback** — Play, Pause, Step Forward/Backward, Reset, Speed control
- **Live Code Highlighting** — pseudocode with the active line highlighted per step
- **Bilingual UI** — toggle between English 🇬🇧 and Vietnamese 🇻🇳 with one click
- **Custom Input** — enter your own data for sorting & searching algorithms
- **Complexity Info** — time & space complexity displayed per algorithm
- **Modern Gaming UI** — glassmorphism, neon accents, dark theme, responsive design

## 📚 Algorithm Catalog

| Category | Algorithms |
|----------|-----------|
| ⚡ **Sorting** | Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort |
| 🔍 **Searching** | Linear Search, Binary Search |
| 🕸️ **Graph** | Breadth-First Search (BFS), Depth-First Search (DFS) |
| 📦 **Data Structures** | Stack, Queue, Linked List, Binary Search Tree |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Nhqvu2005/AlgoVerse.git
cd AlgoVerse

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **HTML Canvas** | Graph & data structure visualization |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage with hero + algorithm grid
│   ├── layout.tsx                  # Root layout with providers
│   ├── providers.tsx               # Client-side context providers
│   └── algorithms/[slug]/page.tsx  # Dynamic algorithm detail page
├── components/
│   ├── Navbar.tsx                  # Navigation with language toggle
│   ├── ControlPanel.tsx            # Playback controls (play/pause/step)
│   ├── CodeDisplay.tsx             # Code viewer with line highlighting
│   └── visualizers/
│       ├── ArrayVisualizer.tsx     # Bar chart for sorting/searching
│       ├── GraphVisualizer.tsx     # Canvas for graph algorithms
│       └── DataStructureVisualizer.tsx  # Stack/Queue/List/Tree
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   ├── i18n.ts                     # Translation strings (EN/VI)
│   ├── LanguageContext.tsx          # Language context provider
│   ├── algorithmRegistry.ts        # Algorithm registry
│   └── algorithms/                 # Algorithm implementations
│       ├── sorting/                # Bubble, Selection, Insertion, Merge, Quick
│       ├── searching/              # Linear, Binary
│       ├── graph/                  # BFS, DFS
│       └── dataStructures/         # Stack, Queue, Linked List, Binary Tree
```

## 🌐 Internationalization

AlgoVerse supports **English** and **Vietnamese**. Click the 🌐 button in the navbar to switch languages. All UI text, algorithm descriptions, and step-by-step explanations are translated.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Nhqvu2005">Nhqvu2005</a>
</p>
