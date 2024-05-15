import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log('session', session);

    return (
        <div>
            {session && session.user && <SignOutButton />}
            <LoginForm/>
            <Link
                href="api/auth/login"
                className="text-grey-dark text-sm no-underline hover:text-grey-darker"
            >
                I already have an account
            </Link>
        </div>
    );
}
