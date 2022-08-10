import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import "@uiw/react-markdown-preview/markdown.css";
/* import MarkdownPreview from "@uiw/react-markdown-preview"; */
import dynamic from "next/dynamic";


/* const MarkdownPreview = dynamic(
    () => import("@uiw/react-markdown-preview"),
    { ssr: false }
)
 */

const MarkdownPreview = dynamic(
    () => import("@uiw/react-markdown-preview"),
    { ssr: false }
)

function SinglePostPage() {
    const router = useRouter()
    const postId = router.query.postId as string

    const { data, isLoading } = trpc.useQuery(['posts.single-post', { postId }])


    if (isLoading) {
        return <p>Loading post...</p>
    }

    if (!data) {
        return <Error statusCode={404} />
    }

    return (
        <div className="flex justify-center px-20 flex-wrap flex-shrink">
            <div className="flex flex-col">
                <h1 className="text-4xl my-8">{data?.title}</h1>

                <MarkdownPreview
                    className=""
                    style={{ maxWidth: "800px", minWidth: "0" }}
                    source={`${data?.body}`}
                />
            </div >
        </div >
    )
}

export default SinglePostPage