// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="#about" className="hover:text-gray-400">About</a>
          <a href="#testimonial" className="hover:text-gray-400">Testimonials</a>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* <a href="#" className="hover:text-gray-400"><FaFacebookF size={20} /></a>
          <a href="#" className="hover:text-gray-400"><FaTwitter size={20} /></a>
          <a href="#" className="hover:text-gray-400"><FaInstagram size={20} /></a>
          <a href="#" className="hover:text-gray-400"><FaLinkedinIn size={20} /></a> */}
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} Your Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
