import Link from "next/link";
import { MotionDiv } from "../common/motion-wrapper"; // using MotionDiv as before

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-4 sm:grid-cols-2 text-sm text-gray-700">
        {/* Made By Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="col-span-1 flex flex-col items-start sm:items-center md:items-start"
        >
          <p className="text-gray-500">
            Made by{" "}
            <Link
              href="/"
              className="text-violet-600 font-medium hover:underline"
            >
              Ramana Kumar
            </Link>{" "}
            <span className="text-yellow-500 text-lg">🧡</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2025 Ramana Kumar. All Rights Reserved.
          </p>
        </MotionDiv>

        {/* About */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h4 className="font-semibold mb-2 text-gray-800">ABOUT</h4>
          <ul className="space-y-1">
            <li className="text-gray-700 font-medium">Contact:</li>
            <li>
              <a
                href="mailto:manupatiramanakumar123@gmail.com"
                className="hover:text-violet-600 break-all"
              >
                manupatiramanakumar123@gmail.com
              </a>
            </li>
          </ul>
        </MotionDiv>

        {/* Products */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h4 className="font-semibold mb-2 text-gray-800">PRODUCTS</h4>
          <ul className="space-y-1">
            <li>
              <Link href="#">Build Modern Full-Stack Apps</Link>
            </li>
            <li>
              <Link href="#">Next.js Workshop</Link>
            </li>
            <li>
              <Link href="#">Developer to Leader</Link>
            </li>
            <li>
              <Link href="#">Engineering Leader's Playbook</Link>
            </li>
          </ul>
        </MotionDiv>

        {/* Resources */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h4 className="font-semibold mb-2 text-gray-800">RESOURCES</h4>
          <ul className="space-y-1">
            <li>
              <Link href="#">Blog</Link>
            </li>
            <li>
              <Link href="#">Frontend Snacks Newsletter</Link>
            </li>
            <li>
              <Link href="#">Engineering Leader's Snacks</Link>
            </li>
            <li>
              <Link href="#">Free Course: Next.js Hot Tips</Link>
            </li>
          </ul>
        </MotionDiv>
      </div>
    </footer>
  );
}
