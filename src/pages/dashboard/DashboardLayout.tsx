// src/pages/dashboard/DashboardLayout.tsx
import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Package, Tag, Sun, Moon, User, Settings, LogOut, ChevronRight, Home } from 'lucide-react';

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar Moderno */}
      <motion.aside 
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="w-full md:w-64 bg-white border-r border-gray-200 shadow-2xl z-20"
      >
        <div className="p-6 h-full flex flex-col">
          {/* Cabeçalho do Sidebar */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Boralli
              </span>
              <span className="text-gray-600 font-light">Dashboard</span>
            </h1>
          </div>

          {/* Menu Principal */}
          <nav className="space-y-2 flex-1">
            {[
              { 
                to: 'estabelecimentos', 
                label: 'Estabelecimentos', 
                icon: MapPin,
                accent: 'bg-purple-100 text-purple-600'
              },
              { 
                to: 'produtos', 
                label: 'Produtos', 
                icon: Package,
                accent: 'bg-emerald-100 text-emerald-600'
              },
              { 
                to: 'promocoes', 
                label: 'Promoções', 
                icon: Tag,
                accent: 'bg-amber-100 text-amber-600'
              },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                  ${isActive 
                    ? `${item.accent} font-semibold shadow-sm` 
                    : 'text-gray-600 hover:bg-gray-50'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-current transition-transform" />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer do Sidebar */}
          <div className="border-t border-gray-200 pt-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-full p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all text-sm font-medium text-gray-700 flex items-center justify-center gap-2"
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

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-gray-50/50 to-white/50">
        <div className="p-6 max-w-screen-2xl mx-auto">
          {/* Cabeçalho Superior */}
          <header className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Breadcrumb Moderno */}
              <div className="flex-1">
                <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Home className="w-4 h-4 text-gray-400" />
                  {pathSegments.map((segment, index) => (
                    <div key={segment} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className={`transition-colors ${
                        index === pathSegments.length - 1 
                          ? 'text-gray-900' 
                          : 'hover:text-gray-700'
                      }`}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </span>
                    </div>
                  ))}
                </nav>
                <h2 className="text-3xl font-bold text-gray-900 mt-3 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Painel
                  </span>
                  de Controle
                </h2>
              </div>

              {/* Controles Superiores */}
              <div className="flex items-center gap-4">
                {/* Menu do Usuário */}
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-xl transition-all shadow-sm border border-gray-200"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-medium shadow-md">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">Administrador</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200"
                    >
                      <div className="p-2 space-y-1">
                        <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-purple-50 rounded-lg transition flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Perfil
                        </button>
                        <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-purple-50 rounded-lg transition flex items-center gap-2">
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

          {/* Área de Conteúdo Dinâmico */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <div className="p-6">
              <Outlet />
            </div>
          </motion.section>

          {/* Elementos Decorativos */}
          <div className="fixed -bottom-[300px] -left-[200px] w-[800px] h-[800px] bg-gradient-radial from-purple-100/50 to-transparent blur-[100px] -z-10" />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;