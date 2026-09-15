import { ImageResponse } from "next/og";
import { siteHostname, type SocialCard } from "@/lib/site-metadata";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function createSocialImage(card: SocialCard) {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#111111",
        color: "#edeef2",
        display: "flex",
        fontFamily: "sans-serif",
        height: "100%",
        letterSpacing: "0.025em",
        padding: "48px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid #343434",
          borderRadius: "24px",
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            borderRight: "1px solid #343434",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "54px",
            width: "36%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "16px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "#242424",
                border: "1px solid #343434",
                borderRadius: "999px",
                display: "flex",
                fontSize: "24px",
                height: "62px",
                justifyContent: "center",
                width: "62px",
              }}
            >
              TE
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "23px", fontWeight: 700 }}>Tony Edgal</span>
              <span style={{ color: "#a5a5a5", fontSize: "16px" }}>
                Frontend Engineer
              </span>
            </div>
          </div>

          <div
            style={{
              color: "#a5a5a5",
              display: "flex",
              flexDirection: "column",
              fontSize: "17px",
              gap: "8px",
            }}
          >
            <span>Design and Fullstack Engineer</span>
            <span>{siteHostname}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "62px 68px",
          }}
        >
          <div
            style={{
              color: "#a5a5a5",
              display: "flex",
              fontSize: "18px",
              letterSpacing: "0.14em",
              marginBottom: "28px",
              textTransform: "uppercase",
            }}
          >
            {card.label}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: card.title.length > 34 ? "48px" : "58px",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              marginBottom: "28px",
            }}
          >
            {card.title}
          </div>
          <div
            style={{
              color: "#a5a5a5",
              display: "flex",
              fontSize: "25px",
              lineHeight: 1.45,
              maxWidth: "610px",
            }}
          >
            {card.description}
          </div>
          {card.date ? (
            <div
              style={{
                color: "#a5a5a5",
                display: "flex",
                fontSize: "17px",
                marginTop: "32px",
              }}
            >
              {card.date}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    socialImageSize,
  );
}
