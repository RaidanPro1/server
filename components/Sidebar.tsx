
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { TabType, NavItem } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  logoUrl?: string;
  menuItems: NavItem[];
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  logoUrl, 
  menuItems, 
  isCollapsed, 
  setIsCollapsed 
}) => {
  const { t } = useTranslation();

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={22} /> : <Icons.HelpCircle size={22} />;
  };

  const categories = {
    main: menuItems.filter(i => i.category === 'main' || !i.category),
    media: menuItems.filter(i => i.category === 'media'),
    support: menuItems.filter(i => i.category === 'support')
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed right-0 top-0 h-screen bg-press-dark text-white flex flex-col shadow-[10px_0_40px_rgba(0,0,0,0.4)] z-[60] border-l border-white/5"
    >
      <div className="p-4 flex items-center justify-between border-b border-white/5 h-20">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-press-yellow rounded-xl flex items-center justify-center shadow-lg shadow-press-yellow/20">
              <Icons.ShieldAlert color="#003399" size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-black text-press-yellow tracking-tighter leading-none">بيت الصحافة</h1>
          </motion.div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 hover:bg-white/10 rounded-xl transition-all ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? <Icons.ChevronLeft size={20} /> : <Icons.ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
        {Object.entries(categories).map(([key, items]) => (
          items.length > 0 && (
            <div key={key} className="space-y-1">
              {!isCollapsed && (
                <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                  {key === 'main' ? 'الرئيسية' : key === 'media' ? 'المركز الإعلامي' : 'الدعم والمساندة'}
                </p>
              )}
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.tab)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group
                    ${activeTab === item.tab 
                      ? 'bg-press-blue text-white shadow-xl shadow-press-blue/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span className={`transition-all duration-300 ${activeTab === item.tab ? 'text-press-yellow' : 'group-hover:text-press-yellow'}`}>
                    {renderIcon(item.iconName)}
                  </span>
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-bold truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {activeTab === item.tab && isCollapsed && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-press-yellow rounded-l-full shadow-[0_0_15px_#d4af37]" />
                  )}
                </button>
              ))}
            </div>
          )
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-3">
        <button
          onClick={() => setActiveTab('panic')}
          className={`w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-red-600/20 group overflow-hidden
            ${isCollapsed ? 'px-0' : 'gap-3'}`}
        >
          <Icons.Zap size={22} className={`${isCollapsed ? '' : 'group-hover:scale-125'} transition-transform animate-pulse`} />
          {!isCollapsed && <span>SOS الطوارئ</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
