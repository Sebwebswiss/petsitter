import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

interface ClientDefaultLayoutProps {
  children: React.ReactNode;
  noPadding?: boolean; 
}

function ClientDefaultLayout({ children, noPadding = false }: ClientDefaultLayoutProps) {
  return (
    <div className="flex bg-white font-heading">
      <div className="flex bg-white font-heading w-full">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full md:ml-64">
          <Header />
          <div
            className={`bg-tertiary w-full ${
              noPadding ? '' : 'py-6'
            } px-6 min-h-screen flex flex-col gap-6 max-w-[100vw] overflow-x-hidden`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDefaultLayout;
