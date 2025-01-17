import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Logo from "../logo";

const BasicFooter = () => {
  return (
    <footer className="z-10  py-10 flex px-5 md:px-10 justify-between items-center border-t-2 border-white/20">
      <section className="space-y-1">
        <Logo  full className="flex-row" width={35} />
        <p className="text-xs opacity-80 ml-5">© 2025 UnicornSpace, Inc.</p>
      </section>
      <section className="flex gap-3 items-center">
        <Link href={""}>
          <GitHubLogoIcon className="size-7" />
        </Link>
        <Link href={""}>
          <FaXTwitter className="size-7" />
        </Link>
      </section>
    </footer>
  );
};

export default BasicFooter;
