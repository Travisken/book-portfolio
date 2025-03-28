import DashboardNavbar from "@/components/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex  relative bg-gray-100">
      {/* Navbar */}

      <div className="flex w-screen relative items-end justify-end">
      <DashboardNavbar />
       
        <main className=" lg:w-[82%] md:w-[70%] w-[100%] items-end justify-end  md:pt-24 p-2 md:p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
