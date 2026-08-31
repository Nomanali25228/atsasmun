"use client";
import Link from "next/link";
import Image from "next/image";
import newLogo from "@/app/public/img/new-logo.png";
import {
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Breakpoint: below this = mobile nav, above = desktop nav
const MOBILE_BREAKPOINT = 900;

function Navbar() {
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileDropdownOpen2, setMobileDropdownOpen2] = useState(false);
  const [showNav, setShowNav] = useState(true);
  // null = not yet detected (prevents flash of wrong nav on SSR)
  const [isMobile, setIsMobile] = useState(null);

  const dropdownTimeout1 = useRef(null);
  const dropdownTimeout2 = useRef(null);
  const prevScrollY = useRef(0);

  const handleMouseEnter1 = () => {
    clearTimeout(dropdownTimeout1.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave1 = () => {
    dropdownTimeout1.current = setTimeout(() => setDropdownOpen(false), 200);
  };
  const handleMouseEnter2 = () => {
    clearTimeout(dropdownTimeout2.current);
    setDropdownOpen2(true);
  };
  const handleMouseLeave2 = () => {
    dropdownTimeout2.current = setTimeout(() => setDropdownOpen2(false), 400);
  };

  useEffect(() => {
    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setShowNav(true);
        prevScrollY.current = 0;
        return;
      }
      setShowNav(currentScrollY <= prevScrollY.current);
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollDirection);
  }, []);

  // Detect mobile breakpoint — runs only on client, prevents SSR mismatch
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile(); // run immediately on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [mobileMenuOpen]);

  const navStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 999,
    backdropFilter: 'blur(10px)',
    background: 'rgba(18,20,43,0.85)',
    borderBottom: '1px solid rgba(245,241,232,0.14)',
    transition: 'transform 0.3s ease',
    transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
  };

  const linkBase = {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    color: 'rgba(245,241,232,0.75)',
    textDecoration: 'none',
    transition: 'color .2s',
  };

  const destinations = ["/Istanbul", "/UK", "/Saudi", "/USA"];
  const isDestinationActive = destinations.some((d) => pathname?.startsWith(d));

  // Don't render anything until we know if it's mobile or desktop
  // This prevents the flash where both navbars are visible

  return (
    <nav style={navStyle}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 28px',
          maxWidth: 1120,
          margin: '0 auto',
        }}
      >
        {/* Brand */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src={newLogo}
            alt="ATSASMUN Logo"
            width={34}
            height={34}
            style={{ objectFit: 'contain', borderRadius: '50%' }}
            priority
          />
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '-0.01em',
              color: '#F5F1E8',
            }}
          >
            ATSAS<span style={{ color: '#FF5A5F' }}>MUN</span>
          </div>
        </Link>

        {/* Desktop Links — only on desktop */}
        <div
          className="hidden lg:flex" style={{ gap: 30, alignItems: 'center' }}
        >
          <Link href="/" style={linkBase}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF8A8E'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,241,232,0.75)'}
          >
            Home
          </Link>

          {/* Destinations Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
          >
            <button
              style={{
                ...linkBase,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                color: isDestinationActive ? '#FF8A8E' : 'rgba(245,241,232,0.75)',
              }}
            >
              Destinations
              {dropdownOpen2 ? <AiOutlineUp style={{ fontSize: 12 }} /> : <AiOutlineDown style={{ fontSize: 12 }} />}
            </button>
            {dropdownOpen2 && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: 8,
                  width: 200,
                  background: '#1B1E3D',
                  border: '1px solid rgba(245,241,232,0.14)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  zIndex: 100,
                }}
              >
                {[
                  { href: '/Istanbul', label: 'Istanbul, Turkey' },
                  { href: '/UK', label: 'London, UK' },
                  { href: '/Saudi', label: 'Riyadh, Saudi Arabia' },
                  { href: '/USA', label: 'New York, USA' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      color: pathname === item.href ? '#FF8A8E' : '#F5F1E8',
                      textDecoration: 'none',
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: 14,
                      transition: 'background .2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,241,232,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Information Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
          >
            <button
              style={{
                ...linkBase,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Information
              {dropdownOpen ? <AiOutlineUp style={{ fontSize: 12 }} /> : <AiOutlineDown style={{ fontSize: 12 }} />}
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: 8,
                  width: 180,
                  background: '#1B1E3D',
                  border: '1px solid rgba(245,241,232,0.14)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  zIndex: 100,
                }}
              >
                {[
                  { href: '/payment', label: 'Pricing' },
                  { href: '/#faq', label: 'FAQs' },
                  { href: '/Terms&conditions', label: 'Terms & Conditions' },
                  { href: '/Privac', label: 'Privacy Policy' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      color: '#F5F1E8',
                      textDecoration: 'none',
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: 14,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,241,232,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/Blogs/1" style={linkBase}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF8A8E'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,241,232,0.75)'}
          >
            Blog
          </Link>

          <Link href="/#contact" style={linkBase}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF8A8E'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,241,232,0.75)'}
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop Register Button — only on desktop */}
        <div className="hidden lg:block">
          <Link href="/RegisterNow">
            <button className="atsas-btn-solid">Register Now</button>
          </Link>
        </div>

        {/* Mobile Top Bar — only on mobile */}
        <div
          className="flex lg:hidden" style={{ alignItems: 'center', gap: 12 }}
        >
          <Link href="/RegisterNow">
            <button className="atsas-btn-solid" style={{ fontSize: 11, padding: '8px 16px' }}>
              Register Now
            </button>
          </Link>
          <button
            style={{ background: 'none', border: 'none', color: '#F5F1E8', cursor: 'pointer' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {!mobileMenuOpen && <AiOutlineMenu style={{ width: 24, height: 24 }} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: 24,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 440,
              background: '#1B1E3D',
              border: '1px solid rgba(245,241,232,0.14)',
              borderRadius: 12,
              padding: 24,
              height: 'calc(100vh - 48px)',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(245,241,232,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Image
                  src={newLogo}
                  alt="ATSASMUN Logo"
                  width={28}
                  height={28}
                  style={{ objectFit: 'contain', borderRadius: '50%' }}
                />
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#F5F1E8',
                  }}
                >
                  ATSAS<span style={{ color: '#FF5A5F' }}>MUN</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#F5F1E8', cursor: 'pointer', padding: 4 }}
              >
                <AiOutlineClose style={{ width: 22, height: 22 }} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/#events', label: 'Events' },
                { href: '/#atsasMun', label: 'Atsas MUN' },
                { href: '/#contact', label: 'Contact Us' },
                { href: '/Blogs/1', label: 'Blog' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 16px',
                    color: '#F5F1E8',
                    textDecoration: 'none',
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: 15,
                    borderRadius: 8,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,241,232,0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {item.label}
                </Link>
              ))}

              {/* Destinations */}
              <button
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 16px',
                  color: '#F5F1E8',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 15,
                  borderRadius: 8,
                }}
                onClick={() => setMobileDropdownOpen2(!mobileDropdownOpen2)}
              >
                <span>Destinations</span>
                {mobileDropdownOpen2 ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              {mobileDropdownOpen2 && (
                <div style={{ marginLeft: 16 }}>
                  {[
                    { href: '/Istanbul', label: 'Istanbul, Turkey' },
                    { href: '/UK', label: 'London, UK' },
                    { href: '/Saudi', label: 'Riyadh, Saudi Arabia' },
                    { href: '/USA', label: 'New York, USA' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        color: 'rgba(245,241,232,0.75)',
                        textDecoration: 'none',
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: 14,
                        borderRadius: 8,
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Information */}
              <button
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 16px',
                  color: '#F5F1E8',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 15,
                  borderRadius: 8,
                }}
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              >
                <span>Information</span>
                {mobileDropdownOpen ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              {mobileDropdownOpen && (
                <div style={{ marginLeft: 16 }}>
                  {[
                    { href: '/payment', label: 'Pricing' },
                    { href: '/#faq', label: 'FAQs' },
                    { href: '/Terms&conditions', label: 'Terms & Conditions' },
                    { href: '/Privac', label: 'Privacy Policy' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        color: 'rgba(245,241,232,0.75)',
                        textDecoration: 'none',
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: 14,
                        borderRadius: 8,
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}

    </nav>
  );
}

export default Navbar;
