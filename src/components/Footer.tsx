// src/components/Footer.tsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white shadow p-4 text-center text-sm">
      <p className="text-gray-600">
        © {new Date().getFullYear()} Boralli. Todos os direitos reservados.
      </p>
    </footer>
  );
}
