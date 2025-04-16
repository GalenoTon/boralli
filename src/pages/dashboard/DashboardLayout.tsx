// src/pages/dashboard/DashboardLayout.tsx
import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiMapPin, FiPackage, FiDollarSign, FiChevronRight, FiUser, FiSettings, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Sidebar Ampliado */}
      <motion.aside 
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-full md:w-80 bg-gray-800 border-r border-gray-700 shadow-2xl z-20"
      >
        <div className="p-8 h-full flex flex-col">
          {/* Cabeçalho do Sidebar */}
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-xl">
                <FiHome className="text-3xl text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Boralli Admin
              </h1>
            </div>
          </div>

          {/* Menu Principal */}
          <nav className="space-y-3 flex-1">
            {[
              { to: 'estabelecimentos', icon: FiMapPin, label: 'Estabelecimentos', color: 'from-orange-400 to-amber-500' },
              { to: 'produtos', icon: FiPackage, label: 'Produtos', color: 'from-blue-400 to-indigo-500' },
              { to: 'promocoes', icon: FiDollarSign, label: 'Promoções', color: 'from-indigo-400 to-purple-500' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${item.color} shadow-lg` 
                      : 'bg-gray-700 hover:bg-gray-600'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`text-2xl ${isActive ? 'text-white' : 'text-gray-300'}`} />
                      <span className={`text-lg ${isActive ? 'text-white font-bold' : 'text-gray-300'}`}>
                        {item.label}
                      </span>
                      <FiChevronRight className="ml-auto text-orange-300 opacity-0 group-hover:opacity-100 transition-all" />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 min-h-screen relative overflow-x-hidden">
        <div className="p-8 max-w-screen-2xl mx-auto">
          {/* Cabeçalho Superior */}
          <header className="mb-12">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {/* Breadcrumb Estilizado */}
              <div className="flex-1">
                <nav className="flex items-center gap-3 text-lg">
                  {pathSegments.map((segment, index) => (
                    <div key={segment} className="flex items-center gap-3">
                      {index > 0 && <FiChevronRight className="text-orange-300" />}
                      <span className={`px-4 py-2 rounded-xl flex items-center gap-3 ${
                        index === pathSegments.length - 1 
                          ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300' 
                          : 'text-gray-400 hover:bg-gray-700'
                      }`}>
                        {index === 0 && <FiHome className="text-orange-300" />}
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </span>
                    </div>
                  ))}
                </nav>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mt-4">
                  Painel de Controle
                </h2>
              </div>

              {/* Controles Superiores */}
              <div className="flex items-center gap-6">
                {/* Toggle Dark Mode */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 rounded-2xl bg-gray-700 hover:bg-orange-500/20 transition-all"
                >
                  {darkMode ? (
                    <FiSun className="text-2xl text-amber-300" />
                  ) : (
                    <FiMoon className="text-2xl text-blue-300" />
                  )}
                </button>

                {/* Menu do Usuário */}
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-4 bg-gray-700 hover:bg-orange-500/20 p-4 rounded-2xl transition-all"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white shadow-xl">
                      <FiUser className="text-xl" />
                    </div>
                    <div className="text-left hidden xl:block">
                      <p className="text-lg font-bold text-gray-100">John Doe</p>
                      <p className="text-sm text-orange-400">Administrador</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-4 w-64 bg-gray-800 rounded-2xl shadow-2xl border border-orange-500/20"
                    >
                      <div className="p-2 space-y-2">
                        <button className="flex items-center gap-4 w-full px-6 py-3 text-gray-300 hover:bg-orange-500/20 rounded-xl transition">
                          <FiUser className="text-orange-400" />
                          Perfil
                        </button>
                        <button className="flex items-center gap-4 w-full px-6 py-3 text-gray-300 hover:bg-blue-500/20 rounded-xl transition">
                          <FiSettings className="text-blue-400" />
                          Configurações
                        </button>
                        <button className="flex items-center gap-4 w-full px-6 py-3 text-red-400 hover:bg-red-500/20 rounded-xl transition">
                          <FiLogOut className="text-lg" />
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-3xl shadow-2xl border border-orange-500/20 transition-all"
          >
            <div className="p-8">
              <Outlet />
            </div>
          </motion.section>

          {/* Elementos Decorativos */}
          <div className="fixed -bottom-[500px] -left-[300px] w-[1200px] h-[1200px] bg-gradient-radial from-orange-500/10 to-transparent blur-[150px] -z-10" />
          <div className="fixed -top-[300px] -right-[200px] w-[1000px] h-[1000px] bg-gradient-radial from-blue-500/10 to-transparent blur-[120px] -z-10" />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;