import Navbar from "./Navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div>{children}</div>
    </div>
  );
}

export default AppLayout;
