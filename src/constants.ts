export const baseUrl = process.env.VERCEL_URL
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}:3000`
    : 'http://localhost:3000'

export const url = `${baseUrl}/api/trpc`