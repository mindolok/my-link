"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { Loader2, ArrowRight } from "lucide-react"
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
      <div className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          링크, 그 이상.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          나를 표현하는 모든 페이지를 단 하나의 URL로.
        </p>
        
        <div className="mt-10">
          <Button
            size="lg"
            className="h-12 rounded-full px-8 text-base shadow-sm"
            onClick={handleLogin}
          >
            시작하기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
