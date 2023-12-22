import { NavLink } from "./NavItems";
import { usePathname } from "next/navigation";

const Navigation = ({navElements}) => {
    const pathname = usePathname();

    return (
        <nav className="hidden md:block">
            <ul className="h-full flex content-center">
                {navElements.map( el => {
                    return <NavLink el={el}  pathname={pathname}/>
                })}
            </ul>
        </nav>
    ); 
}

export default Navigation;