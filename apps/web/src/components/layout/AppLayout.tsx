import Footer from "./Footer";
import Navbar from "./Navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;
