"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, User, LayoutDashboard, LogOut, LogIn } from "lucide-react"

export default function Header() {
  const { user, loading: authLoading } = useAuth()
  
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: async () => {
      if (!user) return null
      const userDocRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(userDocRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        return {
          displayName: data.displayName || "서지민",
          bio: data.bio !== undefined ? data.bio : "Developer & Creator"
        }
      }
      return { displayName: user.displayName || "MyLink User", bio: "Developer & Creator" }
    },
    enabled: !!user
  })

  const isLoading = authLoading || isProfileLoading

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("로그인 에러:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      window.location.href = "/"
    } catch (error) {
      console.error("로그아웃 에러:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-xl text-primary">MyLink</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {authLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
          ) : !user ? (
            <Button onClick={handleLogin} variant="default" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Google 로그인
            </Button>
          ) : (
            <>
              <Link 
                href="/mypage" 
                className="flex items-center rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                내 페이지
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-primary outline-none">
                  <Avatar className="h-8 w-8 hover:opacity-80 transition-opacity">
                    <AvatarImage src={user.photoURL || "https://github.com/shadcn.png"} alt="Profile" />
                    <AvatarFallback>{profile?.displayName?.substring(0, 2).toUpperCase() || user.displayName?.substring(0, 2).toUpperCase() || "ML"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none flex items-center h-4">
                          {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : (profile?.displayName || user.displayName)}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground pt-1">
                          {isLoading ? "..." : (profile?.bio || user.email)}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0 cursor-pointer">
                    <Link href="/mypage" className="flex items-center w-full px-2 py-1.5 outline-none">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>마이페이지</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0 cursor-pointer">
                    <Link 
                      href={(profile?.displayName || user.displayName) ? `/${encodeURIComponent(profile?.displayName || user.displayName || "")}` : "/"} 
                      className="flex items-center w-full px-2 py-1.5 outline-none"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>내 프로필 보기</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0 cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
                    <div className="flex items-center w-full px-2 py-1.5 outline-none">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>로그아웃</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
