import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import logo from '@/public/logo.png';
import Image  from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-svh items-center justify-center">
      <Link href="/" className={buttonVariants(
        {
            variant: "outline",
            className: "absolute left-4 top-4 md:left-8 md:top-8"
        }
      )}>
        <ArrowLeft />
        Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center self-center font-medium">
          <Image src={logo} alt="Logo" width={32} height={32} />
          EduX
        </Link>
        {children}
        <div className=" text-sm text-muted-foreground">
            By clicking continue, you agree to our <span className="underline text-blue-300/70 cursor-pointer">Terms of Service</span> and <span className="underline text-blue-300/70 cursor-pointer">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}
