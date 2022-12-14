import { createCategoriesSchema, createPostSchema, getSinglePostSchema } from "../../schema/post.schema";
import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { createContext } from "vm";

export const postRouter = createRouter()
    .mutation('create-post', {
        input: createPostSchema,
        async resolve({ ctx, input }) {
            if (!ctx.user) {
                new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Can not create a post while logged out'
                })
            }

            console.log(input);

            const post = await ctx.prisma.post.create({
                data: {
                    ...input,
                    user: {
                        connect: {
                            id: ctx.user?.id
                        }
                    },
                    category: {
                        connect: {
                            id: input.category
                        }
                    }
                }
            })

            return post
        }
    })
    .mutation('create-category', {
        input: createCategoriesSchema,
        async resolve({ ctx, input }) {
            if (!ctx.user) {
                new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Can not create a category while logged out'
                })
            }

            const category = await ctx.prisma.category.create({
                data: {
                    ...input
                }
            })

            return category
        }
    })
    .query('posts', {
        resolve({ ctx }) {

            return ctx.prisma.post.findMany({
                include: {
                    category: true
                }
            })
        }
    })
    .query('single-post', {
        input: getSinglePostSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.post.findUnique({
                where: {
                    id: input.postId
                }
            })
        }
    })
    .query('get-categories', {
        resolve({ ctx }) {
            return ctx.prisma.category.findMany()
        }
    })