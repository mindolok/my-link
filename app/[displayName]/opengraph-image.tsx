import { ImageResponse } from "next/og"

export const alt = "MyLink 프로필"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

interface FirestoreValue {
  stringValue?: string
  integerValue?: string
}
interface FirestoreDoc {
  name?: string
  fields?: Record<string, FirestoreValue>
}

async function firestoreGet(path: string): Promise<FirestoreDoc | null> {
  try {
    const res = await fetch(`${FIRESTORE_BASE}/${path}`, { cache: "no-store" })
    if (!res.ok) return null
    return res.json() as Promise<FirestoreDoc>
  } catch {
    return null
  }
}

async function firestoreQuery(
  collectionId: string,
  field: string,
  value: string
): Promise<FirestoreDoc | null> {
  try {
    const body = {
      structuredQuery: {
        from: [{ collectionId }],
        where: {
          fieldFilter: {
            field: { fieldPath: field },
            op: "EQUAL",
            value: { stringValue: value },
          },
        },
        limit: 1,
      },
    }
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    )
    if (!res.ok) return null
    const results = (await res.json()) as Array<{ document?: FirestoreDoc }>
    return results[0]?.document ?? null
  } catch {
    return null
  }
}

async function fetchUserProfile(displayName: string) {
  try {
    // 1) usernames/{displayName} → uid
    const usernameDoc = await firestoreGet(`usernames/${displayName}`)
    let uid: string | null = null

    if (usernameDoc?.fields?.uid?.stringValue) {
      uid = usernameDoc.fields.uid.stringValue
    } else {
      const userDoc = await firestoreQuery("users", "displayName", displayName)
      if (userDoc?.name) {
        const parts = userDoc.name.split("/")
        uid = parts[parts.length - 1]
      }
    }

    if (!uid) return null

    const userDoc = await firestoreGet(`users/${uid}`)
    if (!userDoc?.fields) return null

    const uDisplayName = userDoc.fields.displayName?.stringValue ?? displayName
    const bio = userDoc.fields.bio?.stringValue ?? "Developer & Creator"

    const linksRes = await fetch(
      `${FIRESTORE_BASE}/users/${uid}/links?pageSize=100&mask.fieldPaths=url`,
      { cache: "no-store" }
    )
    let linkCount = 0
    if (linksRes.ok) {
      const linksData = (await linksRes.json()) as { documents?: unknown[] }
      linkCount = linksData.documents?.length ?? 0
    }

    return { displayName: uDisplayName, bio, linkCount }
  } catch {
    return null
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ displayName: string }>
}) {
  const { displayName: rawName } = await params
  const displayName = decodeURIComponent(rawName)

  const profile = await fetchUserProfile(displayName)

  const name = profile?.displayName ?? displayName
  const bio = profile?.bio ?? "Developer & Creator"
  const initials = name.substring(0, 2).toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b", // zinc-950
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 부드러운 배경 빛 */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: -85,
            left: 200,
            width: 800,
            height: 800,
            backgroundImage: "radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(9, 9, 11, 0) 70%)",
          }}
        />

        {/* 아바타 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: "#27272a", // zinc-800
            border: "2px solid rgba(255,255,255,0.1)",
            fontSize: 72,
            fontWeight: 700,
            color: "#fafafa",
            marginBottom: 48,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
          }}
        >
          {initials}
        </div>

        {/* 닉네임 (메인 포커스) */}
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            color: "#fafafa",
            letterSpacing: "-0.04em",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {name}
        </div>

        {/* 바이오 */}
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#a1a1aa", // zinc-400
            letterSpacing: "-0.02em",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {bio}
        </div>

        {/* 하단 심플한 URL (상업적 느낌 제거, 사용자 소유 강조) */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 48,
            fontSize: 24,
            fontWeight: 500,
            color: "#52525b", // zinc-600
            letterSpacing: "0.02em",
          }}
        >
          mylink.app/{displayName}
        </div>
      </div>
    ),
    { ...size }
  )
}
