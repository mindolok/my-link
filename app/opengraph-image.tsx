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
          backgroundColor: "#09090b",
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
            backgroundImage: "radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, rgba(9, 9, 11, 0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* 심플한 텍스트 로고 */}
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              color: "#a1a1aa",
              letterSpacing: "0.1em",
              marginBottom: 16,
            }}
          >
            mylink.app
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              color: "#fafafa",
              textAlign: "center",
              letterSpacing: "-0.04em",
              lineHeight: 1.2,
            }}
          >
            나만의 링크 공간
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#71717a",
              textAlign: "center",
              letterSpacing: "-0.02em",
              marginTop: 16,
            }}
          >
            하나의 링크로 모든 것을 연결하세요
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
