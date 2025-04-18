// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Seção Marca */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Boralli</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Conectando você às melhores experiências locais. Descubra estabelecimentos exclusivos e ofertas especiais.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Navegação</h4>
            <nav className="space-y-2">
              <a href="/estabelecimentos" className="block text-gray-600 hover:text-amber-600 transition-colors text-sm">
                Estabelecimentos
              </a>
              <a href="/produtos" className="block text-gray-600 hover:text-amber-600 transition-colors text-sm">
                Produtos
              </a>
              <a href="/promocoes" className="block text-gray-600 hover:text-amber-600 transition-colors text-sm">
                Promoções
              </a>
              <a href="/sobre" className="block text-gray-600 hover:text-amber-600 transition-colors text-sm">
                Sobre Nós
              </a>
            </nav>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contato</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">Email: contato@boralli.com</p>
              <p className="text-gray-600">Telefone: (21) 99999-9999</p>
              <p className="text-gray-600">Rio de Janeiro - RJ</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Newsletter</h4>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Assinar Newsletter
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Copyright e Legais */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Boralli. Todos direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="/politica-privacidade" className="text-gray-600 hover:text-amber-600 text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos-servico" className="text-gray-600 hover:text-amber-600 text-sm transition-colors">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}