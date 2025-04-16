// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Substitua as importações dos ícones por:
import { 
  FiHome,      // Home
  FiMapPin,    // Estabelecimentos
  FiBox,       // Produtos
  FiPercent,   // Promoções
  FiHeart,     // Favoritos
  FiShoppingBag, // Dashboard
  FiUser,      // Registro
  FiLogIn,     // Login
  FiMenu,      // Menu Mobile
  FiX          // Fechar Menu
} from 'react-icons/fi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <FiHome /> },
    { to: "/estabelecimentos", label: "Estabelecimentos", icon: <FiMapPin /> },
    { to: "/produtos", label: "Produtos", icon: <FiBox /> },
    { to: "/promocoes", label: "Promoções", icon: <FiPercent /> },
    { to: "/favoritos", label: "Favoritos", icon: <FiHeart /> },
    { to: "/dashboard/estabelecimentos", label: "Dashboard", icon: <FiShoppingBag /> },
    { to: "/login", label: "Login", icon: <FiLogIn /> },
    { to: "/register", label: "Registro", icon: <FiUser /> },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-amber-600 bg-clip-text text-transparent"
          >
            Boralli
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.slice(0, 5).map((link) => ( // Mostra apenas os principais links no desktop
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors relative group"
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
              </Link>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-2" /> {/* Separador */}
            {navLinks.slice(5).map((link) => ( // Links de autenticação
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors relative group"
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}