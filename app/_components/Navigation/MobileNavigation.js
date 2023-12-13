import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Hamburger = ({toggle}) => {

    const line = "ham-line h-1 w-6 rounded-full bg-stone-900 transition ease transform duration-300";
    const defaultPos = "opacity-50 group-hover:opacity-100"
    const rotatePos = "rotate-45 translate-y-2 opacity-75 group-hover:opacity-100";
    const rotateNeg = "-rotate-45 -translate-y-2 opacity-75 group-hover:opacity-100";


    return (
        <div className="flex flex-col py-1 h-8 w-8 rounded justify-center items-center group">
            <div className={`${line} ${toggle ? rotatePos : defaultPos}`}></div>
            <div className={`${line} ${toggle ? 'opacity-0' : defaultPos}`}></div>
            <div className={`${line} ${toggle ? rotateNeg : defaultPos}`}></div>
        </div>
    );
}

const MobileNavigation = ({ navElements }) => {
    const pathname = usePathname();
    const [ toggle, setToggle ] = useState(false);

    return (
        <nav className="relative flex flex-wrap md:hidden grow content-center justify-end mobile-navigation">
            <button onClick={() => setToggle(!toggle)}>
                <Hamburger toggle={toggle} />
            </button>
            <ul className={`absolute top-16 ${toggle ? 'flex' : 'hidden'} flex-col w-screen h-screen content-center z-50`}>
                {navElements.map( el => {
                    const active = el.link == pathname ? 'active' : '';
                    const linkClasses = `${active} self-center mx-2 sm:mx-4 py-2 text-lg font-bold`;

                    return (
                        <li key={el.name} className="flex">
                            <Link href={el.link} className={linkClasses}>
                                {el.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    ); 
}

export default MobileNavigation;