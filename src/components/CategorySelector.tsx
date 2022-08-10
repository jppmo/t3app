import { trpc } from "../utils/trpc"

interface CategoryData {
    id: string,
    name: string,
    color: string
}

function CategorySelector({ handleSelectCategory }: { handleSelectCategory: (name: string) => void }) {

    const { data, isLoading } = trpc.useQuery(['posts.get-categories'])


    if (isLoading) {
        return <p>Loading categories...</p>
    }

    /* const filteredPosts = data ? data.filter((category: CategoryData) => {
        return category.name === selectedCategory
    }) : []

    console.log("POSTS", filteredPosts); */

    return (
        <div className="flex flex-col items-center gap-5">
            <div className="flex items-center">
                <h1 className="text-3xl">All Posts</h1>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-row gap-2">
                    {data && data.map((category: CategoryData) => {
                        return (
                            <span key={category.id} onClick={() => handleSelectCategory(category.name)} className={`${category.color} rounded-xl p-1 text-black`}>{category.name}</span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategorySelector
