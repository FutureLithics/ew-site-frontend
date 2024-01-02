import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const determineSubMenuActive = (subMenuItem, subMenu, pathname) => {
    if (!subMenuItem && subMenu) {
        return (
            subMenu.filter((item) => {
                return item.link === pathname;
            }).length > 0
        );
    } else {
        return false;
    }
};

const activeLinkClass = (link, subMenuItem, subMenu, pathname) => {
    if (link == pathname) {
        return "active";
    } else if (determineSubMenuActive(subMenuItem, subMenu, pathname)) {
        return "active";
    } else {
        return "";
    }
};

export const SubMenu = ({
    menu,
    pathname,
    subMenuItem = false,
    mobile = false,
    close = { close },
}) => {
    const absolute = mobile ? "relative" : "absolute top-16";

    return (
        <ul className={`sub-menu ${absolute} pt-2 pb-4`}>
            {menu.map((el) => {
                return (
                    <NavLink
                        el={el}
                        key={el.link}
                        pathname={pathname}
                        subMenuItem={true}
                        close={close}
                    />
                );
            })}
        </ul>
    );
};

export const NavLink = ({
    el,
    pathname,
    subMenuItem = false,
    mobile = false,
    close = () => {},
}) => {
    const active = activeLinkClass(el.link, subMenuItem, el.subMenu, pathname);
    const subItem = subMenuItem
        ? "sub-menu-item text-md"
        : "main-nav-element text-lg";
    const linkClasses = `${active} ${subItem} relative self-start mx-1 sm:mx-4 font-bold flex flex-row grow space-between`;

    const [toggle, setToggle] = useState(false);
    const desktopHandler = (bool) => {
        if (!mobile) {
            setToggle(bool);
        }
    };

    return (
        <li
            key={el.name}
            className="flex flex-col text-start pt-2 px-4 sm:px-0"
            onMouseEnter={() => desktopHandler(true)}
            onMouseLeave={() => desktopHandler(false)}
        >
            <div className="flex flex-row">
                <Link
                    href={el.link}
                    className={linkClasses}
                    onClick={() => close()}
                >
                    {el.name}
                </Link>
                {el.subMenu && mobile && (
                    <ChevronDownIcon
                        onClick={() => setToggle(!toggle)}
                        className="ms-1 w-4 h-4 cursor-pointer self-center"
                    />
                )}
            </div>

            {toggle && el.subMenu && (
                <SubMenu
                    menu={el.subMenu}
                    pathname={pathname}
                    mobile={mobile}
                    close={close}
                />
            )}
        </li>
    );
};
