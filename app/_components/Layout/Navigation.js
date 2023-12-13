import Link from 'next/link';

const Navigation = ({navElements}) => {
    return (
        <nav className="hidden md:block">
            <ul className="h-full flex content-center">
                {navElements.map( el => {
                    return (
                        <li key={el.name} className="self-center px-2 sm:px-4 py-2 text-lg font-bold">
                            <Link href={el.link}>
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