"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
          // redirect("/login"); --> this does not work in client components, this will work only in server components
          toast.success("Signed out successfully");
        },
      },
    });
  }

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
          <Button variant="destructive" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      ) : (
        <Button>Login</Button>
      )}
    </>
  );
}
