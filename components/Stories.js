import React, { useEffect, useState } from "react";
import faker from "faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

const Stories = () => {
  const { data: session } = useSession();

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-4 p-5 bg-white mt-0 md:mt-8 border-gray-20 border rounded-sm overflow-x-scroll scrollbar-thumb-black scrollbar-thin">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}

      {suggestions.map((profile) => {
        return (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.username}
          />
        );
      })}
    </div>
  );
};

export default Stories;
