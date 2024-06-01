import { getServerSession, Session } from "next-auth";
import authOptions from "@/lib/authOptions";

export default async function (): Promise<Session | null> {
  return getServerSession(authOptions);
}
