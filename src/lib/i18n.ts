export const translations = {
    vi: {
        // Navbar
        nav: {
            home: 'Trang chủ',
            algorithms: 'Thuật toán',
        },

        // Hero
        hero: {
            subtitle1: 'Mô phỏng trực quan & tương tác các thuật toán phổ biến.',
            subtitle2: 'Học',
            subtitle2Highlight: 'Cấu trúc Dữ liệu & Giải thuật',
            subtitle2End: 'dễ dàng hơn bao giờ hết!',
            cta: 'Khám phá thuật toán',
            statAlgorithms: 'thuật toán',
            statCategories: 'danh mục',
            statInteractive: 'tương tác',
        },

        // Catalog
        catalog: {
            title: 'Danh sách Thuật toán',
            subtitle: 'Chọn một thuật toán để xem mô phỏng trực quan',
            searchPlaceholder: 'Tìm thuật toán...',
            allCategories: 'Tất cả',
            noResults: 'Không tìm thấy thuật toán nào.',
        },

        // Categories
        categories: {
            sorting: 'Sắp xếp',
            searching: 'Tìm kiếm',
            graph: 'Đồ thị',
            'data-structure': 'Cấu trúc DL',
        },

        // Algorithm detail page
        detail: {
            backToAll: 'Tất cả thuật toán',
            notFound: 'Không tìm thấy thuật toán',
            backHome: '← Quay về trang chủ',
            customInputLabel: '✏️ Nhập dữ liệu tùy chỉnh (cách nhau bởi dấu phẩy):',
            targetLabel: '🎯 Giá trị cần tìm:',
            graphNodesLabel: '🔵 Số đỉnh:',
            graphEdgesLabel: '🔗 Danh sách cạnh (VD: 0-1, 1-2, 2-3):',
            apply: 'Áp dụng',
            complexity: '📊 Độ phức tạp',
            timeBest: 'Thời gian (tốt nhất)',
            timeAvg: 'Thời gian (trung bình)',
            timeWorst: 'Thời gian (xấu nhất)',
            space: 'Không gian',
            description: '📝 Mô tả',
            copy: 'Sao chép',
            copied: 'Đã chép!',
            guideTitle: '📖 Hướng dẫn sử dụng',
            guideInput: 'Đầu vào',
            guideConditions: 'Điều kiện',
            guideOutput: 'Đầu ra',
            guideExplanation: 'Giải thích',
        },

        // Footer
        footer: {
            text: 'Trực quan hóa Thuật toán cho Sinh viên',
        },

        // Language toggle
        langToggle: 'EN',
    },

    en: {
        // Navbar
        nav: {
            home: 'Home',
            algorithms: 'Algorithms',
        },

        // Hero
        hero: {
            subtitle1: 'Interactive visualization & simulation of popular algorithms.',
            subtitle2: 'Learn',
            subtitle2Highlight: 'Data Structures & Algorithms',
            subtitle2End: 'easier than ever!',
            cta: 'Explore Algorithms',
            statAlgorithms: 'algorithms',
            statCategories: 'categories',
            statInteractive: 'interactive',
        },

        // Catalog
        catalog: {
            title: 'Algorithm Catalog',
            subtitle: 'Choose an algorithm to see the interactive visualization',
            searchPlaceholder: 'Search algorithms...',
            allCategories: 'All',
            noResults: 'No algorithms found.',
        },

        // Categories
        categories: {
            sorting: 'Sorting',
            searching: 'Searching',
            graph: 'Graph',
            'data-structure': 'Data Structures',
        },

        // Algorithm detail page
        detail: {
            backToAll: 'All Algorithms',
            notFound: 'Algorithm not found',
            backHome: '← Back to Home',
            customInputLabel: '✏️ Custom input data (comma-separated):',
            targetLabel: '🎯 Search target value:',
            graphNodesLabel: '🔵 Number of nodes:',
            graphEdgesLabel: '🔗 Edge list (e.g., 0-1, 1-2, 2-3):',
            apply: 'Apply',
            complexity: '📊 Complexity',
            timeBest: 'Time (best)',
            timeAvg: 'Time (average)',
            timeWorst: 'Time (worst)',
            space: 'Space',
            description: '📝 Description',
            copy: 'Copy',
            copied: 'Copied!',
            guideTitle: '📖 Usage Guide',
            guideInput: 'Input',
            guideConditions: 'Conditions',
            guideOutput: 'Output',
            guideExplanation: 'Explanation',
        },

        // Footer
        footer: {
            text: 'Algorithm Visualization for Students',
        },

        // Language toggle
        langToggle: 'VI',
    },
};

export type Locale = 'vi' | 'en';

export interface TranslationStrings {
    nav: { home: string; algorithms: string };
    hero: {
        subtitle1: string;
        subtitle2: string;
        subtitle2Highlight: string;
        subtitle2End: string;
        cta: string;
        statAlgorithms: string;
        statCategories: string;
        statInteractive: string;
    };
    catalog: {
        title: string;
        subtitle: string;
        searchPlaceholder: string;
        allCategories: string;
        noResults: string;
    };
    categories: Record<string, string>;
    detail: {
        backToAll: string;
        notFound: string;
        backHome: string;
        customInputLabel: string;
        targetLabel: string;
        graphNodesLabel: string;
        graphEdgesLabel: string;
        apply: string;
        complexity: string;
        timeBest: string;
        timeAvg: string;
        timeWorst: string;
        space: string;
        description: string;
        copy: string;
        copied: string;
        guideTitle: string;
        guideInput: string;
        guideConditions: string;
        guideOutput: string;
        guideExplanation: string;
    };
    footer: { text: string };
    langToggle: string;
}
