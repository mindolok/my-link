import { Card, CardContent } from "@/components/ui/card"
import { dummyLinks } from "@/data/links"
import {
  Camera,
  Video,
  FileText,
  Code,
  Briefcase,
  LinkIcon,
} from "lucide-react"
import type { ElementType } from "react"
import Link from "next/link"

const iconMap: Record<string, ElementType> = {
  instagram: Camera,
  youtube: Video,
  "file-text": FileText,
  github: Code,
  briefcase: Briefcase,
}

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center bg-background p-6 text-foreground md:p-12 lg:p-24">
      <div className="flex w-full max-w-md flex-col gap-10">
        {/* Profile Header */}
        <div className="mt-4 flex flex-col items-center gap-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
            M
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">MyLink</h1>
            <p className="mt-2 text-muted-foreground">
              저의 모든 링크를 한 곳에서 확인하세요.
            </p>
          </div>
        </div>

        {/* Links List */}
        <div className="flex w-full flex-col gap-4">
          {dummyLinks.map((link) => {
            const IconComponent = link.icon
              ? iconMap[link.icon] || LinkIcon
              : LinkIcon

            return (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full outline-none"
              >
                <Card className="cursor-pointer border-2 transition-all hover:border-primary hover:bg-accent/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <CardContent className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                      <IconComponent className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                      <span className="text-lg font-semibold">
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
