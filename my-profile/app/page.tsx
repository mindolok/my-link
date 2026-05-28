export default function ProfilePage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background Animated Blobs */}
      <div className="fixed inset-0 w-full h-full pointer-events-none flex justify-center items-center overflow-hidden z-0">
        <div className="absolute top-1/4 -left-12 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 dark:opacity-20 animate-blob" />
        <div className="absolute top-1/3 -right-12 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 dark:opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content Card */}
      <main className="relative z-10 w-full max-w-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10">
        
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-[3px] border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-inner">
               <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="text-center mt-6">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">서지민</h1>
            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium tracking-wide uppercase">
              Vibe Coding Learner
            </p>
            <p className="mt-4 text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed px-2">
              바이브 코딩으로 멋진 프로덕트를 만들어가고 있는 대학생입니다. 새로운 기술과 예쁜 디자인에 관심이 많습니다 🚀
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mt-10 space-y-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">GitHub</span>
            </div>
            <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </a>
          
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-pink-600 dark:text-pink-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="14" height="14" x="5" y="5" rx="4" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 7.5h.01" />
                </svg>
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Instagram</span>
            </div>
            <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </a>

          <a
            href="mailto:contact@example.com"
            className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">이메일 보내기</span>
            </div>
            <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
      </main>

      <footer className="relative z-10 mt-16 text-center text-xs font-semibold text-slate-400/80 dark:text-slate-500 uppercase tracking-widest">
        © 2026 Seo Ji Min. All rights reserved.
      </footer>
    </div>
  );
}
