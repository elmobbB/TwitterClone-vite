import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Timeline } from "react-twitter-widgets";

interface Props {
  backgroundColor: string;
  noScrollbar: true;
  onLoad: () => void;
  sourceType: "profile";
  screenName: string;
  options: { height: number };
}
export default function Widgets() {
  return (
    <div className="col-span-3 px-2 mt-2 hidden lg:inline ">
      {/* only when there is a large screen (lg), the widget will be shown */}
      <div className="mb-4 flex justify-content items-center space-x-2 bg-gray-100 rounded-full p-3 mt-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent flex-1 outline-none"
          //   flex-1 :input takes up available space
        />
      </div>

      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "OpenAI",
        }}
        options={{
          height: "400",
        }}
      />
    </div>
  );
}
