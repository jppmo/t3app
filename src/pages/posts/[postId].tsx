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
        <div className="w-screen flex justify-center">
            <div>
                <h1 className="text-4xl">{data?.title}</h1>
                <div className="container">
                    <div data-color-mode="dark">
                        <div className="wmde-markdown-var"></div>
                        <MarkdownPreview
                            source={`${data?.body}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage