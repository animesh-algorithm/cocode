import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <div className="flex flex-col md:flex-row mt-20">
        <div className="min-w-[50%] flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-6xl mb-0">
            Pair Up! <span className="gradient-text">Level Up!</span>
          </h1>
          <p className="text-2xl text-gray3 mt-[1.25em]">
            <span className="gradient-slide">
              Co
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Code
              </span>{" "}
            </span>
            connects you with developers for collaborative learning.
          </p>
          <Button
            asChild
            className="mt-[1.25em] bg-green-500 hover:bg-green-600 text-gray-100"
          >
            <Link href="/browse">Browse Rooms</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
