import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <div className="flex flex-col mt-20">
        <div className="min-w-[50%] flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-5xl md:text-6xl mb-0">
            Pair Up!{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Level Up!
            </span>
          </h1>
          <p className="text-2xl text-gray2 mt-[1.25em]">
            <span className="gradient-slide">
              Co
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Code
              </span>{" "}
            </span>
            connects you with developers for collaborative learning.
          </p>
          <div className="mt-[1.75em] flex gap-4 md:flex-row flex-col">
            <Button
              asChild
              className=" bg-green-500 hover:bg-green-600 text-gray-100"
            >
              <Link href="/browse">Browse Rooms</Link>
            </Button>
            <Button
              asChild
              className="text-gray-100 bg-blue-400 hover:bg-blue-500"
            >
              <Link
                href="https://github.com/animesh-algorithm/cocode"
                target="_blank"
              >
                ⭐ Star on Github
              </Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full"></div>
      </div>
    </main>
  );
}
