import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import MagicLinkLoginForm from "./magic-link-login";
import OauthLoginForm from "./oauth-login";

export default function Login() {
  return (
    <div className="container">
      <div className="flex sm:justify-between md:justify-center gap-20 mt-10 md:p-8 h-fit sm:flex-row flex-col md:w-full w-fit">
        <div className="h-fit">
          <MagicLinkLoginForm />
        </div>
        <div className="hidden sm:flex flex-col space-y-1 items-center justify-center">
          <Separator orientation="vertical" className="h-20 bg-slate-500" />
          <span className="text-gray3">OR</span>
          <Separator orientation="vertical" className="h-20 bg-slate-500" />
        </div>
        <div className="sm:hidden relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="bg-slate-500" />
          </div>
          <div className="relative flex justify-center">
            <span className="text-gray3 bg-gray8 px-1.5">OR</span>
          </div>
        </div>
        <div className="flex flex-col sm:items-center sm:justify-center gap-4 items-start justify-start">
          <OauthLoginForm />
        </div>
      </div>
    </div>
  );
}
