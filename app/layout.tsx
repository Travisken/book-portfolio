import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Dr. Akinsiku Folarin Oluwanimbe",
  description: "Is a seasoned dentist with over 12 years of hands-on clinical experience and more than 5 years of leadership in organizational management within the healthcare sector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={``}
      >
        <main className="flex flex-col justify-between items-center h-[100vh] " >
          <section className="flex w-fit" >
            {children}
          </section>
        </main>

      </body>
    </html>
  );
}