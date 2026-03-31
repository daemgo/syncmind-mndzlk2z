"use client";

import { Link, useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    name: "仪表盘",
    icon: LayoutDashboard,
    route: "/",
  },
  {
    id: "customers",
    name: "客户管理",
    icon: Users,
    route: "/customers",
  },
  {
    id: "opportunities",
    name: "商机管理",
    icon: TrendingUp,
    route: "/opportunities",
  },
  {
    id: "followups",
    name: "销售跟进",
    icon: MessageSquare,
    route: "/followups",
  },
];

export function Sidebar() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-60 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      {/* Logo/Brand */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          CRM 系统
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">B2B 销售管理</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            currentPath === item.route ||
            (item.route !== "/" && currentPath.startsWith(item.route));
          return (
            <Link
              key={item.id}
              to={item.route}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
