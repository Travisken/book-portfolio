
import Navbar from "@/components/navbar";
import Home from "./home/page";
import Footer from "@/components/footer";

export default function App() {
  return (
    <>
    <section className="flex flex-col">
      <Navbar />
      <Home />
      <Footer />
    </section>
      
    </>
  );
}
