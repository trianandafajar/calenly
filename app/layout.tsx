import { Toaster } from "react-hot-toast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#16a34a",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "#fff",
              },
            },
          }} />
        <main>{children}</main>
      </body>
    </html>
  )
}