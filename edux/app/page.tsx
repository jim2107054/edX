import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <h1 className="text-4xl font-bold my-5 text-blue-400">Hello world</h1>
      <ThemeToggle />
      {session ? (
        <div>
          <h2 className="text-2xl font-semibold">You are logged in</h2>
          <p className="my-2">User ID: {session.user.id}</p>
          <p className="my-2">Name: {session.user.name}</p>
          <p className="my-2">Email: {session.user.email}</p>
        </div>
      ) : (
        <Button>
          Login
        </Button>
      )}
    </>
  );
}
