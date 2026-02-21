import React from 'react';
import { Home, Trophy, Newspaper, ShoppingBag, User, LayoutGrid } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/squad', icon: Trophy, label: 'Jogos' },
    { to: '/chat', icon: Newspaper, label: 'Notícias' },
    { to: '/store', icon: ShoppingBag, label: 'Loja' },
    { to: '/menu', icon: LayoutGrid, label: 'Menu' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[#0d1b3f]/10 bg-white/90 px-2 pb-6 pt-3 backdrop-blur-lg">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cn(
            "flex flex-col items-center gap-1 transition-colors",
            isActive ? "text-[#0d1b3f]" : "text-[#0d1b3f]/40"
          )}
        >
          <item.icon className={cn("w-6 h-6", item.to === '/' && "fill-current")} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
