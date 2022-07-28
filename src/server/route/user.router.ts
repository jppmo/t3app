import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { createUserOutputSchema, createUserSchema, requestOtpSchema, verifyOtpSchema } from "../../schema/user.schema";
import { sendLoginEmail } from "../../utils/mailer";
import { createRouter } from "../createRouter";
import { baseUrl } from '../../constants'
import { encode, decode } from "../../utils/base64";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";
import { log } from "console";

export const userRouter = createRouter()
    .mutation('register-user', {
        input: createUserSchema,
        resolve: async ({ ctx, input }) => {
            const { email, name } = input

            try {

                const user = await ctx.prisma.user.create({
                    data: {
                        email, name
                    }
                })

                return user
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'User already exists'
                        })
                    }
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong'
                })
            }
        }
    })
    .mutation('request-otp', {
        input: requestOtpSchema,
        resolve: async ({ ctx, input }) => {
            const { email, redirect } = input

            try {

                const user = await ctx.prisma.user.findUnique({
                    where: {
                        email,
                    }
                })

                if (!user) {
                    throw new trpc.TRPCError({
                        code: 'NOT_FOUND',
                        message: 'User not found'
                    })
                }

                const token = await ctx.prisma.loginToken.create({
                    data: {
                        redirect,
                        user: {
                            connect: {
                                id: user.id,
                            }
                        }
                    }
                })

                //send email to user
                sendLoginEmail({
                    token: encode(`${token.id}:${user.email}`),
                    url: baseUrl,
                    email: user.email,
                })

                return true
            } catch (e) {
                /* if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'User already exists'
                        })
                    }
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong'
                }) */
            }
        }
    })
    .mutation('logout-user', {
        resolve: async ({ ctx }) => {

            try {

                ctx.prisma.loginToken.deleteMany({
                    where: {
                        userId: ctx.user?.id
                    }
                })

                ctx.res.setHeader('Set-Cookie', serialize('token', '', { path: "/" }))

                return true
            } catch (e) {
            }
        }
    })
    .query('verify-otp', {
        input: verifyOtpSchema,
        async resolve({ input, ctx }) {

            const decoded = decode(input.hash).split(":")
            const [id, email] = decoded
            console.log(decoded);

            const token = await ctx.prisma.loginToken.findFirst({
                where: {
                    id,
                    user: {
                        email,
                    }
                },
                include: {
                    user: true
                }
            })

            if (!token) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Invalid token'
                })
            }

            const jwt = signJwt({
                email: token.user.email,
                id: token.user.id
            })

            ctx.res.setHeader('Set-Cookie', serialize('token', jwt, { path: "/" }))

            return {
                redirect: token.redirect
            }
        }
    })
    .query("me", {
        resolve({ ctx }) {
            return ctx.user
        }
    })