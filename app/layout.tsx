import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import CartSidebar from "./components/CartSidebar";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "ÆTHER | Redefining Luxury Commerce",
  description: "Experience the future of luxury shopping. Curated fashion, lifestyle, and premium products with cutting-edge design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
        <CartProvider>
          <Navigation />
          <CartSidebar />
          <main id="main-content" role="main">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
