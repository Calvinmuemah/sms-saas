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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800/80 p-5 fixed left-0 top-0 flex flex-col justify-between z-30 transition-colors duration-200">
      
      <div className="space-y-8 overflow-y-auto max-h-[85vh] pr-1">
        {/* LOGO */}
        <div className="px-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-green-500/25">
            S
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            SMS SaaS
          </span>
        </div>

        {/* NAVIGATION GROUPS */}
        <nav className="space-y-6">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <span className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                {group.title}
              </span>
              
              <div className="space-y-1">
                {group.items.map((item, i) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link key={i} href={item.href}>
                      <div
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer text-xs font-bold transition-all duration-150
                        ${
                          active
                            ? "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon size={16} className={active ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"} />
                        <span>{item.name}</span>
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
      <div className="px-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        v1.2.0 • Active Session
      </div>
    </aside>
  );
}