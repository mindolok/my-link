"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { Loader2, ArrowRight, GitBranch, Code2, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const { user, loading } = useAuth()
  const router = useRouter()

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
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 sm:px-6 lg:px-8">
      {/* 미니멀한 배경 빛 (중앙 집중) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
      />

      {/* ── 메인 텍스트 영역 ── */}
      <div className="z-10 mt-10 flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          나를 표현하는 <br className="hidden sm:block" />
          <span className="text-primary">단 하나의 공간</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
          불필요한 기능이나 상업적인 로고는 덜어냈습니다.<br />
          오롯이 당신에게만 집중된 심플한 프로필을 완성하세요.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            size="lg"
            className="h-14 rounded-full px-8 text-base font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
            onClick={handleLogin}
          >
            Google로 3초만에 시작하기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ── 미니멀한 프로필 목업 (분위기 연출용) ── */}
      <div className="z-10 mt-20 w-full max-w-sm pb-10 sm:max-w-md">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-background/60 p-8 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2">
          {/* 아바타 */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary/40 text-3xl font-bold text-primary-foreground shadow-lg">
            나
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold text-foreground">내 이름</div>
            <div className="mt-1.5 text-sm font-medium text-muted-foreground">나를 설명하는 한 줄</div>
          </div>

          <div className="mt-8 flex flex-col gap-3.5">
            {[ 
              { icon: <GitBranch className="h-5 w-5" />, label: "GitHub 프로필" },
              { icon: <Globe className="h-5 w-5" />, label: "개인 블로그" },
              { icon: <Code2 className="h-5 w-5" />, label: "포트폴리오" },
            ].map((item, i) => (
              <div 
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-border/40 bg-background/80 px-5 py-4 transition-colors hover:bg-muted/80"
              >
                <div className="text-muted-foreground">{item.icon}</div>
                <div className="text-sm font-medium text-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
