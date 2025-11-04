import Header from "@/components/header";
import Todos from "@/components/todos";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <main>
      <Header email={session.user.email} />
      <Todos />
    </main>
  );
}
