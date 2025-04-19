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
} from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links principais para o bottom navigation
  const mainMobileLinks = [
    { to: "/", label: "Início", icon: <Home size={24} /> },
    { to: "/estabelecimentos", label: "Lojas", icon: <MapPin size={24} /> },
    { to: "/produtos", label: "Produtos", icon: <Package size={24} /> },
    { to: "/promocoes", label: "Promoções", icon: <Percent size={24} /> },
    { to: "/favoritos", label: "Favoritos", icon: <Heart size={24} /> },
    { to: "/login", label: "Conta", icon: <User size={24} /> },
  ];

  // Links para desktop
  const desktopLinks = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/estabelecimentos", label: "Estabelecimentos", icon: <MapPin size={20} /> },
    { to: "/produtos", label: "Produtos", icon: <Package size={20} /> },
    { to: "/promocoes", label: "Promoções", icon: <Percent size={20} /> },
    { to: "/favoritos", label: "Favoritos", icon: <Heart size={20} /> },
    { to: "/dashboard/estabelecimentos", label: "Dashboard", icon: <ShoppingBag size={20} /> },
  ];

  return (
    <>
      {/* Top Header */}
      <header className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' 
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Boralli
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {desktopLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                    location.pathname === link.to
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 text-gray-700"
              >
                <LogIn size={20} />
                <span className="font-medium">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="grid grid-cols-5 h-full items-center justify-items-center px-2">
          {mainMobileLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1 p-2 w-full h-full justify-center ${
                location.pathname === link.to
                  ? 'text-purple-600 bg-purple-50/50'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {link.icon}
              <span className="text-xs font-medium text-center">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}