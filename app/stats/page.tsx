"use client"

import React, { useMemo } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  clicks: {
    label: "클릭수",
    color: "var(--primary)",
  },
} satisfies ChartConfig

import Header from "@/components/header"

export default function StatsPage() {
  const { user, loading: authLoading } = useAuth()

  const { data: links = [], isLoading: isLinksLoading } = useQuery({
    queryKey: ["links", user?.uid, "stats"],
    queryFn: async () => {
      if (!user) return []
      
      const q = query(
        collection(db, "users", user.uid, "links"),
        orderBy("clicks", "desc")
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || "제목 없음",
        clicks: doc.data().clicks || 0,
      }))
    },
    enabled: !!user
  })

  const totalClicks = useMemo(() => {
    return links.reduce((sum, link) => sum + link.clicks, 0)
  }, [links])

  const chartData = useMemo(() => {
    return links.slice(0, 10).map(link => ({
      title: link.title.length > 10 ? link.title.substring(0, 10) + '...' : link.title,
      clicks: link.clicks
    }))
  }, [links])

  if (authLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-svh flex-col">
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">로그인이 필요한 페이지입니다</h2>
          <p className="text-muted-foreground mb-6">통계를 확인하려면 먼저 로그인해 주세요.</p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col bg-slate-50 dark:bg-zinc-950 selection:bg-primary/20">
      <Header />
      <main className="flex flex-1 flex-col items-center p-6 md:p-12 lg:p-24">
        <div className="flex w-full max-w-4xl flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Link 
                href="/mypage"
                className="group inline-flex items-center justify-center rounded-full h-10 w-10 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span className="sr-only">뒤로 가기</span>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                링크 통계
              </h1>
            </div>
            <p className="text-muted-foreground pl-12">
              등록하신 링크들의 퍼포먼스와 클릭수를 한눈에 확인해보세요.
            </p>
          </header>

          {isLinksLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Left Column */}
              <div className="md:col-span-1 flex flex-col gap-6">
                {/* Total Clicks Card */}
                <Card className="overflow-hidden border-none shadow-lg shadow-primary/5 bg-gradient-to-br from-primary/10 via-background to-background relative h-fit group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out transition-transform" />
                  <CardHeader className="pb-2">
                    <CardDescription className="font-medium text-primary/80">총 누적 클릭수</CardDescription>
                    <CardTitle className="text-5xl font-extrabold text-foreground tracking-tighter mt-2 drop-shadow-sm">
                      {totalClicks.toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mt-4 font-medium flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                      모든 링크의 클릭수 합산
                    </div>
                  </CardContent>
                </Card>

                {/* Most Popular Link Card */}
                {links.length > 0 && (
                  <Card className="overflow-hidden border-border/40 shadow-lg shadow-black/5 bg-background/50 backdrop-blur-sm relative h-fit transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20">
                    <CardHeader className="pb-2">
                      <CardDescription className="font-medium text-primary/80">가장 인기 있는 링크</CardDescription>
                      <CardTitle className="text-xl font-bold text-foreground mt-2 line-clamp-2 leading-tight">
                        {links[0].title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-3 flex items-baseline gap-1 text-primary">
                        <span className="text-4xl font-extrabold tracking-tight">{links[0].clicks.toLocaleString()}</span>
                        <span className="text-sm font-medium text-muted-foreground">회 클릭</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Chart Card */}
              <Card className="md:col-span-2 border-border/40 shadow-lg shadow-black/5 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">상위 10개 링크 순위</CardTitle>
                  <CardDescription>가장 인기가 많은 링크들의 클릭수 분포입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  {links.length > 0 ? (
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full mt-4">
                      <BarChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: -20 }}>
                        <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--border)" opacity={0.5} />
                        <XAxis
                          dataKey="title"
                          tickLine={false}
                          tickMargin={15}
                          axisLine={false}
                          fontSize={12}
                          fontWeight={500}
                          className="fill-muted-foreground"
                        />
                        <YAxis 
                          tickLine={false}
                          axisLine={false}
                          tickMargin={15}
                          allowDecimals={false}
                          fontSize={12}
                          className="fill-muted-foreground"
                        />
                        <ChartTooltip
                          cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                          content={<ChartTooltipContent hideLabel className="shadow-xl rounded-xl border-primary/10" />}
                        />
                        <Bar 
                          dataKey="clicks" 
                          fill="var(--color-clicks)" 
                          radius={[6, 6, 0, 0]} 
                          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                        />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <div className="flex h-[300px] flex-col items-center justify-center text-muted-foreground bg-secondary/30 rounded-xl border border-dashed border-border/60">
                      <p className="font-medium text-lg text-foreground/70">아직 등록된 링크가 없습니다.</p>
                      <p className="text-sm mt-1">링크를 추가하여 통계를 확인해보세요.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
