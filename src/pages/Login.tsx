// src/pages/Login.tsx
import React, { useState } from 'react';
import { FiLock, FiMail, FiShoppingBag, FiUser, FiArrowRight } from 'react-icons/fi';

export default function Login() {
  const [userType, setUserType] = useState('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de autenticação
    console.log('Login realizado:', { userType, email, password });
    localStorage.setItem('authToken', 'simulatedToken');
    alert('Login bem-sucedido!');
  };

  return (
    <div className="min-h-screen flex">
      {/* Seção Esquerda - Formulário */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mb-4 inline-block bg-primary-100 p-4 rounded-2xl transition-all duration-300">
              {userType === 'cliente' ? (
                <FiUser className="w-12 h-12 text-primary-600 transition-transform duration-300 hover:scale-110" />
              ) : (
                <FiShoppingBag className="w-12 h-12 text-primary-600 transition-transform duration-300 hover:scale-110" />
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-primary-600 to-amber-600 bg-clip-text text-transparent">
              {userType === 'cliente' ? 'Bem-vindo de volta!' : 'Acesse sua loja'}
            </h1>
            <p className="text-gray-500 text-lg">
              {userType === 'cliente' 
                ? 'Gerencie seus favoritos e pedidos' 
                : 'Administre seu estabelecimento'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Seletor de Tipo de Usuário */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-full max-w-xs mx-auto shadow-inner">
              <button
                type="button"
                onClick={() => setUserType('cliente')}
                className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  userType === 'cliente'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-200'
                }`}
              >
                <FiUser className="w-4 h-4" /> Cliente
              </button>
              <button
                type="button"
                onClick={() => setUserType('lojista')}
                className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  userType === 'lojista'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-200'
                }`}
              >
                <FiShoppingBag className="w-4 h-4" /> Lojista
              </button>
            </div>

            {/* Campos do Formulário */}
            <div className="space-y-6">
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 transition-all placeholder-gray-300"
                  placeholder="Email"
                />
              </div>
              
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 transition-all placeholder-gray-300"
                  placeholder="Senha"
                />
              </div>
            </div>

            {/* Opções Adicionais */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                />
                <span className="text-gray-600">Lembrar-me</span>
              </label>
              <a
                href="/recuperar-senha"
                className="text-primary-600 hover:text-primary-500 transition-colors font-medium"
              >
                Esqueceu a senha?
              </a>
            </div>

            {/* Botão de Login */}
            <div className='flex items-center justify-center'>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-amber-500 hover:from-primary-600 hover:to-amber-600 text-white font-medium py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {userType === 'cliente' ? 'Acessar minha conta' : 'Entrar no painel'}
              <FiArrowRight className="w-5 h-5" />
            </button>
            </div>

            {/* Link de Registro */}
            <p className="text-center text-sm text-gray-600">
              Não tem conta?{' '}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors border-b-2 border-transparent hover:border-primary-500"
              >
                Criar conta {userType === 'lojista' ? 'de lojista' : ''}
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Seção Direita - Visual */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-gradient-to-tr from-primary-500 to-amber-500 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/inspiration-geometry.png')]" />
        
        {/* Elementos Flutuantes */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-white/5 rounded-full blur-lg animate-float-delayed"></div>
        
        <div className="relative max-w-2xl text-white text-center z-10 space-y-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 shadow-2xl">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              {userType === 'cliente' 
                ? 'Descubra Experiências Únicas' 
                : 'Potencialize Seu Negócio'}
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              {userType === 'cliente'
                ? 'Acesso prioritário a ofertas exclusivas e personalização completa'
                : 'Controle integrado de estoque, vendas e relacionamento com clientes'}
            </p>
            {/* <div className="flex justify-center space-x-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                {userType === 'cliente' ? '🎁 Ofertas' : '📈 Analytics'}
              </div>
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                {userType === 'cliente' ? '❤️ Favoritos' : '📊 Relatórios'}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}