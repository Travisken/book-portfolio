import DashboardNavbar from "@/components/DashboardNav";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden relative bg-gray-100">
      {/* Navbar */}
      <DashboardNavbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="w-[90%] md:pl-[6rem] md:pt-24 p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
