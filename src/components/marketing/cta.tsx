import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GiHappySkull } from "react-icons/gi";
import { Shapes } from "../shapes";
import { Zap } from "lucide-react";
import Link from "next/link";

export function Cta2() {
  return (
    <section className="flex items-center justify-center h-96">
      <div className=" pt-16 lg:col-span-7 lg:bg-transparent lg:pt-0 lg:pl-16 xl:pl-20 ">
        <div className="mx-auto px-4 sm:px-6 relative md:max-w-3xl md:px-4 lg:px-0 ">
          <Shapes.CrownHappy className="" />
          {/* <glow className="absolute right-0 size-10 rotate-12 -top-10"/> */}
          {/* <Light */}
          <h1 className="text-center">Boost your management, grow.</h1>
          <p className="mt-4 text-xl text-foreground text-center">
            Don{`'`}t waste time on manual management or hiring a manager...
          </p>
          <Link href={"/signin"} className="flex items-center mt-8">
            <Button className="font-semibold hover:shadow-2xl mx-auto" size={"lg"} variant={"default"}>
              I want this tool <Zap />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cta2;
