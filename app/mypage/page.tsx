"use client"

import React, { useState, useEffect } from "react"
import { LinkItem } from "@/data/links"
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
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
  DialogFooter,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Plus, Share2, Loader2, Pencil, Trash2, Check, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요.").trim(),
  url: z.string()
    .trim()
    .min(1, "주소를 입력해주세요.")
    .url("유효한 URL을 입력해주세요. (http:// 또는 https:// 포함)"),
})

type FormValues = z.infer<typeof formSchema>

function LinkItemCard({ link }: { link: LinkItem }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  })

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form

  const handleUpdate = async (data: FormValues) => {
    try {
      await updateDoc(doc(db, "users", "anonymous", "links", link.id), {
        title: data.title,
        url: data.url,
      })
      setIsEditing(false)
    } catch (error) {
      console.error("링크 수정 중 오류 발생:", error)
      alert("링크를 수정하는 중 오류가 발생했습니다.")
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteDoc(doc(db, "users", "anonymous", "links", link.id))
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("링크 삭제 중 오류 발생:", error)
      alert("링크를 삭제하는 중 오류가 발생했습니다.")
    } finally {
      setIsDeleting(false)
    }
  }

  const cancelEdit = () => {
    reset({ title: link.title, url: link.url })
    setIsEditing(false)
  }

  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleSubmit(handleUpdate)()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(handleUpdate)()
    } else if (e.key === "Escape") {
      cancelEdit()
    }
  }

  if (isEditing) {
    return (
      <Card className="border border-primary/40 shadow-sm transition-all">
        <CardContent className="p-4 sm:p-5">
          <form 
            onSubmit={handleSubmit(handleUpdate)}
            onKeyDown={handleKeyDown}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor={`title-${link.id}`} className="sr-only">제목</Label>
              <Input 
                id={`title-${link.id}`} 
                placeholder="링크 제목 입력" 
                autoFocus
                {...register("title")}
              />
              {errors.title && <span className="text-sm font-medium text-red-500">{errors.title.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`url-${link.id}`} className="sr-only">주소</Label>
              <Input 
                id={`url-${link.id}`} 
                placeholder="https://..." 
                {...register("url")}
              />
              {errors.url && <span className="text-sm font-medium text-red-500">{errors.url.message}</span>}
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button type="button" variant="outline" onClick={cancelEdit} disabled={isSubmitting}>
                취소
              </Button>
              <Button type="submit" className="bg-[#5B5FC7] text-white hover:bg-[#5B5FC7]/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  "저장"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  let hostname = "example.com"
  try {
    hostname = new URL(link.url).hostname
  } catch {
    // URL 파싱 실패 시 무시
  }
  const faviconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=64`

  return (
    <div className="group relative w-full">
      <Link
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full outline-none"
      >
        <Card className="cursor-pointer border border-border/40 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 pr-20">
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
              <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-lg pl-14">
                {link.title}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      {/* 항상 노출되는 버튼 그룹 */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">수정</span>
        </Button>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger 
            render={
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            }
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">삭제</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">
                선택한 링크: <span className="font-semibold text-foreground">{link.title}</span>
              </p>
              <p className="text-sm font-medium text-red-500">
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
            <DialogFooter className="flex space-x-2 justify-end">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
                취소
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    삭제 중...
                  </>
                ) : (
                  "삭제하기"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default function MyPage() {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const q = query(
      collection(db, "users", "anonymous", "links"),
      orderBy("createdAt", "desc")
    )
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedLinks = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        url: doc.data().url,
      })) as LinkItem[]
      
      setLinks(fetchedLinks)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      url: "",
    },
  })

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form

  const onSubmit = async (data: FormValues) => {
    try {
      await addDoc(collection(db, "users", "anonymous", "links"), {
        title: data.title,
        url: data.url,
        createdAt: serverTimestamp(),
      })
      reset()
      setOpen(false)
    } catch (error) {
      console.error("링크 추가 중 오류 발생:", error)
      alert("링크를 추가하는 중 오류가 발생했습니다.")
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
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
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="title">제목</Label>
                  <Input 
                    id="title" 
                    placeholder="링크 제목 입력" 
                    {...register("title")}
                  />
                  {errors.title && <span className="text-sm font-medium text-red-500">{errors.title.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="url">주소</Label>
                  <Input 
                    id="url" 
                    placeholder="https://..." 
                    {...register("url")}
                  />
                  {errors.url && <span className="text-sm font-medium text-red-500">{errors.url.message}</span>}
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 bg-[#5B5FC7] text-white hover:bg-[#5B5FC7]/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      추가 중...
                    </>
                  ) : (
                    "추가하기"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* 하단: 링크 목록 */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {links.map((link) => (
                <LinkItemCard key={link.id} link={link} />
              ))}
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
