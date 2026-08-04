"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (id: string) => {
    setIsOpen(false);

    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>
          LONGLY
        </div>

        {/* Desktop Menu */}
        <div className={styles.navLinks}>
          <span
            className={styles.navLink}
            onClick={() => handleNavClick("features-cards")}
          >
            How it works
          </span>
          <span
            className={styles.navLink}
            onClick={() => handleNavClick("features-cards")}
          >
            Features
          </span>
          <span
            className={styles.navLink}
            onClick={() => handleNavClick("absurd-use-cases")}
          >
            Examples
          </span>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.ctaButton}
            onClick={() => handleNavClick("hero-section")}
          >
            Longen a URL
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile Menu Panel */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
          <span
            className={styles.mobileNavLink}
            onClick={() => handleNavClick("features-cards")}
          >
            How it works
          </span>
          <span
            className={styles.mobileNavLink}
            onClick={() => handleNavClick("features-cards")}
          >
            Features
          </span>
          <span
            className={styles.mobileNavLink}
            onClick={() => handleNavClick("absurd-use-cases")}
          >
            Examples
          </span>
          <button
            type="button"
            className={styles.mobileCtaButton}
            onClick={() => handleNavClick("hero-section")}
          >
            Longen a URL
          </button>
        </div>
      </div>
    </nav>
  );
}
