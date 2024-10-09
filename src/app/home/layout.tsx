"use client";
import Sidebar from "../components/home/sidebar/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64 bg-customGreen-100">
        <div className="p-4 border-2 border-customGreen-100 border-dashed rounded-lg dark:border-customGreen-100">
          {children}
        </div>
      </div>
    </>
  );
}
