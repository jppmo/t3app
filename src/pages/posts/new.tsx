import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/user.context"
import { CreatePostInput } from "../../schema/post.schema"
import { trpc } from "../../utils/trpc"
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
)

function createPostPage() {

    const [value, setValue] = useState("**Hello world!!!**");
    const { handleSubmit, register } = useForm<CreatePostInput>()
    const router = useRouter()
    const user = useUserContext()

    if (!user) {
        router.push("/")
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-sm rounded-md border-2 border-solid grid">
            {error && error.message}
            <div className="p-10 flex flex-col justify-between">
                <h1 className="text-3xl font-bold my-3">Create Posts</h1>
                <label>
                    <span>title:</span>
                    <input type="text" placeholder="Your post title" {...register('title')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" />
                </label>

                <div>
                    <MDEditor role="textbox" value={value} onChange={onChangeMd} />
                </div>
                {/* <span>body:</span>
                    <textarea placeholder="Your post title" {...register('body')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" /> */}

                <button className="bg-gray-200 border border-gray-100 rounded-md p-4 w-full my-3">Create Post</button>
            </div>
        </form>
    </div>
}

export default createPostPage