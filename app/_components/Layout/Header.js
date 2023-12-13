'use client'

import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

const navigationElements = [
    {link: '/', name: 'CV & Contact'},
    {link: '/', name: 'Data'},
    {link: '/', name: 'Research'},
    {link: '/', name: 'In the News'},
];

const Header = () => {
    return (
        <header className="w-100 header flex p-5 content-center shadow-md shadow-zinc">
            <h1 className="flex font-serif font-extrabold content-center main-header-text pe-2 py-2 sm:pe-4 text-2xl">
                Emily Williams
            </h1>
            <div className="hidden md:block seperator-line mx-4 py-1 self-center"></div>
            <Navigation navElements={navigationElements}/>
            <MobileNavigation navElements={navigationElements}/>
        </header>
    );
}

export default Header;