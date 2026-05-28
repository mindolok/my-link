export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300 flex items-center justify-center">
      <main className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8">
        
        {/* Profile Header */}
        <div className="space-y-6">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
              <svg 
                className="w-12 h-12 opacity-20" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">서지민</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              안녕하세요, 바이브 코딩을 배우고 있는 대학생입니다.
            </p>
          </div>
        </div>

        {/* Links / Contact */}
        <div className="flex justify-center gap-4 pt-4">
          <a 
            href="mailto:contact@example.com" 
            className="px-6 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg text-sm font-medium transition-all hover:opacity-90 active:scale-95"
          >
            Email
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-95"
          >
            GitHub
          </a>
        </div>

        {/* Simple Footer */}
        <footer className="pt-12 text-zinc-400 dark:text-zinc-600 text-xs tracking-widest uppercase">
          <p>© 2026 Seo Ji Min</p>
        </footer>
      </main>
    </div>
  );
}
