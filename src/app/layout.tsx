import type { Metadata } from "next";
import { Raleway, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ReduxProvider from "@/components/redux-provider";
import { Toaster } from "react-hot-toast";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppin",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pet Sitter Boca",
  description: "Best Pet Sitter in your Town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${roboto.variable} ${poppins.variable}`}>
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
          <Toaster/>
        </ReduxProvider>
      </body>
    </html>
  );
}
