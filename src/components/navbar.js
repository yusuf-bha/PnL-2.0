import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function navbar() {
  return (
    <>
      <nav className="w-full h-60px flex items-center relative py-2 bg-gray-400 text-black shadow-md">
        <p className="ml-4 text-2xl no-underline">PnL</p>
        <div className="ml-auto">
          <ul className="flex">
            <li className="list-none mx-4">About</li>
            <li className="list-none mx-4">Contact</li>
            <Link className="mx-4" href="/history">History</Link>
            <UserButton className="mx-8" afterSignOutUrl="/"/>
          </ul>
        </div>
      </nav>
    </>
  )
}
