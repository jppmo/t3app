import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"
//import CategorySelector from "../../components/CategorySelector"
import { trpc } from "../../utils/trpc"

interface PostData {
    id: String,
    title: String,
    body: String
    createdAt: Date,
    updatedAt: Date,
    userId: String
    category: {
        name: String
    }
}

function PostListingPage() {
    const { data, isLoading } = trpc.useQuery(['posts.posts'])
    const [selectedCategory, setSelectedCategory] = useState("")
    console.log(data);
    const CategorySelector = dynamic(() => import('../../components/CategorySelector'), {
        ssr: false
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    const posts = data ? data.filter((post: PostData, index: Number) => {
        if (selectedCategory) {
            if (selectedCategory === 'All') {
                return true
            }
            return post.category.name === selectedCategory
        }
        return true
    }) : []

    // handle category select
    const handleSelectCategory = (categoryName: string) => {
        setSelectedCategory(categoryName)
    }

    return (
        <div className="flex flex-col gap-6">
            <CategorySelector handleSelectCategory={handleSelectCategory} />
            <div className="flex flex-row flex-wrap gap-6 ml-10 justify-center">
                {posts?.map((post: PostData, index: Number) => {
                    return (
                        <article key={index.toString() + post.id.slice(0, 5)} className="flex flex-col flex-shrink-0 w-48 h-48 rounded-sm bg-slate-500 p-2 justify-between">
                            <div>
                                <p id="article-date" className="text-green-100">{post.createdAt.toDateString()}</p>
                                <h1 id="article-title" className="text-xl text-gray-50"><Link href={`/posts/${post.id}`}>{post.title}</Link></h1>
                            </div>
                            {/* <span className="text-sm">{`${post.body.length < 30 ? post.body : post.body.slice(0, 100)} ...`}</span> */}
                            {/* <span className="text-sm truncate ...">{post.body}</span> */}
                            <div>
                                <p id="article-category-name" className="text-xs text-amber-200">{post.category.name}</p>
                            </div>
                            {/* <Link href={`/posts/${post.id}`}>Read more</Link> */}
                        </article>
                    )
                })}
            </div>
        </div>
    )

}

export default PostListingPage