import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-daydream">404 - Not Found</h2>
            <p className="mb-8 text-muted-foreground font-panara">The page you are looking for does not exist.</p>
            <Link href="/" className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-panara">
                Return Home
            </Link>
        </div>
    )
}
