import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/user.context"
import { CreatePostInput } from "../../schema/post.schema"
import { trpc } from "../../utils/trpc"

function createPostPage() {

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
        mutate(values)
    }

    return <div className="container mx-auto max-w-md my-16">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-sm rounded-md border-2 border-solid grid">
            {error && error.message}
            <div className="p-10">
                <h1 className="text-3xl font-bold my-3">Create Posts</h1>
                <label>
                    <span>title:</span>
                    <input type="text" placeholder="Your post title" {...register('title')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" />
                </label>

                <label>
                    <span>body:</span>
                    <textarea placeholder="Your post title" {...register('body')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" />
                </label>
                <button className="bg-gray-200 border border-gray-100 rounded-md p-4 w-full my-3">Create Post</button>
            </div>
        </form>
    </div>
}

export default createPostPage