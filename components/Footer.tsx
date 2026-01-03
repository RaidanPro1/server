
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Facebook, Mail, Phone, MapPin, Settings, MessageCircle, Send } from 'lucide-react';
import { TabType, NavItem } from '../types';
import { CONTACT_INFO } from '../constants';

interface FooterProps {
  onNav: (tab: TabType) => void;
  menuItems: NavItem[];
}

const Footer: React.FC<FooterProps> = ({ onNav, menuItems }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16 border-b border-white/5 pb-16">
          <div className="space-y-6 lg:col-span-1">
            <h2 className="text-3xl font-black text-press-yellow tracking-tighter underline decoration-press-blue decoration-4">بيت الصحافة</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              مؤسسة مجتمع مدني يمنية تهدف إلى تعزيز حرية الإعلام وخلق مساحة نقاش مهني للصحفيين من أجل الإنسان أولاً وأخيراً.
            </p>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.facebook} target="_blank" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-press-blue hover:scale-110 transition-all border border-white/10"><Facebook size={18} /></a>
              <a href={`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}`} target="_blank" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all border border-white/10"><MessageCircle size={18} /></a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black border-r-4 border-press-blue pr-3 text-press-yellow">روابط سريعة</h3>
            <ul className="space-y-3 text-gray-400 text-sm font-bold">
              {menuItems.filter(item => item.isVisible).map(item => (
                <li key={item.id}>
                  <button onClick={() => onNav(item.tab)} className="hover:text-press-yellow transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
              <li><button onClick={() => onNav('login')} className="flex items-center gap-2 text-press-yellow/60 hover:text-press-yellow font-bold mt-4"><Settings size={14} /> لوحة الإدارة</button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black border-r-4 border-press-blue pr-3 text-press-yellow">اتصل بنا</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-press-yellow shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-press-yellow shrink-0" />
                <span dir="ltr">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-press-yellow shrink-0" />
                {CONTACT_INFO.email}
              </li>
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <h3 className="text-lg font-black border-r-4 border-press-blue pr-3 text-press-yellow">النشرة البريدية</h3>
            <p className="text-xs text-gray-400 font-bold">اشترك لصلك آخر التقارير والأخبار الحقوقية فور صدورها.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-4 pl-12 text-sm focus:ring-2 focus:ring-press-yellow outline-none transition-all"
                  required
                />
                <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 text-press-yellow hover:scale-110 transition-transform">
                  <Send size={20} />
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-[10px] font-black animate-bounce">تم الاشتراك بنجاح!</p>
              )}
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-xs font-bold text-center md:text-right">
            &copy; {new Date().getFullYear()} مؤسسة بيت الصحافة (Press House). جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-wider">Powered By</span>
            <a href="https://raidan.bio" target="_blank" rel="noopener noreferrer" className="text-press-yellow text-xs font-black uppercase tracking-widest hover:underline hover:text-white transition-colors">Raidan Pro</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
