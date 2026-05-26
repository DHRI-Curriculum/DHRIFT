import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../public/images/logos/logo.png';
import { useTheme } from 'next-themes';
import { Fade, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Header({ title, instUser, instRepo, gitUser, gitRepo }) {
    const { theme, setTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    const navLinks = [
        { label: 'Workshops', href: `/workshops/?instUser=${instUser}&instRepo=${instRepo}&user=${gitUser}&repo=${gitRepo}` },
        { label: 'Glossary', href: `/glossary/?instUser=${instUser}&instRepo=${instRepo}&user=${gitUser}&repo=${gitRepo}` },
        { label: 'About', href: 'https://www.dhrift.org/about' },
    ];

    const mobileDrawer = (
        <div className="mobile-drawer">
            <div className="mobile-drawer-header">
                <Link href="http://www.dhrift.org" className="mobile-drawer-logo">
                    <Image src={logo} alt="DHRIFT" width={200} />
                </Link>
                <button
                    className="mobile-drawer-close"
                    onClick={handleDrawerToggle}
                    aria-label="Close menu"
                >
                    <CloseIcon />
                </button>
            </div>
            <nav className="mobile-drawer-nav">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="mobile-drawer-link"
                        onClick={handleDrawerToggle}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    );

    if (!gitRepo || !gitUser) return null;

    return (
        <Fade in={Boolean(title)} timeout={500}>
            <header className="site-header">
                {/* Mobile menu button */}
                <button
                    className="mobile-menu-btn"
                    onClick={handleDrawerToggle}
                    aria-label="Open menu"
                >
                    <MenuIcon />
                </button>

                {/* Desktop header */}
                <div className="site-header-inner">
                    <Link href="http://www.dhrift.org" className="site-header-logo">
                        <Image src={logo} alt="DHRIFT" width={320} priority />
                    </Link>

                    <nav className="site-header-nav">
                        {instUser && instRepo && navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="site-header-link"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    className="mobile-drawer-container"
                    PaperProps={{ className: 'mobile-drawer-paper' }}
                >
                    {mobileDrawer}
                </Drawer>
            </header>
        </Fade>
    );
}
