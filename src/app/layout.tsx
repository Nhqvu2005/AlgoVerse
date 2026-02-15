import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "AlgoVerse — Algorithm Visualization",
  description: "Interactive visualization and explanation of popular algorithms. Helping students learn Data Structures & Algorithms.",
  keywords: ["thuật toán", "algorithm", "visualization", "data structure", "sorting", "searching", "graph"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-dark">
        <Providers>
          <div className="grid-pattern min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
