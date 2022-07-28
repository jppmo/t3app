import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { CreateUserInput } from "../schema/user.schema"
import { trpc } from "../utils/trpc"

function RegisterPage() {

    const { handleSubmit, register } = useForm<CreateUserInput>()
    const router = useRouter()

    const { mutate, error } = trpc.useMutation(['users.register-user'], {
        onSuccess: () => {
            router.push("/login")
        }
    })

    function onSubmit(values: CreateUserInput) {
        mutate(values)
    }
    return (
        <div className="w-screen flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-sm rounded-md border-2 border-solid grid">
                {error && error.message}
                <div className="p-10">
                    <h1 className="text-3xl font-bold my-3">Register</h1>
                    <label>
                        <span>email:</span>
                        <input type="email" placeholder="jane.doe@example.com" {...register('email')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" />
                    </label>

                    <br />
                    <label>
                        <span>name:</span>
                        <input type="text" placeholder="Tom" {...register('name')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" />
                    </label>
                    <button type="submit" className="bg-gray-200 border border-gray-100 rounded-md p-4 w-full my-3">Register</button>
                </div>
            </form>

            <Link href="/login">Login</Link>
        </div>
    )
}


export default RegisterPage