import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Cta2() {
  return (
    <header className="flex items-center justify-center h-96">
      <div className=" pt-16 lg:col-span-7 lg:bg-transparent lg:pt-0 lg:pl-16 xl:pl-20 ">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0 ">
          <h1 className="font-display text-4xl font-extrabold text-slate-900 sm:text-6xl">
            Now is the time to start.
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            A book and video course that teaches you how to design your own
            icons from scratch.
          </p>
          <div className="flex items-center mt-10">
            <Input placeholder="Enter your email" />

            <Button className="font-semibold   text-lg" variant={"default"}>
              Join waitlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Cta2;
