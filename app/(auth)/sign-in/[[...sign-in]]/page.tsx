import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <SignIn />
        </div>
    )
}