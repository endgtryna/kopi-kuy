import { faBook, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = (id: string) => {
        const elem = document.getElementById(id);
        if (!elem) return;
    
        const offset = id === "about" ? -30 : 0;
        const y = elem.getBoundingClientRect().top + window.pageYOffset + offset;
    
        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    };

    return (
        <div className="navbar bg-success px-8 shadow-xl fixed z-50">
            <div className="flex-1">
                <a className='cursor-pointer'>
                    <img
                        src='/logo-kopi-kuy.png'
                        width={'100%'}
                        className='w-40'
                    />
                </a>
            </div>

            <div className="flex items-center gap-[12px]">
                <span
                    onClick={() => handleScroll("selection")} 
                    className="space-grotesk-regular hover:font-bold text-white text-md font-[400] cursor-pointer"
                >
                    Selection
                </span>
                <span 
                    onClick={() => handleScroll("about")}
                    className="space-grotesk-regular hover:font-bold text-white text-md font-[400] cursor-pointer"
                >
                    About
                </span>
                <span 
                    onClick={() => handleScroll("team")}
                    className="space-grotesk-regular hover:font-bold text-white text-md font-[400] cursor-pointer"
                >
                    Team
                </span>
                <span 
                    onClick={() => handleScroll("review")}
                    className="space-grotesk-regular hover:font-bold text-white text-md font-[400] cursor-pointer"
                >
                    Review
                </span>
                <span 
                    onClick={() => handleScroll("contact")}
                    className="space-grotesk-regular hover:font-bold text-white text-md font-[400] cursor-pointer"
                >
                    Contact
                </span>
            </div>

            <div className="w-[2px] h-[24px] mx-[24px] rounded-full bg-white"></div>

            {location.pathname === "/" && (
                <div className="flex-none items-center gap-4">
                    <button onClick={() => navigate("/catalogue")} className="btn btn-sm bg-green-900 border-none text-white">
                        <span>Catalogue</span>
                        <FontAwesomeIcon icon={faBook} />
                    </button>
                </div>
            )}

            {location.pathname === "/catalogue" && (
                <div className="flex-none items-center gap-4">
                    <button onClick={() => navigate("/")} className="btn btn-sm bg-green-900 border-none text-white">
                        <span>Home</span>
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;