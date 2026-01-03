
import React from 'react';
import { motion } from 'framer-motion';
import { OPPORTUNITIES } from '../constants';
import { UserPlus, Briefcase, Heart, Calendar, MapPin, ArrowLeft } from 'lucide-react';

const JoinUsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-24">
      <header className="text-center space-y-4">
        <div className="w-20 h-20 bg-press-yellow/20 text-press-yellow rounded-3xl flex items-center justify-center mx-auto">
          <UserPlus size={44} />
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-press-dark tracking-tighter">كن جزءاً من التغيير</h1>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">نحن نبحث دائماً عن المبدعين والمتحمسين لتعزيز حرية الإعلام وحماية حقوق الصحفيين في اليمن.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="space-y-8">
          <h2 className="text-2xl font-black flex items-center gap-3 text-press-blue">
            <Briefcase /> الفرص الحالية
          </h2>
          <div className="space-y-6">
            {OPPORTUNITIES.map((opp) => (
              <motion.div 
                key={opp.id}
                whileHover={{ x: -10 }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4"
              >
                <div className="flex justify-between items-start">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${opp.type === 'job' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                    {opp.type === 'job' ? 'وظيفة شاغرة' : 'تطوع'}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                    <Calendar size={14} /> {opp.deadline}
                  </div>
                </div>
                <h3 className="text-xl font-black text-press-dark">{opp.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{opp.description}</p>
                <div className="flex items-center gap-2 text-press-blue text-xs font-bold">
                  <MapPin size={14} /> {opp.location}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-8">
          <h2 className="text-2xl font-black text-press-dark">استمارة التقديم الموحدة</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="الاسم الكامل" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-press-blue outline-none" />
              <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-press-blue outline-none" />
            </div>
            <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-press-blue outline-none">
              <option>اختر الفرصة المهتم بها</option>
              {OPPORTUNITIES.map(o => <option key={o.id}>{o.title}</option>)}
            </select>
            <textarea placeholder="لماذا ترغب في الانضمام إلينا؟" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-press-blue outline-none h-32 resize-none"></textarea>
            <div className="p-4 border-2 border-dashed border-gray-100 rounded-2xl text-center">
              <p className="text-xs text-gray-400 font-bold">ارفق السيرة الذاتية (PDF)</p>
            </div>
            <button className="w-full bg-press-blue text-white font-black py-4 rounded-2xl shadow-xl shadow-press-blue/20 hover:scale-[1.02] transition-all">إرسال الطلب</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default JoinUsPage;
