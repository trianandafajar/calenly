'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    console.error(error)

    return (
        <html>
            <body>
                <button onClick={() => window.location.reload()}>
                    Reload Page
                </button>
            </body>
        </html>
    )
}