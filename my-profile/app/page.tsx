import React from 'react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col selection:bg-neo-pink selection:text-black font-sans">
      
      {/* Navigation / Header Area */}
      <header className="w-full p-6 border-b-4 border-foreground bg-neo-yellow flex justify-between items-center text-black">
        <div className="font-black text-2xl tracking-tighter uppercase border-4 border-foreground px-4 py-1 shadow-[4px_4px_0px_0px_#000] bg-white">
          SJM
        </div>
        <div className="hidden sm:block font-bold text-sm uppercase">
          Available for new projects
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        {/* Left Column: Hero Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 mt-8 lg:mt-16">
          <div className="inline-block">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none uppercase text-foreground">
              서지민
            </h1>
          </div>
          
          <div className="inline-block bg-neo-blue border-4 border-foreground px-6 py-4 shadow-neo max-w-max transform -rotate-2">
            <h2 className="text-xl md:text-3xl font-extrabold text-black uppercase tracking-wide">
              Vibe Coding Learner
            </h2>
          </div>

          <p className="text-lg md:text-2xl font-bold max-w-2xl leading-relaxed border-l-8 border-neo-pink pl-6 mt-8">
            바이브 코딩으로 멋진 프로덕트를 만들어가고 있는 대학생입니다.<br />
            새로운 기술과 파격적인 디자인에 관심이 많습니다😎
          </p>
        </div>

        {/* Right Column: Links Grid */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6 mt-8 lg:mt-16">
          <div className="border-b-4 border-foreground pb-4 mb-4">
            <h3 className="text-2xl font-black uppercase tracking-widest">Connect</h3>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-white dark:bg-zinc-900 border-4 border-foreground p-6 shadow-neo hover:shadow-neo-hover hover:translate-y-1 hover:translate-x-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-neo-pink border-4 border-foreground rounded-full text-black">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                </div>
                <span className="text-2xl font-black uppercase">GitHub</span>
              </div>
              <svg className="w-8 h-8 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </a>
          
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-white dark:bg-zinc-900 border-4 border-foreground p-6 shadow-neo hover:shadow-neo-hover hover:translate-y-1 hover:translate-x-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-neo-yellow border-4 border-foreground rounded-full text-black">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <rect width="14" height="14" x="5" y="5" rx="4" />
                    <circle cx="12" cy="12" r="3" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5h.01" />
                  </svg>
                </div>
                <span className="text-2xl font-black uppercase">Instagram</span>
              </div>
              <svg className="w-8 h-8 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </a>

          <a
            href="mailto:contact@example.com"
            className="group block w-full bg-neo-green border-4 border-foreground p-6 shadow-neo hover:shadow-neo-hover hover:translate-y-1 hover:translate-x-1 transition-all"
          >
            <div className="flex items-center justify-between text-black">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-white border-4 border-foreground rounded-full">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-2xl font-black uppercase">Email Me</span>
              </div>
              <svg className="w-8 h-8 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </a>
        </div>
      </main>

      {/* Footer Area */}
      <footer className="w-full p-8 border-t-4 border-foreground bg-white dark:bg-black mt-16 text-center">
        <p className="font-bold text-xl uppercase tracking-widest">
          © 2026 Seo Ji Min. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
