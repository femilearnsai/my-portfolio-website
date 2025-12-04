import React from 'react';

export function Footer(){
  return (
    <footer className="footer-fixed">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between small">
        <div>© {new Date().getFullYear()} Oluwapelumi Awoyale</div>
        <div className="small">Lawyer • Builder • Writer</div>
      </div>
    </footer>
  );
}
