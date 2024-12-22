import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function AvatarList({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-fit items-center rounded-full border border-border bg-primary/80 p-1 shadow shadow-black/5",
        className
      )}
    >
      <div className="flex -space-x-2 w-fit">
        <Avatar className="size-8 border-2 border-background">
          <AvatarImage src="https://avatars.githubusercontent.com/u/79694828?v=4" alt="Avatar 01" />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 border-2 border-background">
          <AvatarImage src="https://avatars.githubusercontent.com/u/79694828?v=4" alt="Avatar 02" />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 border-2 border-background">
          <AvatarImage src="https://avatars.githubusercontent.com/u/79694828?v=4" alt="Avatar 03" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 border-2 border-background">
          <AvatarImage src="https://avatars.githubusercontent.com/u/79694828?v=4" alt="Avatar 04" />
          <AvatarFallback>A4</AvatarFallback>
        </Avatar>
      </div>
      <p className="px-2 text-xs text-foreground/70">
        Trusted by <strong className="font-medium text-foreground">60K+</strong>{" "}
        developers.
      </p>
    </div>
  );
}
