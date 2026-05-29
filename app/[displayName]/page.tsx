"use client"

import { useParams, notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LinkItem } from "@/data/links"
import { useEffect } from "react"

export default function ProfilePage() {
  const params = useParams()
  const displayName = params?.displayName as string | undefined
  const decodedName = displayName ? decodeURIComponent(displayName) : ""

  const { data: userDoc, isLoading: isUserLoading, isError: isUserError } = useQuery({
    queryKey: ["user", decodedName],
    queryFn: async () => {
      if (!decodedName) return null
      
      const q = query(
        collection(db, "users"),
        where("displayName", "==", decodedName),
        limit(1)
      )
      const snapshot = await getDocs(q)
      
      if (snapshot.empty) {
        return null // Not found
      }
      
      const doc = snapshot.docs[0]
      return {
        id: doc.id,
        ...doc.data()
      } as { id: string, displayName: string, bio?: string }
    },
    enabled: !!decodedName
  })

  // 만약 로딩이 끝났는데 유저가 없으면 notFound 호출
  useEffect(() => {
    if (!isUserLoading && !userDoc) {
      notFound()
    }
  }, [isUserLoading, userDoc])

  const { data: links = [], isLoading: isLinksLoading } = useQuery({
    queryKey: ["links", userDoc?.id],
    queryFn: async () => {
      if (!userDoc?.id) return []
      const q = query(
        collection(db, "users", userDoc.id, "links"),
        orderBy("createdAt", "desc")
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        url: doc.data().url,
        updatedAt: doc.data().updatedAt?.toDate() || null,
      })) as LinkItem[]
    },
    enabled: !!userDoc?.id
  })

  if (isUserLoading || isUserError || !userDoc) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 p-6 text-foreground dark:bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const loading = isUserLoading || isLinksLoading

  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center bg-slate-50 p-6 text-foreground dark:bg-zinc-950 md:p-12 lg:p-24 selection:bg-primary/20">
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
            <AvatarFallback>{userDoc.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="w-full space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {userDoc.displayName}
            </h1>
            <p className="text-sm font-medium text-muted-foreground sm:text-base mt-1">
              {userDoc.bio !== undefined ? userDoc.bio : "Developer & Creator"}
            </p>
          </div>
        </div>

        {/* Links List */}
        <div className="mt-2 flex w-full flex-col gap-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
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
                        <div className="relative flex w-full items-center justify-center min-h-[44px]">
                          <div className="absolute left-0 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary/50 transition-colors group-hover:bg-primary/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={faviconUrl} 
                              alt={`${link.title} icon`} 
                              className="h-6 w-6 object-contain"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex w-full items-center justify-center px-14">
                            <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-lg text-center truncate">
                              {link.title}
                            </span>
                          </div>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
