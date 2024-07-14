import Link from "next/link";
import { auth } from "../_libs/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li className="flex items-center justify-center gap-1">
          {session?.user?.image ? (
            <>
              <img src={session.user.image} className="rounded-full w-8" />
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                Guest area
              </Link>
            </>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
