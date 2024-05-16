import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className={"p-4"}>
      <div>{session && session.user && session.user.name}</div>
      <SignOutButton />
    </div>
  );
}
