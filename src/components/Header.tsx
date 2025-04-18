// src/components/Header.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  MapPin,
  Package,
  Percent,
  Heart,
  ShoppingBag,
  User,
  LogIn,
  Menu,
  X,
  Star
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/estabelecimentos", label: "Estabelecimentos", icon: <MapPin size={20} /> },
    { to: "/produtos", label: "Produtos", icon: <Package size={20} /> },
    { to: "/promocoes", label: "Promoções", icon: <Percent size={20} /> },
    { to: "/favoritos", label: "Favoritos", icon: <Heart size={20} /> },
    { to: "/dashboard/estabelecimentos", label: "Dashboard", icon: <ShoppingBag size={20} /> },
  ];

  const authLinks = [
    { to: "/login", label: "Login", icon: <LogIn size={20} /> },
    { to: "/register", label: "Registro", icon: <User size={20} /> },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' 
        : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative">
                Boralli
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative group flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                    location.pathname === link.to
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                  {location.pathname === link.to && (
                    <div className="absolute -bottom-3 left-1/2 w-4 h-1 bg-purple-600 rounded-full -translate-x-1/2" />
                  )}
                </Link>
              ))}
            </div>

            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2" />

            <div className="flex items-center gap-4">
              {authLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all text-gray-700 hover:text-purple-700"
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl transition-all ${
              isMenuOpen 
                ? 'bg-purple-100 text-purple-600' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-lg z-40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-full'
        }`}>
          <div className="container mx-auto px-4 h-full flex flex-col">
            <div className="flex justify-end pt-6 pb-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={24} className="text-gray-700" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pb-8">
              <div className="space-y-1">
                <h3 className="px-4 py-2 text-sm font-medium text-gray-500">Navegação</h3>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      location.pathname === link.to
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 my-4" />

              <div className="space-y-1">
                <h3 className="px-4 py-2 text-sm font-medium text-gray-500">Conta</h3>
                {authLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}