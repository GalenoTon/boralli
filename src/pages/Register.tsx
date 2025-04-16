// src/pages/Register.tsx
import React, { useState } from 'react';
import { FiLock, FiMail, FiShoppingBag, FiUser, FiArrowRight, FiUsers } from 'react-icons/fi';

export default function Register() {
  const [userType, setUserType] = useState('cliente');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não conferem. Por favor, verifique.');
      return;
    }
    console.log('Tipo de usuário:', userType, 'Nome:', name, 'Email:', email, 'Senha:', password);
    localStorage.setItem('authToken', 'simulatedToken');
    alert('Registro realizado com sucesso!');
  };

  return (
    <div className="min-h-screen flex">
      {/* Seção Esquerda - Formulário */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mb-4 inline-block bg-primary-100 p-4 rounded-2xl transition-all duration-300">
              <FiUsers className="w-12 h-12 text-primary-600 transition-transform duration-300 hover:scale-110" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-primary-600 to-amber-600 bg-clip-text text-transparent">
              Crie sua conta
            </h1>
            <p className="text-gray-500 text-lg">
              {userType === 'cliente' 
                ? 'Junte-se à melhor comunidade' 
                : 'Comece a gerenciar seu negócio'}
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
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 transition-all placeholder-gray-300"
                  placeholder="Nome completo"
                />
              </div>

              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 transition-all placeholder-gray-300"
                  placeholder="seuemail@exemplo.com"
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

              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-600 transition-all placeholder-gray-300"
                  placeholder="Confirmar senha"
                />
              </div>
            </div>

            {/* Botão de Registro */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-amber-500 hover:from-primary-600 hover:to-amber-600 text-white font-medium py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Criar conta
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Link de Login */}
            <p className="text-center text-sm text-gray-600">
              Já tem conta?{' '}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors border-b-2 border-transparent hover:border-primary-500"
              >
                Faça login
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
                ? 'Faça Parte da Comunidade' 
                : 'Transforme Seu Negócio'}
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              {userType === 'cliente'
                ? 'Acesso a benefícios exclusivos e personalização total da sua experiência'
                : 'Ferramentas profissionais para gestão e crescimento do seu estabelecimento'}
            </p>
            {/* <div className="flex justify-center space-x-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                {userType === 'cliente' ? '🎁 Vantagens' : '📈 Crescimento'}
              </div>
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                {userType === 'cliente' ? '❤️ Personalização' : '📊 Controle'}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}