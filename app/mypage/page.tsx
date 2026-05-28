"use client"

import React, { useState } from "react"
import { dummyLinks, LinkItem } from "@/data/links"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Plus, Share2 } from "lucide-react"

export default function MyPage() {
  const [links, setLinks] = useState<LinkItem[]>(dummyLinks)
  const [open, setOpen] = useState(false)
  
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const handleAddLink = () => {
    if (!title.trim() || !url.trim()) return

    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: title.trim(),
      url: url.trim(),
    }

    setLinks([newLink, ...links])
    setTitle("")
    setUrl("")
    setOpen(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setTitle("")
      setUrl("")
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center bg-slate-50 p-6 text-foreground dark:bg-zinc-950 md:p-12 lg:p-24 selection:bg-primary/20">
      <div className="flex w-full max-w-md flex-col gap-8">
        
        {/* Profile Header */}
        <div className="relative mt-8 flex flex-col items-center gap-5 text-center">
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

        {/* 상단: 내 링크 관리 제목 & 추가 다이얼로그 */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            내 링크 관리
          </h1>
          
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger 
              render={<Button className="bg-[#5B5FC7] text-white hover:bg-[#5B5FC7]/90" />}
            >
              <Plus className="mr-2 h-4 w-4" />
              링크 추가
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>새 링크 추가</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="title">제목</Label>
                  <Input 
                    id="title" 
                    placeholder="링크 제목 입력" 
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="url">주소</Label>
                  <Input 
                    id="url" 
                    placeholder="https://..." 
                    value={url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleAddLink} 
                  className="mt-4 bg-[#5B5FC7] text-white hover:bg-[#5B5FC7]/90"
                >
                  추가하기
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        {/* 하단: 링크 목록 */}
        <div className="flex flex-col gap-4">
          {links.map((link) => {
            let hostname = "example.com"
            try {
              hostname = new URL(link.url).hostname
            } catch {
              // URL 파싱 실패 시 무시
            }
            const faviconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=64`

            return (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full outline-none"
              >
                <Card className="cursor-pointer border border-border/40 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
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
          {links.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              등록된 링크가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
