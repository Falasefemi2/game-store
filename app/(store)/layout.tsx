
import { Navbar, Sidebar } from "@/components/Navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Sidebar />

                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <Navbar />
                    {children}

                </div>
            </div>
        </>
    );
}

export default Layout;