import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Phone, Menu, X, ChevronDown, MapPin, Clock, Download } from "lucide-react";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { galleryImages, heroImage, aboutImage } from "./galleryImages";
import { menuSections } from "./menuData";
import "@/App.css";

// Restaurant Info
const RESTAURANT_INFO = {
  name: "Bar de l'Hôtel de Ville",
  phone: "01 70 59 49 87",
  phoneHref: "tel:+33170594987",
  address: "60 Av. de la Division Leclerc, 93350 Le Bourget, France",
  mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.8!2d2.4279!3d48.9378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66b5d8c98c1d7%3A0x0!2s60%20Av.%20de%20la%20Division%20Leclerc%2C%2093350%20Le%20Bourget!5e0!3m2!1sfr!2sfr!4v1",
};

// Navbar Component
const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#menu", label: t("nav.menu") },
    { href: "#gallery", label: t("nav.gallery") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        data-testid="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "navbar-solid" : "navbar-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection("#hero"); }}
            data-testid="logo"
            className="flex items-center gap-2"
          >
            <span className={`font-serif text-2xl font-semibold tracking-tight ${isScrolled ? "text-sage-900" : "text-white"}`}>
              BHV
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                data-testid={`nav-${link.href.slice(1)}`}
                className={`nav-link font-sans text-sm tracking-wide ${
                  isScrolled ? "text-sage-900" : "text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side: Language + CTA */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="lang-switch">
              {["fr", "en", "es"].map((lang, i) => (
                <>
                  {i > 0 && <span key={`sep-${lang}`} className={isScrolled ? "text-sage-300" : "text-white/50"}>|</span>}
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    data-testid={`lang-${lang}`}
                    className={`${language === lang ? "active" : ""} ${isScrolled ? "" : "!text-white/70 hover:!text-white"}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                </>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={RESTAURANT_INFO.phoneHref}
              data-testid="nav-reserve-btn"
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Phone size={16} />
              {t("nav.reserve")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            data-testid="mobile-menu-btn"
            className={`md:hidden p-2 ${isScrolled ? "text-sage-900" : "text-white"}`}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="mobile-menu"
            className="mobile-menu"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="mobile-menu-close"
              className="absolute top-6 right-6 text-sage-900"
            >
              <X size={28} />
            </button>

            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="mobile-menu-link"
              >
                {link.label}
              </motion.button>
            ))}

            <div className="lang-switch mt-4">
              {["fr", "en", "es"].map((lang, i) => (
                <>
                  {i > 0 && <span key={`sep-${lang}`} className="text-sage-300">|</span>}
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={language === lang ? "active" : ""}
                  >
                    {lang.toUpperCase()}
                  </button>
                </>
              ))}
            </div>

            <a
              href={RESTAURANT_INFO.phoneHref}
              data-testid="mobile-reserve-btn"
              className="btn-primary flex items-center gap-2 mt-4"
            >
              <Phone size={18} />
              {t("nav.reserve")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const HeroSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="hero" ref={ref} data-testid="hero-section" className="hero-section">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="Restaurant BHV"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="hero-overlay" />
      
      <div className="hero-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-label text-white/80 mb-4"
        >
          {t("hero.subtitle")}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          data-testid="hero-title"
          className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white font-light tracking-tight mb-6"
        >
          {RESTAURANT_INFO.name}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          data-testid="hero-slogan"
          className="font-serif text-xl sm:text-2xl text-white/90 italic mb-10"
        >
          {t("hero.slogan")}
        </motion.p>
        
        <motion.a
          href={RESTAURANT_INFO.phoneHref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          data-testid="hero-cta-btn"
          className="btn-primary flex items-center gap-3 text-base"
        >
          <Phone size={18} />
          {t("hero.cta")}
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 scroll-indicator"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="about" ref={ref} data-testid="about-section" className="py-24 lg:py-32 bg-bone">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="about-image-container"
          >
            <img
              src={aboutImage}
              alt="Intérieur du restaurant"
              data-testid="about-image"
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-elegant"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <span className="section-label" data-testid="about-label">{t("about.label")}</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-sage-900 mt-4 mb-8" data-testid="about-title">
              {t("about.title")}
            </h2>
            <div className="space-y-4 text-sage-600 leading-relaxed whitespace-pre-line" data-testid="about-description">
              {t("about.description")}
            </div>
            <p className="font-serif text-xl text-sage-500 italic mt-8" data-testid="about-signature">
              — {t("about.signature")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Menu Modal — full menu displayed like the PDF
const MenuModal = ({ onClose }) => {
  const { language } = useLanguage();
  const [menuLang, setMenuLang] = useState(language);
  const langLabels = { fr: "Français", en: "English", es: "Español" };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="menu-modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="menu-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="menu-modal-header">
          <div className="menu-modal-brand">
            <span className="font-serif text-2xl font-semibold text-sage-900 tracking-tight">B · H · V</span>
            <span className="menu-modal-subtitle">Hôtel Restaurant — Le Bourget</span>
          </div>

          <div className="menu-lang-tabs">
            {["fr", "en", "es"].map((lang) => (
              <button
                key={lang}
                onClick={() => setMenuLang(lang)}
                className={`menu-lang-tab ${menuLang === lang ? "active" : ""}`}
              >
                {langLabels[lang]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/carte_bhv.pdf"
              target="_blank"
              rel="noreferrer"
              className="menu-pdf-btn"
            >
              <Download size={15} />
              PDF
            </a>
            <button onClick={onClose} className="menu-modal-close" aria-label="Fermer">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Full menu content */}
        <div className="menu-modal-body">
          {menuSections.map((section) => (
            <div key={section.id} className="menu-full-section">
              <div className="menu-full-section-header">
                <h3 className="menu-full-section-title">{section.title[menuLang]}</h3>
                <div className="menu-full-section-line" />
              </div>

              {section.note && (
                <p className="menu-full-note">{section.note[menuLang]}</p>
              )}

              <ul className="menu-full-items">
                {section.items.map((item, i) => (
                  <li key={i} className="menu-full-item">
                    <div className="menu-full-item-info">
                      <span className="menu-full-item-name">{item.name[menuLang]}</span>
                      {item.desc && (
                        <span className="menu-full-item-desc">{item.desc[menuLang]}</span>
                      )}
                    </div>
                    <div className="menu-full-item-dots" />
                    <span className="menu-full-item-price">{item.price || "—"}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="menu-full-footer">
            60 Av. de la Division Leclerc · 93350 Le Bourget · 01 70 59 49 87 · Ouvert 7j/7
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Menu Section
const MenuSection = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="menu" data-testid="menu-section" className="menu-section py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label" data-testid="menu-label">{t("menu.label")}</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-sage-900 mt-4 mb-6" data-testid="menu-title">
            {t("menu.title")}
          </h2>
          <p className="text-sage-600 max-w-xl mx-auto mb-12" data-testid="menu-description">
            {t("menu.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="menu-cover-card"
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
        >
          <div className="menu-cover-inner">
            <p className="menu-cover-label">HÔTEL RESTAURANT</p>
            <h3 className="menu-cover-title">B · H · V</h3>
            <div className="menu-cover-divider" />
            <p className="menu-cover-langs">Français · English · Español</p>
            <span className="menu-cover-cta">{t("menu.viewMenu")}</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && <MenuModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const { t } = useLanguage();

  return (
    <section id="gallery" data-testid="gallery-section" className="py-24 lg:py-32 bg-bone">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label" data-testid="gallery-label">{t("gallery.label")}</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-sage-900 mt-4 mb-6" data-testid="gallery-title">
            {t("gallery.title")}
          </h2>
          <p className="text-sage-600 max-w-2xl mx-auto" data-testid="gallery-description">
            {t("gallery.description")}
          </p>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`gallery-image-${index}`}
              className={`gallery-image ${image.span} ${image.rowSpan} rounded-lg overflow-hidden shadow-elegant`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover min-h-[200px]"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" data-testid="contact-section" className="py-24 lg:py-32 bg-beige">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label" data-testid="contact-label">{t("contact.label")}</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-sage-900 mt-4" data-testid="contact-title">
            {t("contact.title")}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-sage-500" size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-sage-900 mb-2" data-testid="contact-address-label">
                  {t("contact.address")}
                </h3>
                <p className="text-sage-600" data-testid="contact-address">
                  {RESTAURANT_INFO.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <Phone className="text-sage-500" size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-sage-900 mb-2" data-testid="contact-phone-label">
                  {t("contact.phone")}
                </h3>
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  data-testid="contact-phone"
                  className="phone-link"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <Clock className="text-sage-500" size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-sage-900 mb-2" data-testid="contact-hours-label">
                  {t("contact.hours")}
                </h3>
                <p className="text-sage-600" data-testid="contact-hours-detail">
                  {t("contact.hoursDetail")}
                </p>
                <p className="text-sage-500" data-testid="contact-closed">
                  {t("contact.closed")}
                </p>
              </div>
            </div>

            {/* Reservation Info */}
            <div className="bg-sage-50 rounded-lg p-6 mt-8" data-testid="reservation-info">
              <h3 className="font-serif text-xl text-sage-900 mb-3">
                {t("contact.reservation")}
              </h3>
              <p className="text-sage-600 mb-4">
                {t("contact.reservationText")}
              </p>
              <a
                href={RESTAURANT_INFO.phoneHref}
                data-testid="contact-call-btn"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Phone size={18} />
                {t("contact.callNow")}
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="map-container h-full min-h-[400px]" data-testid="contact-map">
              <iframe
                src={RESTAURANT_INFO.mapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="footer py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl text-white mb-2">BHV</h3>
            <p className="text-sage-100 text-sm italic">{t("footer.tagline")}</p>
          </div>
          
          <div className="text-center">
            <a
              href={RESTAURANT_INFO.phoneHref}
              data-testid="footer-phone"
              className="text-sage-100 hover:text-white text-lg"
            >
              {RESTAURANT_INFO.phone}
            </a>
          </div>
          
          <div className="text-center md:text-right text-sage-100 text-sm">
            <p>© {currentYear} Bar de l'Hôtel de Ville</p>
            <p>{t("footer.rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Mobile FAB (Floating Action Button)
const MobileFAB = () => {
  return (
    <a
      href={RESTAURANT_INFO.phoneHref}
      data-testid="mobile-fab"
      className="fixed bottom-6 right-6 z-40 md:hidden w-14 h-14 bg-sage-500 rounded-full flex items-center justify-center text-white shadow-lg fab-pulse"
    >
      <Phone size={24} />
    </a>
  );
};

// Main App Content
const AppContent = () => {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <MobileFAB />
    </div>
  );
};

// App with Provider
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
