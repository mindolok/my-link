"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { Loader2, Link2, Pencil, Share2, ArrowRight, Sparkles, Code2, GitBranch, Tv2, Globe } from "lucide-react"
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
    <div className="flex flex-col overflow-hidden">
      {/* ── Hero 섹션 ── */}
      <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 md:py-32 selection:bg-primary/20">
        {/* 배경 그라디언트 orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-transparent blur-3xl dark:from-violet-600/20 dark:via-indigo-600/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-purple-500/20 to-transparent blur-3xl dark:from-purple-700/15"
        />

        <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">
          {/* 텍스트 영역 */}
          <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            {/* 뱃지 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:border-primary/40 dark:bg-primary/15">
              <Sparkles className="h-3.5 w-3.5" />
              무료로 바로 시작하세요
            </div>

            {/* 메인 타이틀 */}
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              나만의{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400">
                링크 허브
              </span>
              를<br className="hidden sm:block" /> 만들어 보세요
            </h1>

            {/* 서브 카피 */}
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
              GitHub, 블로그, 포트폴리오, SNS — 흩어진 링크를{" "}
              <strong className="font-semibold text-foreground">하나의 URL</strong>로 모아
              누구에게나 간편하게 공유하세요.
            </p>

            {/* CTA 버튼 그룹 */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
              <Button
                id="hero-cta-login"
                size="lg"
                className="h-12 gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/40 active:scale-95"
                onClick={handleLogin}
              >
                무료로 시작하기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* 신뢰 지표 */}
            <p className="text-sm text-muted-foreground">
              Google 계정으로 5초 만에 · 신용카드 불필요
            </p>
          </div>

          {/* 목업 카드 */}
          <div className="relative flex w-full max-w-xs flex-shrink-0 flex-col items-center sm:max-w-sm lg:max-w-xs xl:max-w-sm">
            {/* 뒷 카드 그림자 레이어 */}
            <div
              aria-hidden
              className="absolute -bottom-4 left-1/2 h-full w-[90%] -translate-x-1/2 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 blur-sm"
            />
            {/* 메인 목업 카드 */}
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/80">
              {/* 프로필 영역 */}
              <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-violet-50 to-white px-6 pt-8 pb-5 dark:from-zinc-800/60 dark:to-zinc-900/80">
                {/* 아바타 */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-2xl font-bold text-white shadow-lg">
                  서
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-foreground">서지민</p>
                  <p className="text-xs text-muted-foreground">Developer &amp; Creator</p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                  mylink.app/seojimin
                </div>
              </div>

              {/* 링크 목록 */}
              <div className="flex flex-col gap-2.5 px-5 py-4">
                <MockLinkItem
                  icon={<GitBranch className="h-4 w-4" />}
                  label="GitHub 프로필"
                  color="bg-zinc-900 dark:bg-zinc-700"
                  href="github.com"
                />
                <MockLinkItem
                  icon={<Globe className="h-4 w-4" />}
                  label="개인 블로그"
                  color="bg-emerald-600"
                  href="blog.seojimin.dev"
                />
                <MockLinkItem
                  icon={<Tv2 className="h-4 w-4" />}
                  label="유튜브 채널"
                  color="bg-red-600"
                  href="youtube.com"
                />
                <MockLinkItem
                  icon={<Code2 className="h-4 w-4" />}
                  label="포트폴리오"
                  color="bg-indigo-600"
                  href="portfolio.seojimin.dev"
                />
              </div>

              {/* 하단 워터마크 */}
              <div className="border-t border-border/50 px-5 py-3 text-center">
                <p className="text-[11px] text-muted-foreground/60">
                  powered by <span className="font-semibold text-primary/80">MyLink</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features 섹션 ── */}
      <section className="relative bg-slate-50 px-4 py-20 dark:bg-zinc-950 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              왜 MyLink인가요?
            </h2>
            <p className="mt-3 text-muted-foreground">
              복잡한 설정 없이, 지금 바로 나만의 링크 페이지를 완성하세요
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              id="feature-collect"
              icon={<Link2 className="h-6 w-6" />}
              iconBg="bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
              title="하나의 링크로 모든 것"
              desc="GitHub, 블로그, SNS, 포트폴리오 등 흩어진 링크를 하나의 URL에 모아 공유하세요."
            />
            <FeatureCard
              id="feature-inline-edit"
              icon={<Pencil className="h-6 w-6" />}
              iconBg="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
              title="클릭하면 바로 편집"
              desc="텍스트를 클릭하면 그 자리에서 즉시 수정 완료. 복잡한 폼 페이지가 필요 없어요."
            />
            <FeatureCard
              id="feature-share"
              icon={<Share2 className="h-6 w-6" />}
              iconBg="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400"
              title="한 번의 클릭으로 공유"
              desc="내 MyLink URL을 복사해 인스타그램, 이메일, 명함 등 어디서든 공유하세요."
            />
          </div>
        </div>
      </section>

      {/* ── How It Works 섹션 ── */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              딱 3단계면 충분해요
            </h2>
            <p className="mt-3 text-muted-foreground">복잡한 설치나 설정은 잊으세요</p>
          </div>

          <div className="relative flex flex-col gap-8 md:flex-row md:gap-4">
            {/* 연결선 (데스크탑) */}
            <div
              aria-hidden
              className="absolute top-10 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
              style={{ top: "2.5rem" }}
            />

            <StepCard
              id="step-signup"
              step={1}
              title="Google로 가입"
              desc="구글 계정 하나로 5초 만에 가입 완료. 별도 비밀번호 불필요."
              color="from-violet-500 to-violet-600"
            />
            <StepCard
              id="step-customize"
              step={2}
              title="링크 추가 & 꾸미기"
              desc="원하는 링크를 추가하고, 닉네임과 소개를 인라인으로 바로 편집하세요."
              color="from-indigo-500 to-indigo-600"
            />
            <StepCard
              id="step-share"
              step={3}
              title="URL 공유하기"
              desc="mylink.app/내닉네임 으로 완성된 나만의 링크 페이지를 세상에 알리세요."
              color="from-purple-500 to-purple-600"
            />
          </div>
        </div>
      </section>

      {/* ── 하단 CTA 섹션 ── */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        {/* 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 dark:from-violet-800 dark:via-indigo-800 dark:to-purple-900" />
        {/* 장식 원형 */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            지금 바로 시작하세요
          </h2>
          <p className="mt-4 text-lg text-white/80">
            무료로, 복잡한 설정 없이. 내 모든 링크를 하나로.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              id="footer-cta-login"
              size="lg"
              className="h-12 gap-2 bg-white px-8 text-base font-semibold text-violet-700 shadow-xl transition-all hover:bg-white/90 hover:shadow-white/30 active:scale-95"
              onClick={handleLogin}
            >
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Google 계정만 있으면 됩니다 · 신용카드 불필요
          </p>
        </div>
      </section>
    </div>
  )
}

/* ── 서브 컴포넌트 ── */

function MockLinkItem({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode
  label: string
  color: string
  href: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 px-4 py-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-default">
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white ${color}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="ml-auto h-1.5 w-12 rounded-full bg-border/60" />
    </div>
  )
}

function FeatureCard({
  id,
  icon,
  iconBg,
  title,
  desc,
}: {
  id: string
  icon: React.ReactNode
  iconBg: string
  title: string
  desc: string
}) {
  return (
    <div
      id={id}
      className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-background p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} transition-transform duration-200 group-hover:scale-110`}>
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

function StepCard({
  id,
  step,
  title,
  desc,
  color,
}: {
  id: string
  step: number
  title: string
  desc: string
  color: string
}) {
  return (
    <div
      id={id}
      className="relative flex flex-1 flex-col items-center gap-4 rounded-2xl border border-border/60 bg-background p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* 스텝 번호 원 */}
      <div
        className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-sm font-bold text-white shadow-lg`}
      >
        {step}
      </div>
      <div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}
