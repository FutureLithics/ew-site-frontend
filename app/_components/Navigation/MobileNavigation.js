import { useState } from "react";
import { NavLink } from "./NavItems";
import { usePathname } from "next/navigation";

const Hamburger = ({ toggle }) => {
  const line =
    "ham-line h-1 w-6 rounded-full bg-stone-900 transition ease transform duration-300";
  const defaultPos = "opacity-50 group-hover:opacity-100";
  const rotatePos =
    "rotate-45 translate-y-2 opacity-75 group-hover:opacity-100";
  const rotateNeg =
    "-rotate-45 -translate-y-2 opacity-75 group-hover:opacity-100";

  return (
    <div className="flex flex-col py-1 h-8 w-8 rounded justify-center items-center group">
      <div className={`${line} ${toggle ? rotatePos : defaultPos}`}></div>
      <div className={`${line} ${toggle ? "opacity-0" : defaultPos}`}></div>
      <div className={`${line} ${toggle ? rotateNeg : defaultPos}`}></div>
    </div>
  );
};

const MobileNavigation = ({ navElements }) => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const close = () => {
    setToggle(false);
  };

  return (
    <nav className="relative flex flex-wrap md:hidden grow content-center justify-end mobile-navigation">
      <button onClick={() => setToggle(!toggle)}>
        <Hamburger toggle={toggle} />
      </button>
      <ul
        className={`top-level absolute top-16 ${
          toggle ? "flex" : "hidden"
        } flex-col w-screen h-screen content-center z-50 sm:px-36`}
      >
        {navElements.map((el) => {
          return (
            <NavLink
              el={el}
              key={el.link}
              pathname={pathname}
              mobile={true}
              close={close}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileNavigation;
