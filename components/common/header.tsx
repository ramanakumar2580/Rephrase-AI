import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./plan-badge";
import { MotionDiv } from "../common/motion-wrapper";

export default function Header() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-2 lg:px-8 py-4 flex flex-col gap-3"
    >
      {/* Top Row: Logo + Upload/Badge */}
      <div className="flex w-full items-center justify-between">
        {/* Left: Logo */}
        <MotionDiv
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-2"
        >
          <NavLink href="/" className="flex items-center gap-1 lg:gap-2">
            <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900" />
            <span className="font-extrabold lg:text-xl text-gray-900">
              DocSift AI
            </span>
          </NavLink>
        </MotionDiv>

        {/* Right: Upload & User */}
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <SignedIn>
            <NavLink href="/upload">Upload a PDF</NavLink>
            <PlanBadge />
            <UserButton />
          </SignedIn>
          <SignedOut>
            <NavLink href="/sign-in">Sign In</NavLink>
          </SignedOut>
        </MotionDiv>
      </div>

      {/* Middle Row: Navigation */}
      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center gap-6 lg:gap-12 items-center w-full"
      >
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your summaries</NavLink>
        </SignedIn>
      </MotionDiv>
    </MotionDiv>
  );
}
