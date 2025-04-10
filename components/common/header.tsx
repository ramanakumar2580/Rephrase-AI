import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText
            className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform 
        transition duration-200 ease-in-out"
          />
          <span className="font-extrabold lg:text-xl text-gray-900">
            DocSift AI
          </span>
        </NavLink>
      </div>
      <div className="flex flex-1 justify-center gap-4 lg:gap-12 items-center">
        <NavLink href="/#Pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your summaries</NavLink>
        </SignedIn>
      </div>

      <div className="flex justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
