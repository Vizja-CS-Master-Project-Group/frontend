import { getServerSession } from "next-auth";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className={"p-4"}>
      <div>{session && session.user && session.user.name}</div>
      <SignOutButton />
    </div>
  );
}
