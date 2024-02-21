"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

const Popup = ({ title, buttonText, content }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <QuestionMarkCircleIcon 
        onClick={() => setToggle(true)}
        className="w-4 h-4 text-accentPurple cursor-pointer"
      />

      <div
        id="popup-modal"
        className={`${
          toggle ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0 bg-slate-600 bg-opacity-50`}
      >
        <div className="relative w-full max-w-xl max-h-full opacity-100 text-slate-700">
          <div className="relative rounded-lg shadow bg-slate-100">
            <div className="p-2 border-b-2 border-slate-300 flex justify-between items-center px-4 text-lg">
              <div>{title}</div>
              <button
                type="button"
                className=" text-slate-700 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={() => setToggle(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
                <ReactMarkdown className="rich-text" rehypePlugins={[rehypeRaw]}>
                    {content}
                </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
