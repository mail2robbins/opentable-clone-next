import NavBar from "@/components/NavBar";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { Inter } from "next/font/google";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OpenTable Clone",
  description: "OpenTable clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-100 min-h-screen w-screen text-black">
          <AuthContext>
            <main className="max-w-screen-2xl m-auto bg-white px-4 sm:px-6 lg:px-8">
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
