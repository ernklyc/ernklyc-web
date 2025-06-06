"use client";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // İlk render'da activeSection'ı "home" olarak ayarla
    setActiveSection("home");
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Navbar arka planı
      setScrolled(currentScrollY > 50);

      // Navbar gizle/göster
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false); // aşağı kaydırınca gizle
      } else {
        setShowNavbar(true); // yukarı kaydırınca göster
      }
      lastScrollY.current = currentScrollY;

      // Aktif bölümü belirleme
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: "Ana Sayfa", href: "#home" },
    { label: "Hakkımda", href: "#about" },
    { label: "Yetenekler", href: "#skills" },
    { label: "Projeler", href: "#projects" },
    { label: "İletişim", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.35 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F1923]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 md:py-4 max-w-6xl flex justify-center items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 justify-center w-full">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative py-2 px-1 font-medium text-xs md:text-sm tracking-wide ${
                activeSection === item.href.substring(1) 
                ? "text-[#FF4655]" 
                : "text-gray-300 hover:text-[#FF4655]"
              } transition-colors`}
            >
              {item.label}
              <span 
                className={`absolute bottom-0 left-0 h-0.5 bg-[#FF4655] transition-all duration-300 ease-in-out ${
                  activeSection === item.href.substring(1) 
                  ? "w-full" 
                  : "w-0 group-hover:w-full"
                }`}>
              </span>
            </a>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 rounded-lg hover:bg-[#1F2731] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4655]"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <FiMenu className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0F1923]/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-lg z-50"
          >
            <div className="container mx-auto py-3 flex flex-col space-y-1 px-3 sm:px-6 items-center">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`py-2 px-3 rounded-lg flex items-center text-sm w-full text-center justify-center ${
                    activeSection === item.href.substring(1)
                    ? "text-[#FF4655] bg-[#1F2731]/50" 
                    : "text-gray-300 hover:bg-[#1F2731]/30"
                  } transition-colors`}
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
} 