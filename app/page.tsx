"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { Loader2, Fingerprint, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function Page() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (user && !loading) {
      router.push("/mypage")
    }
  }, [user, loading, router])

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("로그인 에러:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#09090b]">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-[#09090b] px-4 py-16 selection:bg-white/20">
      
      {/* 감각적인 배경 애니메이션 효과 */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {/* 그라디언트 오브젝트 1 */}
        <div 
          className={cn(
            "absolute h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-violet-500/10 via-fuchsia-500/10 to-transparent blur-[120px] transition-transform duration-1000 ease-in-out",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        {/* 그라디언트 오브젝트 2 */}
        <div 
          className={cn(
            "absolute h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-blue-500/10 to-cyan-500/10 blur-[100px] transition-all duration-1000 ease-in-out",
            isHovered ? "-translate-y-8 scale-105" : "translate-y-0 scale-100"
          )}
        />
      </div>

      {/* 미세한 노이즈 텍스처 (CSS SVG 기반) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />

      {/* 메인 콘텐츠 */}
      <div 
        className="z-10 flex flex-col items-center text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          Personal Digital Space
        </div>

        <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text pb-6 text-6xl font-extrabold tracking-tighter text-transparent sm:text-7xl lg:text-8xl">
          Everything <br />
          About Me.
        </h1>
        
        <p className="mx-auto mt-2 max-w-lg text-lg font-light leading-relaxed text-zinc-400 sm:text-xl">
          저의 작업물, 생각, 그리고 다양한 흔적들을<br className="hidden sm:block" />
          이곳, 단 하나의 공간에 담았습니다.
        </p>

        {/* 심플하고 감각적인 관리자 로그인 버튼 */}
        <div className="mt-14">
          <Button
            variant="outline"
            size="lg"
            className="group relative h-14 overflow-hidden rounded-full border-white/10 bg-white/5 px-8 text-sm font-medium uppercase tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95"
            onClick={handleLogin}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Fingerprint className="h-4 w-4 transition-transform group-hover:scale-110" />
              Manage Profile
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
