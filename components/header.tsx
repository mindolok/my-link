"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, User, LayoutDashboard } from "lucide-react"

export default function Header() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", "anonymous"],
    queryFn: async () => {
      const userDocRef = doc(db, "users", "anonymous")
      const docSnap = await getDoc(userDocRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        return {
          displayName: data.displayName || "서지민",
          bio: data.bio !== undefined ? data.bio : "Developer & Creator"
        }
      }
      return { displayName: "서지민", bio: "Developer & Creator" }
    }
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-xl text-primary">MyLink</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/mypage" 
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">마이페이지</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-primary outline-none">
              <Avatar className="h-8 w-8 hover:opacity-80 transition-opacity">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none flex items-center h-4">
                      {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : profile?.displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground pt-1">
                      {isLoading ? "..." : profile?.bio}
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
                  href={profile?.displayName ? `/${encodeURIComponent(profile.displayName)}` : "/"} 
                  className="flex items-center w-full px-2 py-1.5 outline-none"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>내 프로필 보기</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
