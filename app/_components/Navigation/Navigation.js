import Link from 'next/link';
import { usePathname } from "next/navigation";

const Navigation = ({navElements}) => {
    const pathname = usePathname();

    return (
        <nav className="hidden md:block">
            <ul className="h-full flex content-center">
                {navElements.map( el => {
                    const active = el.link == pathname ? 'active' : '';
                    const linkClasses = `${active} self-center mx-1 sm:mx-4 text-lg font-bold`;

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

export default Navigation;