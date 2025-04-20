// src/pages/dashboard/DashboardLayout.tsx
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Package, Tag, Sun, Moon, User, Settings, LogOut, ChevronRight, Home, Menu } from 'lucide-react';

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile Header */}
        {isMobile && (
          <header className="md:hidden sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
            <div className="p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Boralli
                </span>
              </h1>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200"/>
                  ) : (
                    <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200"/>
                  )}
                </button>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Menu className="w-5 h-5 text-gray-800 dark:text-gray-200"/>
                </button>
              </div>
            </div>

            {/* Mobile Breadcrumb */}
            <div className="px-4 pb-4">
              <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 overflow-x-auto">
                <Home className="w-4 h-4 flex-shrink-0"/>
                {pathSegments.map((segment, index) => (
                  <div key={segment} className="flex items-center gap-2 flex-shrink-0">
                    <ChevronRight className="w-4 h-4"/>
                    <span className={`whitespace-nowrap ${
                      index === pathSegments.length - 1 
                        ? 'text-gray-900 dark:text-white' 
                        : 'dark:text-gray-300'
                    }`}>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </span>
                  </div>
                ))}
              </nav>
            </div>
          </header>
        )}

        {/* Desktop Sidebar */}
        <motion.aside 
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="hidden md:block w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-2xl z-20"
        >
          <div className="p-6 h-full flex flex-col">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Boralli
                </span>
                <span className="text-gray-600 dark:text-gray-400 font-light">Dashboard</span>
              </h1>
            </div>

            <nav className="space-y-2 flex-1">
              {[
                { 
                  to: 'estabelecimentos', 
                  label: 'Estabelecimentos', 
                  icon: MapPin,
                  accent: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                },
                { 
                  to: 'produtos', 
                  label: 'Produtos', 
                  icon: Package,
                  accent: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                },
                { 
                  to: 'promocoes', 
                  label: 'Promoções', 
                  icon: Tag,
                  accent: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? `${item.accent} font-semibold shadow-sm` 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-current transition-transform" />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4" />
                    Modo Claro
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    Modo Escuro
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="w-3/4 h-full bg-white dark:bg-gray-800 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 h-full flex flex-col">
                  <nav className="space-y-4 flex-1">
                    {[
                      { 
                        to: 'estabelecimentos', 
                        label: 'Estabelecimentos', 
                        icon: MapPin,
                        accent: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      },
                      { 
                        to: 'produtos', 
                        label: 'Produtos', 
                        icon: Package,
                        accent: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      },
                      { 
                        to: 'promocoes', 
                        label: 'Promoções', 
                        icon: Tag,
                        accent: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                      },
                    ].map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `group flex items-center gap-4 p-3 rounded-xl transition-all
                          ${isActive 
                            ? `${item.accent} font-semibold` 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`
                        }
                      >
                        <item.icon className="w-6 h-6"/>
                        <span className="flex-1">{item.label}</span>
                      </NavLink>
                    ))}
                  </nav>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="p-2 space-y-2">
                      <button className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-3">
                        <User className="w-5 h-5"/>
                        Perfil
                      </button>
                      <button className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-3">
                        <Settings className="w-5 h-5"/>
                        Configurações
                      </button>
                      <button className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-3">
                        <LogOut className="w-5 h-5"/>
                        Sair
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-screen pb-20 md:pb-0">
          {/* Desktop Header */}
          {!isMobile && (
            <header className="mb-8 p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <Home className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    {pathSegments.map((segment, index) => (
                      <div key={segment} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className={`transition-colors ${
                          index === pathSegments.length - 1 
                            ? 'text-gray-900 dark:text-white' 
                            : 'hover:text-gray-700 dark:hover:text-gray-300'
                        }`}>
                          {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </span>
                      </div>
                    ))}
                  </nav>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 flex items-center gap-3">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Painel
                    </span>
                    de Controle
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button 
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center gap-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 p-3 rounded-xl transition-all shadow-sm border border-gray-200 dark:border-gray-600"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-medium shadow-md">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
                      </div>
                    </button>

                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
                      >
                        <div className="p-2 space-y-1">
                          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Perfil
                          </button>
                          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Configurações
                          </button>
                          <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            Sair
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </header>
          )}

          {/* Content Area */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mx-4 md:mx-6 my-4 md:my-6"
          >
            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </motion.section>

          {/* Decorations */}
          <div className="fixed -bottom-[300px] -left-[200px] w-[800px] h-[800px] bg-gradient-radial from-purple-100/50 to-transparent dark:from-purple-900/20 blur-[100px] -z-10" />
        </main>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-30 md:hidden">
            <div className="flex justify-around items-center h-16 px-2">
              {[
                { 
                  to: 'estabelecimentos', 
                  label: 'Estabelecimentos', 
                  icon: MapPin
                },
                { 
                  to: 'produtos', 
                  label: 'Produtos', 
                  icon: Package
                },
                { 
                  to: 'promocoes', 
                  label: 'Promoções', 
                  icon: Tag
                },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center w-20 h-full transition-all
                    ${isActive 
                      ? 'text-purple-600 dark:text-purple-400' 
                      : 'text-gray-500 dark:text-gray-400'}`
                  }
                >
                  {({ isActive }) => (
                    <div className="flex flex-col items-center space-y-1">
                      <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`}/>
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;