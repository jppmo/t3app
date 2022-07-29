import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUserContext } from "../context/user.context"
import { trpc } from "../utils/trpc"
import { useTheme } from 'next-themes'
import { Category } from "@prisma/client"
import { useForm } from "react-hook-form"
import { CreateCategoryInput } from "../schema/post.schema"

function AddCategory({ categories }: { categories: Category[] | undefined }) {

    const router = useRouter()

    const { mutate, error } = trpc.useMutation(['posts.create-category'], {
        onSuccess({ id }) {
            console.log("category created with id " + id)
            router.reload()
        }
    })

    const { handleSubmit, register } = useForm<CreateCategoryInput>()


    console.log(categories);


    function onSubmit(values: CreateCategoryInput) {
        mutate(values)
    }



    return (
        <div className="w-auto mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-sm rounded-md border-2 border-solid p-10">
                <h1 className="text-3xl font-bold my-3">Create a category</h1>
                {error && error.message}
                <div className="flex flex-row p-10 align-middle">
                    <label>
                        <input type="text" placeholder="category name" {...register('name')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" />
                    </label>
                    <button type="submit" className="bg-gray-200 border border-gray-100 rounded-md w-20">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddCategory