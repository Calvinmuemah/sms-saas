export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-4 text-center text-xs text-gray-500 bg-white dark:bg-gray-900">
      © {new Date().getFullYear()} SMS SaaS Platform • Built for scale
    </footer>
  );
}