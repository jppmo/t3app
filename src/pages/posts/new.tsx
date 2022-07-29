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

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
)

function CreatePostPage() {

    //const [value, setValue] = useState("**Hello world!!!**")
    const [value, setValue] = useState(`
    While creating this blog using the t3 stack, I figured it could be useful to document the process of setting up, accessing and making changes to a postgres database running on a docker container. 


----------

If you're using the windows subsystem for linux, go to Docker Desktop settings , turn on WSL integration and choose the distro you have installed. I'm assuming the environment is all setup (docker is installed and using ubuntu with wsl)

# Step 1 

Run 

\`\`\`bash  
docker ps
\`\`\`



to make sure our image is up and running, if not just press the play button on Docker Desktop.

Now we need to create a user so we can connect to the db

\`\`\`bash  
docker run --name my-postgres -p 5432:5432 -e POSTGRES_PASSWORD=yourpassword -d postgres 
\`\`\`

This command will create a user for our postgres image (named "my-postgres" in this case) on ports 5432:5432 with a password of "yourpassword". This will be useful if you want to integrate this db with prisma or some other ORM.

# Step 2

Let's connect to our container logging in as root

\`\`\`bash 
docker exec -it 64ea9947646d5240557a7d0fb3dbc09737977662c49fd266c049d385c8f7f02d /bin/bash
\`\`\`

To enter postgres cli:


> psql -U postgres

# Step 3 

Step 3 is going to be a collection of simple postgres commands.

A single postgres server can handle multiple databases at the same time, it gets useful to know which databases we have available on the server throught the **\list** 
meta-command that can be abbreviated to:

\`\`\`bash
postgres=# \l
\`\`\`

After the db listing we can select one and connect to it with the **\connect <yourdb\>** comand or in my case:

\`\`\`bash
postgres=# \c mydb
\`\`\`

Finally we can list all tables with 

\`\`\`bash
postgres=# \dt
\`\`\`

and describe each table using:

\`\`\`bash
postgres=# \d+ "<table_name>"
\`\`\`


# Notes

This post is going to serve as draft for future posts of this format, the goal is to keep these posts stored in a nice and useful way so future me can come here and consolidate all the things I learn and know
    `)
    const { handleSubmit, register } = useForm<CreatePostInput>()
    const router = useRouter()
    const user = useUserContext()

    if (!user) {
        router.push("/")
    }

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
                            data.map((cat) => {
                                return (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
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