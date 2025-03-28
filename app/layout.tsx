import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Akinsiku Folarin Oluwanimbe",
  description: "A seasoned dentist with over 12 years of hands-on clinical experience and more than 5 years of leadership in organizational management within the healthcare sector.",
  openGraph: {
    title: "Dr. Akinsiku Folarin Oluwanimbe",
    description: "A seasoned dentist with over 12 years of hands-on clinical experience and more than 5 years of leadership in organizational management within the healthcare sector.",
    url: "https://www.drnimbs.com",
    siteName: "Dr. Akinsiku Folarin Oluwanimbe",
    images: [
      {
        url: "https://www.drnimbs.com/author.jpeg", // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "Dr. Akinsiku Folarin Oluwanimbe",
      },
    ],
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Dr. Akinsiku Folarin Oluwanimbe",
  //   description: "A seasoned dentist with over 12 years of hands-on clinical experience and more than 5 years of leadership in organizational management within the healthcare sector.",
  //   images: "https://www.drnimbs.com/author.jpeg", // Replace with actual image URL
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main className="flex flex-col justify-between items-center h-[100vh]">
          <section className="flex w-fit">{children}</section>
        </main>
      </body>
    </html>
  );
}
