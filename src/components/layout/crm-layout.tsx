"use client";

import { Outlet } from "@tanstack/react-router";
import { CRMSidebar } from "./crm-sidebar";

export function CRMLayout() {
  return (
    <div className="flex h-screen bg-background">
      <CRMSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
