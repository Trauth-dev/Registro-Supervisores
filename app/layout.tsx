import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Registro de Supervisores - MEC Paraguay",
  description: "Sistema de registro para supervisores del Ministerio de Educación y Ciencias",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, user-scalable=yes, viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Critical CSS for immediate rendering - Android 10-11 compatible */
          *, *::before, *::after {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
          }
          html {
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 16px;
          }
          body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: #fafafa;
            color: #1a1a1a;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
          }
          /* Ensure content is visible while CSS loads */
          #__next, main {
            min-height: 100vh;
          }
          /* Force proper rendering on Samsung Internet */
          input, select, textarea, button {
            font-family: inherit;
            font-size: 16px;
          }
        `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={<div style={{ padding: "20px", textAlign: "center" }}>Cargando...</div>}>
          {children}
        </Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
