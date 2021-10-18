import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user?.image}
        alt="profile"
        className="w-16 h-16 rounded-full border p-[2px]"
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h1 className="text-sm text-gray-400">Welcome To instagram</h1>
      </div>
      <button onClick={signOut} className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
