// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Autenticação
import Login from './pages/Login';
import Register from './pages/Register';

// Páginas Públicas
import Home from './pages/Home';
import Favoritos from './pages/Favoritos';

// Listagens Públicas
import Estabelecimentos from './pages/Estabelecimentos';
import Produtos from './pages/Produtos';
import Promocoes from './pages/Promocoes';

// Detalhes Públicos
import EstabelecimentoPage from './pages/Estabelecimento';
import ProdutoPage from './pages/Produto';
import PromocaoPage from './pages/Promocao';

// Dashboard (CRUD)
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardEstabelecimentos from './pages/dashboard/DashboardEstabelecimentos';
import DashboardEstabelecimentoEdit from './pages/dashboard/DashboardEstabelecimentoEdit';
import DashboardProdutos from './pages/dashboard/DashboardProdutos';
import DashboardPromocoes from './pages/dashboard/DashboardPromocoes';

// Componentes Globais
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  // Não usar container central para login e registro
  const noContainer = ['/login', '/register'];
  const mainClasses = noContainer.includes(location.pathname)
    ? 'flex-grow'
    : 'flex-grow container mx-auto p-4';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className={mainClasses}>
        <Routes>
          {/* Autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Home e Favoritos */}
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />

          {/* Estabelecimentos */}
          <Route path="/estabelecimentos" element={<Estabelecimentos />} />
          <Route path="/estabelecimento/:id" element={<EstabelecimentoPage />} />

          {/* Produtos */}
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/:id" element={<ProdutoPage />} />

          {/* Promoções */}
          <Route path="/promocoes" element={<Promocoes />} />
          <Route path="/promocao/:id" element={<PromocaoPage />} />

          {/* Dashboard CRUD */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="estabelecimentos" element={<DashboardEstabelecimentos />} />
            <Route path="estabelecimentos/:id/edit" element={<DashboardEstabelecimentoEdit />} />
            <Route path="produtos" element={<DashboardProdutos />} />
            <Route path="promocoes" element={<DashboardPromocoes />} />
          </Route>

          {/* Catch‑All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
