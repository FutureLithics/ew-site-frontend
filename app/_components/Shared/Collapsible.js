import { useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Paragraph from "../Article/Paragraph";

const Collapsible = ({ content }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="collapsible">
      <div
        className={`content overflow-hidden ${
          toggle ? "expanded" : "contracted"
        }`}
      >
        {content && <Paragraph component={content} classes="my-4" />}
      </div>
      <div
        className="collapse-toggle w-100 flex justify-center baseBlue cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        Read {toggle ? "less" : "more"}
        <ChevronDownIcon
          className={`w-6 h-6 baseBlue self-center ${
            toggle ? "rotate-180 origin-center pe-2" : "ps-2"
          }`}
        />
      </div>
    </div>
  );
};

export default Collapsible;
