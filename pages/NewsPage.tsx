
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsArticle, TabType } from '../types';
import { Calendar, Share2, Eye, ArrowLeft, ShieldAlert, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface NewsPageProps {
  news: NewsArticle[];
  onNavigate: (tab: TabType, params?: any) => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ news, onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleShare = async (article: NewsArticle) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      alert('تم نسخ رابط الخبر للمشاركة: ' + window.location.href);
    }
  };

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-r-8 border-press-yellow pr-8">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-press-dark tracking-tighter">المركز الإعلامي</h1>
          <p className="text-gray-500 font-bold mt-2">توثيق الحدث، صناعة التأثير، وحماية الحقيقة</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white border border-gray-100 p-2 rounded-2xl flex gap-2">
            <button className="bg-press-blue text-white px-4 py-2 rounded-xl text-xs font-black">الكل</button>
            <button className="text-gray-400 hover:text-press-blue px-4 py-2 rounded-xl text-xs font-black">تقارير</button>
            <button className="text-gray-400 hover:text-press-blue px-4 py-2 rounded-xl text-xs font-black">فعاليات</button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {news.map((item) => (
          <motion.article 
            layout
            key={item.id}
            className="bg-white rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                <span className="bg-press-blue text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase shadow-lg">
                  {item.category}
                </span>
                {item.relatedViolationId && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('observatory', { violationId: item.relatedViolationId });
                    }}
                    className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase shadow-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
                  >
                    <ShieldAlert size={12} /> مرتبط بانتهاك
                  </button>
                )}
              </div>
            </div>

            <div className="p-10 space-y-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                <div className="flex items-center gap-2"><Calendar size={14} className="text-press-yellow" /> {item.date}</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> موثق</div>
              </div>

              <h3 className="text-2xl font-black text-press-dark leading-tight group-hover:text-press-blue transition-colors">
                {item.title}
              </h3>

              <div className="text-gray-500 font-medium leading-relaxed">
                {expandedId === item.id ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <p>{item.summary}</p>
                    <p className="border-t border-gray-50 pt-4 text-gray-600 italic">
                      {item.content}
                    </p>
                  </motion.div>
                ) : (
                  <p className="line-clamp-3">{item.summary}</p>
                )}
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
                <button 
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="flex items-center gap-2 text-press-blue font-black text-sm group/btn"
                >
                  {expandedId === item.id ? (
                    <>أقل <ChevronUp size={18} /></>
                  ) : (
                    <>اقرأ المزيد <ChevronDown size={18} className="group-hover/btn:translate-y-1 transition-transform" /></>
                  )}
                </button>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare(item)}
                    className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-press-blue hover:text-white transition-all shadow-sm"
                    title="مشاركة"
                  >
                    <Share2 size={18} />
                  </button>
                  <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-press-yellow hover:text-press-blue transition-all shadow-sm">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <section className="bg-press-dark rounded-[4.5rem] p-16 lg:p-24 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-press-blue/10 rounded-full blur-[120px]" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-press-yellow">اشترك في النشرة الإخبارية</h2>
            <p className="text-gray-400 text-xl font-medium leading-relaxed">
              كن أول من يتلقى تقاريرنا الحقوقية، أخبار الحريات، وفعاليات المؤسسة مباشرة في بريدك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-4 text-white font-bold outline-none focus:ring-2 focus:ring-press-yellow"
              />
              <button className="bg-press-yellow text-press-blue px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform">
                اشتراك الآن
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
             <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-md space-y-6">
                <div className="w-16 h-16 bg-press-yellow rounded-2xl flex items-center justify-center text-press-blue">
                   <ShieldAlert size={32} />
                </div>
                <h4 className="text-xl font-black">أمن البيانات</h4>
                <p className="text-sm text-gray-400 font-medium">نحن نلتزم بأعلى معايير الخصوصية، بياناتك مشفرة ولن يتم مشاركتها أبداً.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
