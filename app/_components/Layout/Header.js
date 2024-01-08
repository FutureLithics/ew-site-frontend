"use client";

import Navigation from "../Navigation/Navigation";
import MobileNavigation from "../Navigation/MobileNavigation";

const dataNavigationElements = [
    { link: "/data/temperature", name: "Climate", subMenu: false },
    { link: "/data/fragility", name: "Fragility", subMenu: false },
    { link: "/data/housing", name: "Housing", subMenu: false },
];

const navigationElements = [
    { link: "/", name: "CV & Contact", subMenu: false },
    {
        link: "/data/temperature",
        name: "Data",
        subMenu: dataNavigationElements,
    },
    { link: "/research", name: "Research", subMenu: false },
    { link: "/blog", name: "Identity in Finance", subMenu: false },
];

const Header = () => {
    return (
        <header className="w-100 header flex p-5 content-center shadow-md shadow-zinc">
            <h1 className="flex font-serif font-extrabold content-center main-header-text pe-2 py-2 sm:pe-4 text-2xl">
                Emily Williams
            </h1>
            <div className="hidden md:block seperator-line mx-4 py-1 self-center"></div>
            <Navigation navElements={navigationElements} />
            <MobileNavigation navElements={navigationElements} />
        </header>
    );
};

export default Header;
