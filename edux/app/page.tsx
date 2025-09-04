import { ThemeToggle } from "@/components/ui/themeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold my-5 text-blue-400">Hello world</h1>
      <ThemeToggle />
    </>
  );
}
