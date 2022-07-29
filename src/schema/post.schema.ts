import z from 'zod'


export const createPostSchema = z.object({
    title: z.string().max(256, "Max title length is 256"),
    body: z.string().min(10),
    category: z.string().max(37, "Max category length is 37"),
})

export type CreatePostInput = z.TypeOf<typeof createPostSchema>

export const getSinglePostSchema = z.object({
    postId: z.string().uuid(),
})

export const createCategoriesSchema = z.object({
    name: z.string().max(30),
})

export type CreateCategoryInput = z.TypeOf<typeof createCategoriesSchema>
