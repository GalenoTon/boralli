// src/pages/dashboard/DashboardLayout.tsx
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Package, Tag, User, Settings, LogOut, ChevronRight, Home, Menu, Bell } from 'lucide-react';

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications] = useState(3);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <header className="md:hidden sticky top-0 bg-white border-b border-gray-100 z-40 shadow-sm">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Boralli
              </span>
            </h1>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Bell className="w-5 h-5 text-gray-700"/>
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Menu className="w-5 h-5 text-gray-700"/>
              </button>
            </div>
          </div>

          <div className="px-4 pb-2">
            <nav className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto">
              <Home className="w-4 h-4 flex-shrink-0 text-gray-400"/>
              {pathSegments.map((segment, index) => (
                <div key={segment} className="flex items-center gap-2 flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-gray-300"/>
                  <span className={`whitespace-nowrap ${
                    index === pathSegments.length - 1 
                      ? 'text-gray-800 font-medium' 
                      : 'text-gray-400'
                  }`}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </span>
                </div>
              ))}
            </nav>
          </div>
        </header>
      )}

      {/* Desktop Sidebar Fixo */}
      <motion.aside 
        initial={{ x: -30 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 shadow-lg z-20 h-screen sticky top-0"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Boralli
              </span>
              <span className="text-gray-600 font-light">Painel</span>
            </h1>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 pb-4 space-y-2">
            {[
              { 
                to: 'estabelecimentos', 
                label: 'Estabelecimentos', 
                icon: MapPin,
                accent: 'bg-red-50 text-red-500 border-red-100'
              },
              { 
                to: 'produtos', 
                label: 'Produtos', 
                icon: Package,
                accent: 'bg-orange-50 text-orange-500 border-orange-100'
              },
              { 
                to: 'promocoes', 
                label: 'Promoções', 
                icon: Tag,
                accent: 'bg-amber-50 text-amber-500 border-amber-100'
              },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border
                  ${isActive 
                    ? `${item.accent} font-semibold shadow-sm` 
                    : 'text-gray-600 hover:bg-gray-50 border-transparent hover:border-gray-100'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-white shadow-sm' : 'group-hover:bg-gray-100'
                    }`}>
                      <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                    </div>
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className={`w-4 h-4 text-gray-400 group-hover:text-current transition-transform ${
                      isActive ? 'rotate-90' : ''
                    }`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-gray-100 pt-4 pb-6 px-6 flex-shrink-0">
            <div className="flex items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Ana Silva</p>
                <p className="text-xs text-gray-500">Gerente</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Desktop Header */}
        {!isMobile && (
          <header className="sticky top-10 z-30 bg-white shadow-sm border-b border-gray-100">
            {/* <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Home className="w-4 h-4 text-gray-400" />
                  {pathSegments.map((segment, index) => (
                    <div key={segment} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className={
                        index === pathSegments.length - 1 
                          ? 'text-gray-900 font-semibold' 
                          : 'hover:text-gray-700'
                      }>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </span>
                    </div>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Bell className="w-5 h-5 text-gray-700"/>
                    {notifications > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-3 bg-white hover:bg-gray-50 p-2 rounded-xl transition-all border border-gray-100"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Ana Silva</p>
                      <p className="text-xs text-gray-500">Gerente</p>
                    </div>
                  </button>

                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">Ana Silva</p>
                          <p className="text-xs text-gray-500">ana.silva@email.com</p>
                        </div>
                        <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center gap-2">
                          <Settings className="w-4 h-4 text-gray-500" />
                          Configurações
                        </button>
                        <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center gap-2">
                          <Bell className="w-4 h-4 text-gray-500" />
                          Notificações
                        </button>
                        <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          Perfil
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2">
                          <LogOut className="w-4 h-4" />
                          Sair
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div> */}
          </header>
        )}

        {/* Área de Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 mx-4 md:mx-6 my-4 md:my-6"
          >
            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </motion.section>
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-30 md:hidden">
            <div className="flex justify-around items-center h-16 px-2">
              {[
                { to: 'estabelecimentos', label: 'Locais', icon: MapPin },
                { to: 'produtos', label: 'Produtos', icon: Package },
                { to: 'promocoes', label: 'Promoções', icon: Tag },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center w-20 h-full transition-all
                    ${isActive ? 'text-red-500' : 'text-gray-500'}`
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
      </main>

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
              initial={{ x: -30 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-3/4 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Menu</h2>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700"/>
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-medium">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Ana Silva</p>
                      <p className="text-sm text-gray-500">Gerente</p>
                    </div>
                  </div>
                </div>
                
                <nav className="space-y-2 flex-1">
                  {[
                    { 
                      to: 'estabelecimentos', 
                      label: 'Estabelecimentos', 
                      icon: MapPin,
                      accent: 'bg-red-50 text-red-500'
                    },
                    { 
                      to: 'produtos', 
                      label: 'Produtos', 
                      icon: Package,
                      accent: 'bg-orange-50 text-orange-500'
                    },
                    { 
                      to: 'promocoes', 
                      label: 'Promoções', 
                      icon: Tag,
                      accent: 'bg-amber-50 text-amber-500'
                    },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `group flex items-center gap-4 p-3 rounded-xl transition-all
                        ${isActive 
                          ? `${item.accent} font-semibold` 
                          : 'text-gray-600 hover:bg-gray-50'}`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`p-2 rounded-lg transition-colors ${
                            isActive ? 'bg-white shadow-sm' : 'group-hover:bg-gray-100'
                          }`}>
                            <item.icon className="w-6 h-6"/>
                          </div>
                          <span className="flex-1">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>

                <div className="border-t border-gray-100 pt-4">
                  <div className="p-2 space-y-2">
                    <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center gap-3">
                      <Settings className="w-5 h-5 text-gray-500"/>
                      Configurações
                    </button>
                    <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-500"/>
                      Notificações
                    </button>
                    <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500"/>
                      Perfil
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
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
    </div>
  );
};

export default DashboardLayout;