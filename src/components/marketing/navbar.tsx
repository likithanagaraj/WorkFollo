import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { NavMenu } from "./nav-menu";
import Logo from "../logo";

const Navbar1 = () => {
  return (
    <header className="py-3 flex justify-between px-5 md:px-16 items-center  z-50">
      <div>
        <Logo full className="flex-row"  textClassName="text-lg" width={40} />
      </div>
      <NavMenu className="hidden md:block z-50" />
      {/* <nav className="text-foreground/70 text-sm sm:flex gap-4 hidden">
        <Link href={"#"} className="hover:text-foreground hover:scale-105">
          Features
        </Link>
        <Link href={"#"} className="hover:text-foreground hover:scale-105">
          Join Waitlist!
        </Link>
        <Link href={"#"} className="hover:text-foreground hover:scale-105">
          Roadmap
        </Link>
      </nav> */}
      <div className="sm:flex  hidden gap-2">
        {/* <Link href={"#"}>
          <Button variant={"secondary"}>Login</Button>
        </Link> */}
        <Link href="/app" className="z-50 ">
          <Button className="z-40 " variant={"default"}>
            Get Started <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </div>
      <div className="md:hidden">
        <Sheet key={"left"}>
          <SheetTrigger>
            <GiHamburgerMenu size={32} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>UnicornSpace</SheetTitle>
              <SheetDescription className="flex flex-col justify-between h-[85vh]">
                <nav className="text-foreground/70 flex flex-col space-y-2 mt-10">
                  <Link href={"#"}>Features</Link>
                  <Link href={"#"}>Pricing</Link>
                  <Link href={"#"}>Roadmap</Link>
                </nav>
                <div className="flex gap-5 justify-center">
                  <Button variant={"outline"}>Login</Button>
                  <Button>Get started</Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar1;
