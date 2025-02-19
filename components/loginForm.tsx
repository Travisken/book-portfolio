import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    let newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Logging in with:", { email, password });
      router.push("/dashboard"); // Navigate to the dashboard on successful login
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center md:px-6 p-3">
      <p className="text-4xl font-semibold">Welcome back</p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white md:p-8 p-0 rounded-2xl w-full max-w-md"
      >
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ca0ce]"
              required
            />
          </div>

          <div className="flex flex-col space-y-2 relative">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ca0ce] pr-12"
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-10 flex items-center text-gray-500 hover:text-[#3ca0ce]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* <button  className="w-full bg-[#3ca0ce] text-white py-3 rounded-xl font-medium hover:bg-[#135690] transition-all">
            Login
          </button> */}
          <button type="submit"
            className="p-3 rounded-xl font-semibold bg-zinc-200 text-black text-xl capitalize hover:bg-[#3ca0ce] transition-all duration-500 hover:text-white w-full flex items-center justify-center"
          >
            login
          </button>
          <Link href="/forgot-password" className="hover:text-[#3ca0ce] text-zinc-500 float-right transition-all font-medium hover:underline">
            Forgot Password?
          </Link>
        </form>
      </motion.div>
    </div>
  );
}


export default LoginForm