import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

export default function Header() {
  const isLoggedIn = false;
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
        {isLoggedIn && <NavLink href="/#dashboard">Your summaries</NavLink>}
      </div>

      <div className="flex justify-end">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/">Upload a PDF</NavLink>
            <div>Pro</div>
            <Button>Sign Out</Button>
          </div>
        ) : (
          <div>
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
