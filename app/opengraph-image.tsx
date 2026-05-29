import { ImageResponse } from "next/og"

export const alt = "MyLink — 나만의 멀티 링크 프로필"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
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
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 orb 1 */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.25)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />
        {/* 배경 장식 orb 2 */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.2)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />

        {/* 로고 영역 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {/* 로고 아이콘 */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(124, 58, 237, 0.5)",
            }}
          >
            <span style={{ color: "white", fontSize: 28, fontWeight: 700 }}>M</span>
          </div>
          <span
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            MyLink
          </span>
        </div>

        {/* 메인 타이틀 — br 대신 column flex */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
            }}
          >
            나만의 링크 허브를 만들어 보세요
          </span>
        </div>

        {/* 서브 카피 */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "rgba(196, 181, 253, 0.9)",
            textAlign: "center",
            letterSpacing: "-0.3px",
          }}
        >
          흩어진 링크를 하나의 URL로 · 무료로 바로 시작
        </div>

        {/* 하단 URL 배지 */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 999,
            padding: "10px 24px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#34d399",
              display: "flex",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, letterSpacing: "0.3px" }}>
            mylink.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
