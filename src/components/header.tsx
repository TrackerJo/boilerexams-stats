import { useEffect, useRef, useState } from "react";
import './header.css'
import Logo from '../assets/logo.png'



function Header() {
    const [isSticky, setSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const headerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        window.onscroll = function () { myFunction() };

        const sticky = headerRef.current!.offsetTop;

        function myFunction() {
            if (window.scrollY > sticky) {
                setSticky(true);
                document.body.classList.add('sticky-header');
            } else {
                setSticky(false);
                document.body.classList.remove('sticky-header');
            }
        }
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (sectionId: string) => {
        closeMobileMenu();
        window.location.href = `/#${sectionId}`;
        setTimeout(() => {
            window.scrollTo({
                top: window.scrollY - 100,
                behavior: "smooth"
            });
        }, 100);
    };

    return (
        <div ref={headerRef} className={"header " + (isSticky ? "sticky" : "")} id="myHeader">
            <div className="header-left" onClick={() => {
                window.location.href = "/"
            }}>
                <img src={Logo} alt="" className="Logo" />

            </div>

            {/* Desktop Menu */}
            <div className="header-right desktop-menu">

            </div>

            {/* Mobile Menu Toggle */}
            <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-menu-header">
                        <h3>Menu</h3>
                        <button className="close-mobile-menu" onClick={closeMobileMenu}>×</button>
                    </div>

                    <div className="mobile-menu-items">
                        <div className="mobile-menu-section">
                            <h4>Solutions</h4>
                            <a onClick={() => scrollToSection('features')}>All Features</a>
                            <a onClick={() => scrollToSection('activities')}>Activity Management</a>
                            <a onClick={() => scrollToSection('ridesharing')}>Transportation</a>
                            <a onClick={() => scrollToSection('opportunities')}>Career Center</a>
                        </div>

                        <div className="mobile-menu-section">
                            <a onClick={() => scrollToSection('testimonials')}>Testimonials</a>
                            <a onClick={() => scrollToSection('pricing')}>Pricing</a>
                            <a onClick={() => scrollToSection('contact')}>Contact</a>
                        </div>

                        <div className="mobile-menu-section">
                            <a onClick={() => {
                                closeMobileMenu();
                                window.location.href = "https://dashboard.campusconnects.net";
                            }} className="login-link">Login</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>}
        </div>
    )
}

export default Header