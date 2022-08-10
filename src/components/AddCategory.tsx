import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUserContext } from "../context/user.context"
import { trpc } from "../utils/trpc"
import { useTheme } from 'next-themes'
import { useForm } from "react-hook-form"
import { CreateCategoryInput } from "../schema/post.schema"
import { tailwindColors } from "../constants"

function AddCategory({ categories }: { categories: CreateCategoryInput[] | undefined }) {

    const router = useRouter()
    const [categoryColor, setCategoryColor] = useState("")

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
                <div className="flex flex-row p-10 align-middle g-5">
                    <label>
                        <input type="text" placeholder="category name" {...register('name')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" />
                    </label>
                    <label>
                        <select value={categoryColor} className={`p-3 ${categoryColor}`} {...register('color')} onChange={(e) => setCategoryColor(e.target.value)}>
                            <option value={tailwindColors[0]} className="bg-orange-500">orange</option>
                            <option value={tailwindColors[1]} className="bg-green-500">green</option>
                            <option value={tailwindColors[2]} className="bg-slate-500">slate</option>
                            <option value={tailwindColors[3]} className="bg-red-500">red</option>
                            <option value={tailwindColors[4]} className="bg-amber-100">amber</option>
                            <option value={tailwindColors[5]} className="bg-lime-500">lime</option>
                            <option value={tailwindColors[6]} className="bg-sky-500">sky</option>
                            <option value={tailwindColors[7]} className="bg-violet-500">violet</option>
                            <option value={tailwindColors[8]} className="bg-rose-400">rose</option>
                        </select>
                        {/* <input type="text" placeholder="category name" {...register('name')} className="bg - gray - 200 border border - gray - 100 rounded - md p - 3 focus: outline - none w - full" /> */}
                    </label>
                    <button type="submit" className="bg-gray-200 border border-gray-100 rounded-md w-20">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddCategory