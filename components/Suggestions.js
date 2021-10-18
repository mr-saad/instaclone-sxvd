import React, { useEffect, useState } from "react";
import faker from "faker";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, ind) => ({
      ...faker.helpers.contextualCard(),
      id: ind,
    }));

    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for You</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map((suggestion) => {
        return (
          <div
            key={suggestion.id}
            className="flex items-center justify-between mt-3 "
          >
            <img
              className="w-10 h-10 rounded-full border p-[2px]"
              src={suggestion.avatar}
            />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{suggestion.username}</h2>
              <h4 className="text-sm text-gray-400">
                Works at {suggestion.company.name}
              </h4>
            </div>
            <button className="text-blue-300 text-sm font-bold">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
