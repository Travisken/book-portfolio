import DashboardNavbar from "@/components/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex  relative bg-gray-100">
      {/* Navbar */}

      <div className="flex">
      <DashboardNavbar />
       
        <main className="  w-[50%]  md:pt-24 p-2 md:p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
