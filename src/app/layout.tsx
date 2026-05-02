import type { Metadata, Viewport } from "next";
import Providers from "@/components/shared/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "타임레시피 | Time Recipe",
  description: "시간 예측력을 훈련하는 사부작 감성 생산성 타이머",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "타임레시피",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FF6B35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/neodgm/neodgm-webfont@1.530/neodgm/style.css"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-base text-neutral antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
