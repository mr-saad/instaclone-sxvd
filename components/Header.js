import React from "react";
import Image from "next/image";
import {
  HeartIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";

import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modelState } from "../atoms/modelAtom";

const Header = () => {
  const { data: session } = useSession();

  const [open, setOpen] = useRecoilState(modelState);

  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* left */}

        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid  w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/OCW"
            objectFit="contain"
            layout="fill"
          />
        </div>

        <div className="relative lg:hidden flex-shrink-0  w-10 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            objectFit="contain"
            layout="fill"
          />
        </div>

        {/* middle -search field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-0 outline-none focus:border-gray-300"
            />
          </div>
        </div>

        {/* right */}
        <div className="flex items-center space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push("/")} />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">
                  3
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />

              <UserGroupIcon className="navBtn" />

              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session.user.image}
                className="h-10 rounded-full cursor-pointer hidden md:block"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
