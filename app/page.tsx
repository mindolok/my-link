import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { dummyLinks } from "@/data/links"
import { Share2 } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center bg-slate-50 p-6 text-foreground dark:bg-zinc-950 md:p-12 lg:p-24 selection:bg-primary/20">
      <div className="flex w-full max-w-md flex-col gap-8">
        {/* Profile Header */}
        <div className="relative mt-8 flex flex-col items-center gap-5 text-center">
          {/* Share Button */}
          <div className="absolute right-0 top-0">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Share2 className="h-5 w-5" />
              <span className="sr-only">공유하기</span>
            </Button>
          </div>

          <Avatar className="h-24 w-24 border-2 border-background shadow-sm ring-2 ring-primary/10 transition-transform duration-300 hover:scale-105">
            {/* 임시 프로필 이미지 */}
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile image" />
            <AvatarFallback>ML</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              서지민
            </h1>
            <p className="text-sm font-medium text-muted-foreground sm:text-base">
              Developer & Creator
            </p>
          </div>
        </div>

        {/* Links List */}
        <div className="mt-2 flex w-full flex-col gap-4">
          {dummyLinks.map((link) => {
            let hostname = "example.com"
            try {
              hostname = new URL(link.url).hostname
            } catch {
              // URL 파싱 실패 시 무시
            }

            // 구글 파비콘 V2 API (더 안정적이고 차단 확률이 적음)
            const faviconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=64`

            return (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full outline-none"
              >
                <Card
                  className="cursor-pointer border border-border/40 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <CardContent className="flex w-full items-center p-4 sm:p-5">
                    <div className="relative flex w-full items-center justify-center">
                      <div className="absolute left-0 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary/50 transition-colors group-hover:bg-primary/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={faviconUrl} 
                          alt={`${link.title} icon`} 
                          className="h-6 w-6 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-lg">
                        {link.title}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
