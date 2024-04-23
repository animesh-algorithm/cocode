import { LogIn, SearchIcon } from "lucide-react";
import Link from "next/link";
import { getAuthenticatedUser } from "../../app/(auth)/login/actions";
import UserAvatar from "../shared/avatar";
import { getUserById } from "@/lib/supabase/data/users";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Search from "../modals/search";

export default async function Header() {
  const user: any = await getAuthenticatedUser();
  let userData: any = null;
  if (user) userData = await getUserById(user.id);

  return (
    <header className="flex justify-between container p-4 md:p-6">
      <Link
        href="/"
        className="flex justify-center items-center text-center"
        id="logo"
      >
        <h2 className="text-3xl font-bold gradient-slide">
          Co
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Code
          </span>
        </h2>
      </Link>
      <ul className="flex justify-center items-center">
        <li className="mx-2 md:mx-4 hover:scale-105 transition-transform">
          <Link
            href="/browse"
            className="text-xl font-bold leading-none text-gray2 gradient-slide"
          >
            explore
          </Link>
        </li>
        <li className="mx-2 md:mx-4 hover:scale-105 transition-transform">
          {user && (
            <Link
              href={`/${userData.username}/rooms`}
              className=" text-xl font-bold leading-none text-gray2 gradient-slide"
            >
              my rooms
            </Link>
          )}
        </li>
        <li className="ml-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="hidden sm:flex">
                <Search>
                  <div className="p-2 mr-2 hidden md:flex justify-between items-center bg-white bg-opacity-10 hover:bg-opacity-20 border border-gray4 hover:border-purple-500 shadow-xl hover:drop-shadow-sm transition-all rounded">
                    <span className="text-gray2 px-2">
                      <SearchIcon />
                    </span>

                    <span className="mr-12">search</span>

                    <span className="mx-2 text-xs border border-gray4 rounded-md p-1 px-2">
                      /
                    </span>
                  </div>
                </Search>
              </TooltipTrigger>
              <TooltipContent className="bg-gray5">
                <p className="font-sans">
                  Search rooms or filter by keywords such as typescript, nextjs
                  etc.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <button className="flex md:hidden">
            <SearchIcon />
          </button>
        </li>
        <li className="ml-2 mr-6 relative">
          {user ? (
            <Link href={`/${userData.username}`}>
              <UserAvatar user={user} />
            </Link>
          ) : (
            <Link href="/login">
              <button className="relative hidden md:inline-block px-4 py-2 text-xl text-black hover:text-white bg-white hover:bg-purple-600 drop-shadow-[6px_6px_0_black] hover:drop-shadow-[0_0_7px_rgba(168,85,247,0.5)] transition-all duration-300">
                LOGIN
              </button>
              <button className="flex md:hidden">
                <LogIn />
              </button>
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}
