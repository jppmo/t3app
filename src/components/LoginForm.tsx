import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { CreateUserInput } from "../schema/user.schema"
import { trpc } from "../utils/trpc"

function VerifyToken({ hash }: { hash: string }) {

    const router = useRouter()
    const { data, isLoading } = trpc.useQuery(['users.verify-otp', {
        hash
    }])
    if (isLoading) {
        return <p>Verifying...</p>

    }

    router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/")
    return <p>Redirecting...</p>
}

function LoginForm() {

    const { handleSubmit, register } = useForm<CreateUserInput>()
    const router = useRouter()
    const [success, setSuccess] = useState(false)

    const { mutate, error } = trpc.useMutation(['users.request-otp'], {
        onSuccess: () => {
            setSuccess(true)
        }
    })

    function onSubmit(values: CreateUserInput) {
        mutate({ ...values, redirect: router.asPath })
    }

    const hash = router.asPath.split('#token=')[1]

    if (hash) {
        return <VerifyToken hash={hash} />
    }

    return <div className="container mx-auto max-w-md my-16">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-sm rounded-md border-2 border-solid grid">
            {error && error.message}
            {success && <p>Check your email!</p>}

            <div className="p-10">
                <h1 className="text-3xl font-bold my-3">Login</h1>
                <br />
                <label>
                    <span>email:</span>
                    <input type="email" placeholder="jane.doe@example.com" {...register('email')} className="bg-gray-200 border border-gray-100 rounded-md p-3 focus:outline-none w-full" />
                </label>
                <button type="submit" className="bg-gray-200 border border-gray-100 rounded-md p-4 w-full my-3">Login</button>
            </div>
        </form>

        <Link href="/register">Register</Link>
    </div>
}


export default LoginForm