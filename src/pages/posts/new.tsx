import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/user.context"
import { CreatePostInput } from "../../schema/post.schema"
import { trpc } from "../../utils/trpc"
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AddCategory from "../../components/AddCategory"
import { draftMarkdown } from "../../constants"

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
)

interface CategoryData {
    id: string,
    name: string,
    color: string
}

function CreatePostPage() {

    //const [value, setValue] = useState("**Hello world!!!**")
    const [value, setValue] = useState(draftMarkdown)
    const { handleSubmit, register } = useForm<CreatePostInput>()
    const router = useRouter()
    const user = useUserContext()

    if (!user) {
        router.push("/")
    }

    const AddCategory = dynamic(() => import('../../components/AddCategory'), {
        ssr: false
    })

    const { data, isLoading } = trpc.useQuery(['posts.get-categories'], {
        onSuccess() {
            console.log(data);
        },
    })

    const { mutate, error } = trpc.useMutation(['posts.create-post'], {
        onSuccess({ id }) {
            router.push(`/posts/${id}`)
        }
    })

    function onSubmit(values: CreatePostInput) {
        console.log(values);
        values.body = value
        mutate(values)
    }

    function onChangeMd(value?: string) {
        if (value) {
            setValue(value)
        }
    }

    /* useEffect(() => {
        register('body', { value })
        console.log(value)
        return () => {

        }
    }, [value]) */


    return <div className="w-screen my-16">

        <AddCategory categories={data} />
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-sm rounded-md border-2 border-solid grid">
            {error && error.message}
            <div className="p-10 flex flex-col justify-between">
                <h1 className="text-3xl font-bold my-3">Create Posts</h1>
                <label>
                    <span className="mx-3">title:</span>
                    <input type="text" placeholder="Your post title" {...register('title')} className="bg-gray-200 border border-gray-100 rounded-md p-3 w-1/3 focus:outline-none" />
                </label>
                <div className="my-3"></div>
                <label>
                    <span className="mx-3">category:</span>
                    {data && <select {...register('category')}>
                        {
                            data.map((cat: CategoryData, index: Number) => {
                                return (
                                    <option key={index.toString()} value={cat.id}>{cat.name}</option>
                                )
                            })
                        }
                    </select>}
                </label>
                <div className="my-3"></div>
                <div>
                    <MDEditor role="textbox" value={value} onChange={onChangeMd} height={1200} />
                </div>
                {/* <span>body:</span>
                    <textarea placeholder="Your post title" {...register('body')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" /> */}

                <button className="bg-gray-200 border border-gray-100 rounded-md p-4 w-full my-3">Create Post</button>
            </div>
        </form>
    </div>
}

export default CreatePostPage