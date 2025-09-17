"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SelectSeparator } from "@/components/ui/select";
import { Github, icons, Loader } from "lucide-react";
import React, { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const LoginPage = () => {
  const [githubPending, startGithubTransition] = useTransition();

  async function signInWithGithub() {
    startGithubTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              console.log("success");
              toast.success("Logged in successfully");
            },
            onError: (e) => {
              console.log("error", e);
              toast.error(e.error.message);
            },
          },
        });
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  }

  return (
    <Card className="px-4">
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>
          Login with your github or email account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          variant={"outline"}
          className="w-full cursor-pointer"
        >
          {githubPending ? (
            <>
            <Loader className="size-5 animate-spin" />
            <span>Loading....</span>
            </>
          ) : (
            <>
              <Github className="size-5" />
              Login with Github
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email" className="mb-1 mt-4">
              Email
            </Label>
            <Input id="email" type="email" placeholder="jim@example.com" />
          </div>
          <Button className="w-full">Continue with Email</Button>
        </div>
        {/* <SelectSeparator className="my-4" /> */}
      </CardContent>
    </Card>
  );
};

export default LoginPage;
