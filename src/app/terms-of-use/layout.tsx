import { Footer } from "@/components/footer/Footer";


export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1 bg-white dark:bg-gray-950 pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
} 