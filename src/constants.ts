export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

export const url = `${baseUrl}/api/trpc`