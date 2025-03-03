"use client";

import { Rubik } from 'next/font/google';
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";


// .rubik-<uniquifier> {
//   font-family: "Rubik", serif;
//   font-optical-sizing: auto;
//   font-weight: <weight>;
//   font-style: normal;
// }

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights
  variable: '--font-rubik', // Correct CSS variable
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = ["/login", "/dashboard", "/dashboard/add-book", "/pdf-viewer"].includes(pathname);

  return (
    <html lang="en" className={rubik.variable} suppressHydrationWarning>
       <Head>
        <title>Dr. Akinsiku Folarin</title>
        <meta
          name="description"
          content="CEO of Pentspace, integrates e-commerce, healthcare innovation, and global collaboration to enhance business connections, bridge local and global healthcare standards, and drive sustainable, technology-driven solutions for Nigeria&quot;s healthcare sector."
        />
        {/* Open Graph for Facebook, WhatsApp, etc. */}
        <meta property="og:title" content="Dr. Akinsiku Folarin" />
        <meta
          property="og:description"
          content="Discover the need to invest in healthcare by Dr. Akinsiku Folarin."
        />
        <meta property="og:image" content="data:image/jpeg;base64,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" />
        <meta property="og:url" content="https://drnimbs.com" />
        <meta property="og:type" content="website" />

      
      </Head>
      <body className="">
        {!isLoginPage ? (
          <main className="flex flex-col justify-between items-center h-[100vh]">
            <Navbar />
            <section className="flex w-fit gap-x-20">{children}</section>
            <Footer />
          </main>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
