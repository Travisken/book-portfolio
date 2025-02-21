import DashboardNavbar from "@/components/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden relative bg-gray-100">
      {/* Navbar */}
      <DashboardNavbar />

      <div className="flex">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Main Content */}
        <main className="md:w-[88%] float-right ml-auto w-full md:pl-[7.5rem] md:pt-24 p-4 md:p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
