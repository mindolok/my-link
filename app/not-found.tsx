import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center bg-slate-50 p-6 text-foreground dark:bg-zinc-950 text-center selection:bg-primary/20">
      <h2 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-primary">404</h2>
      <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
        페이지를 찾을 수 없습니다. <br className="sm:hidden" />
        입력하신 주소가 정확한지 확인해 주세요.
      </p>
      <Button className="bg-[#5B5FC7] text-white hover:bg-[#5B5FC7]/90 rounded-full h-12 px-0 shadow-sm transition-transform hover:scale-105">
        <Link href="/" className="flex h-full w-full items-center justify-center px-8 text-base font-medium">
          홈으로 돌아가기
        </Link>
      </Button>
    </div>
  )
}
