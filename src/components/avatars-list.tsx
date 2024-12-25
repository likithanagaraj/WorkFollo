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
        <Avatar className="size-6 border-2 border-background">
          <AvatarImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT73hVuUFS5u6LDMnT3SCUvgQpxIHRkQrRMmA&s"
            alt="Avatar 02"
          />
          <AvatarFallback>A2</AvatarFallback>
        </Avatar>
        <Avatar className="size-6 border-2 border-background">
          <AvatarImage src="https://pbs.twimg.com/profile_images/1831143497748852736/pGaFNbfr_400x400.jpg" />
          <AvatarFallback>A3</AvatarFallback>
        </Avatar>
        <Avatar className="size-6 border-2 border-background">
          <AvatarImage
            src="https://github.com/user-attachments/assets/6162588b-8e33-45c2-aebf-4b8b2280b4a6"
            alt="Avatar 04"
          />
          <AvatarFallback>A4</AvatarFallback>
        </Avatar>
        <Avatar className="size-6 border-2 border-background">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/79694828?v=4"
            alt="Avatar 01"
          />
          <AvatarFallback>A1</AvatarFallback>
        </Avatar>
      </div>
      <p className="px-2 text-xs text-white">
        Trusted by <strong className="font-bold text-white">100+</strong>{" "}
        freelancers.
      </p>
    </div>
  );
}
