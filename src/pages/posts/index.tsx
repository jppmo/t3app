import Link from "next/link"
import { trpc } from "../../utils/trpc"

function PostListingPage() {
    const { data, isLoading } = trpc.useQuery(['posts.posts'])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-row flex-wrap gap-6 ml-10 justify-center">
            {data?.map(post => {
                return (
                    <article key={post.id} className="flex flex-col flex-shrink-0 w-48 h-48 rounded-sm bg-slate-500 p-2 justify-between">
                        <div>
                            <p className="text-green-100">{post.createdAt.toDateString()}</p>
                            <h1 className="text-xl text-gray-50"><Link href={`/posts/${post.id}`}>{post.title}</Link></h1>
                        </div>
                        {/* <span className="text-sm">{`${post.body.length < 30 ? post.body : post.body.slice(0, 100)} ...`}</span> */}
                        {/* <span className="text-sm truncate ...">{post.body}</span> */}
                        <div>
                            <p className="text-xs text-gray-50">category</p>
                        </div>
                        {/* <Link href={`/posts/${post.id}`}>Read more</Link> */}
                    </article>
                )
            })}
        </div>
    )

}

export default PostListingPage