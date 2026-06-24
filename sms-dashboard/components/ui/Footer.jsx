"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 dark:border-gray-800/60 py-6 px-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Brand and copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            SMS SaaS Platform
          </span>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
          <span>
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Middle Side: Status indicator */}
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-green-100/50 dark:border-green-900/30 px-3 py-1 rounded-full text-[11px] font-bold text-green-700 dark:text-green-400 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          All systems operational
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <Link
            href="/dashboard/api"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150"
          >
            API Docs
          </Link>
          <a
            href="mailto:support@sms-saas.com"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150"
          >
            Support
          </a>
          <Link
            href="/dashboard/settings"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150"
          >
            Settings
          </Link>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span className="text-[10px] text-gray-400 font-mono">v1.2.0</span>
        </div>
      </div>
    </footer>
  );
}