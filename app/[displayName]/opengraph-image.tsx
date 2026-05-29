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
  const bio = profile?.bio ?? "MyLink 사용자"
  const linkCount = profile?.linkCount ?? 0
  const initials = name.substring(0, 2).toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #2d1b69 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 orb 1 */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: -160,
            right: -160,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(124, 58, 237, 0.3)",
            filter: "blur(80px)",
          }}
        />
        {/* 배경 orb 2 */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: -120,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(79, 70, 229, 0.25)",
            filter: "blur(80px)",
          }}
        />

        {/* ── 좌측 텍스트 ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 64px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* 브랜드 배지 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: 32,
              width: "fit-content",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#a78bfa",
              }}
            />
            <span style={{ color: "#c4b5fd", fontSize: 15, fontWeight: 600, letterSpacing: "0.5px" }}>
              MyLink
            </span>
          </div>

          {/* 닉네임 */}
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            {name}
          </div>

          {/* 바이오 */}
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(196, 181, 253, 0.85)",
              letterSpacing: "-0.3px",
              lineHeight: 1.4,
              marginBottom: 40,
              maxWidth: 480,
            }}
          >
            {bio}
          </div>

          {/* 링크 카운트 + URL 배지 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 12,
                padding: "10px 20px",
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 800, color: "#a78bfa" }}>{linkCount}</span>
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
                개의 링크
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                borderRadius: 12,
                padding: "10px 20px",
              }}
            >
              <span style={{ fontSize: 16, color: "white", fontWeight: 600 }}>
                mylink.app/{displayName}
              </span>
            </div>
          </div>
        </div>

        {/* ── 우측 프로필 카드 ── */}
        <div
          style={{
            width: 340,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 40px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 260,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 28,
              padding: "36px 28px",
            }}
          >
            {/* 아바타 */}
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                fontWeight: 800,
                color: "white",
                boxShadow: "0 0 0 4px rgba(139,92,246,0.3), 0 8px 32px rgba(124,58,237,0.5)",
              }}
            >
              {initials}
            </div>

            {/* 이름 & 바이오 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: "white" }}>{name}</span>
              <span style={{ fontSize: 13, color: "rgba(196,181,253,0.7)" }}>{bio}</span>
            </div>

            {/* 링크 미리보기 3줄 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "100%",
                    height: 38,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: `rgba(139,92,246,${0.5 - i * 0.1})`,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      background: `rgba(255,255,255,${0.2 - i * 0.04})`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
