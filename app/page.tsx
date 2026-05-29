"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { Loader2 } from "lucide-react"
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
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center bg-slate-50 p-6 text-foreground dark:bg-zinc-950 md:p-12 selection:bg-primary/20">
      <div className="max-w-xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
          나만의 멀티 링크 프로필
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          여러 개의 링크를 하나의 페이지로 모아서 공유하세요.
          간편하게 나만의 링크 트리를 만들 수 있습니다.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg" className="text-base h-12 px-8 bg-[#5B5FC7] hover:bg-[#5B5FC7]/90 text-white" onClick={handleLogin}>
            무료로 시작하기
          </Button>
        </div>
      </div>
    </div>
  )
}
