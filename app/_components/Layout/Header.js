import Link from 'next/link';

const navigationElements = [
    {link: '/', name: 'CV & Contact'},
    {link: '/', name: 'Data'},
    {link: '/', name: 'Research'},
    {link: '/', name: 'In the News'},
];

const Header = () => {
    return (
        <header className="header container flex p-5 content-center">
            <h1 className="font-serif font-extrabold main-header-text">
                Emily Williams
            </h1>
            <div className="seperator-line mx-4 py-1 self-center"></div>
            <nav>
                <ul className="h-full flex content-center">
                    {navigationElements.map( el => {
                        return (
                            <li className="self-center px-4 py-2 font-bold">
                                <Link href={el.link}>
                                    {el.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}

export default Header;