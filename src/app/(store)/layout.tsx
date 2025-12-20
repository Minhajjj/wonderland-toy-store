// src/app/(store)/layout.tsx
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBanner from "../../components/layout/TopBanner";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBanner />
      <Navbar />
      {/* We use a <main> tag here to ensure content is 
          properly spaced and accessible */}
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}