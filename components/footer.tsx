import Link from "next/link";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20 w-full py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="#about" className="hover:text-gray-400">
            About
          </Link>
          <Link href="#testimonials" className="hover:text-gray-400">
            Testimonials
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* <a href="#" className="hover:text-gray-400"><FaFacebookF size={20} /></a>
          <a href="#" className="hover:text-gray-400"><FaTwitter size={20} /></a>
          <a href="#" className="hover:text-gray-400"><FaInstagram size={20} /></a>
          <a href="#" className="hover:text-gray-400"></a> */}
          <Link href={"https://www.linkedin.com/in/dr-oluwanimbe-f-akinsiku-a52092254/"}>
            <FaLinkedinIn size={20} />
          </Link>

          {/* <Link href={""}>
            <FaWhatsapp size={20} />
          </Link> */}

          <Link href={"mailto:kentravis37@gmail.com"}>
            <FaEnvelope size={20} />
            <p>
              
            </p>
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} Dr. Akinsiku Folarin . All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
