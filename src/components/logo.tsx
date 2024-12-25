import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({
  full = false,
  width = 100,
  height = 100,
  link = true,
  className,
  textClassName,
}: {
  full?: boolean;
  link?: boolean;
  width?: number;
  height?: number;
  className?: string;
  textClassName?: string;
}) => {
  if (link)
    return (
      <Link
        href={"/"}
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <Image
          src={"/logo-base-256x256.png"}
          width={width}
          height={height}
          alt="logo"
        />
        {full && (
          <h3 className={cn("font-medium text-2xl", textClassName)}>
            FreelanceFlow
          </h3>
        )}
      </Link>
    );
  else
    return (
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        <Image
          src={"/logo-base-256x256.png"}
          width={width}
          height={height}
          alt="logo"
        />
        {full && <h2 className="font-medium text-2xl">FreelanceFlow</h2>}
      </div>
    );
};

export default Logo;
