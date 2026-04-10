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
  Group,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Scheduled", href: "/dashboard/scheduled", icon: Calendar },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "API Keys", href: "/dashboard/api", icon: Key },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Recipients", href: "/dashboard/recipients", icon: Group },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 p-4 fixed left-0 top-0">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8 text-green-600">
        SMS SaaS
      </h1>

      {/* Menu */}
      <nav className="space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link key={i} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition
                ${
                  active
                    ? "bg-green-100 text-green-600 dark:bg-green-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}