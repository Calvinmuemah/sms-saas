"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  Calendar,
  CreditCard,
  Settings,
  Key,
  Megaphone,
  User,
  Users2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const menuGroups = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Messaging",
    items: [
      { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
      { name: "Scheduled", href: "/dashboard/scheduled", icon: Calendar },
      { name: "Message Logs", href: "/dashboard/messages", icon: MessageSquare },
    ],
  },
  {
    title: "Audience",
    items: [
      { name: "Recipients", href: "/dashboard/recipients", icon: Users2 },
      { name: "Team Members", href: "/dashboard/users", icon: Users },
    ],
  },
  {
    title: "Integrations & Billing",
    items: [
      { name: "API Keys", href: "/dashboard/api", icon: Key },
      { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "Profile", href: "/dashboard/profile", icon: User },
      { name: "System Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800/80 p-5 flex flex-col justify-between z-40 transition-all duration-300
        ${isCollapsed ? "w-20" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* FLOATING COLLAPSE TOGGLE TAB (DESKTOP ONLY) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-6 -right-3 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md flex items-center justify-center text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition cursor-pointer z-50 hidden md:flex active:scale-90"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* MOBILE CLOSE BUTTON */}
      <button
        onClick={() => setIsMobileOpen(false)}
        className="absolute top-5 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400 md:hidden z-50 cursor-pointer"
      >
        <X size={18} />
      </button>

      <div className="space-y-8 overflow-y-auto max-h-[85vh] pr-1">
        {/* LOGO */}
        <div className={`px-2.5 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
          <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-green-500/25 shrink-0">
            S
          </div>
          {!isCollapsed && (
            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight animate-fade-in">
              SMS SaaS
            </span>
          )}
        </div>

        {/* NAVIGATION GROUPS */}
        <nav className="space-y-6">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              {!isCollapsed ? (
                <span className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block truncate">
                  {group.title}
                </span>
              ) : (
                <div className="border-t border-gray-100 dark:border-gray-800/80 mx-1 my-3 first:hidden" />
              )}
              
              <div className="space-y-1">
                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link key={i} href={item.href} onClick={() => setIsMobileOpen(false)}>
                      <div
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-bold transition-all duration-150 relative group
                        ${isCollapsed ? "justify-center" : ""}
                        ${
                          active
                            ? "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon size={16} className={active ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"} />
                        
                        {!isCollapsed ? (
                          <span className="truncate">{item.name}</span>
                        ) : (
                          /* TOOLTIP WHEN COLLAPSED */
                          <div className="absolute left-14 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-50">
                            {item.name}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* FOOTER LABEL */}
      <div className={`px-2.5 pt-4 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0"></span>
        {!isCollapsed && <span className="truncate">v1.2.0 • Active</span>}
      </div>
    </aside>
  );
}