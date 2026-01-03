
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldAlert, GraduationCap, SearchCheck, Newspaper, Activity, Users, MapPin, PlayCircle } from 'lucide-react';
import { TabType, SlideItem, TeamMember, Violation, NewsArticle, TrainingCourse } from '../types';

interface HomePageProps {
  onNav: (tab: TabType) => void;
  slides: SlideItem[];
  latestNews: NewsArticle[];
  latestViolations: Violation[];
  upcomingCourses: TrainingCourse[];
  team: TeamMember[];
}

const HomePage: React.FC<HomePageProps> = ({ onNav, slides, latestNews, latestViolations, upcomingCourses, team }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="space-y-24 pb-32">
      {/* Hero Slider */}
      <section className="relative h-[700px] rounded-[4rem] overflow-hidden shadow-2xl group border-4 border-white">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <img src={slides[currentSlide].image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-l from-press-dark/95 via-press-dark/40 to-transparent flex items-center p-16 lg:p-32">
              <div className="max-w-3xl space-y-8">
                <span className="bg-press-yellow text-press-blue px-8 py-2 rounded-full text-sm font-black uppercase tracking-widest">{slides[currentSlide].tag}</span>
                <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">{slides[currentSlide].title}</h1>
                <p className="text-2xl text-gray-200 font-medium leading-relaxed max-w-xl">{slides[currentSlide].description}</p>
                <button onClick={() => onNav(slides[currentSlide].linkTab)} className="bg-press-blue text-white px-12 py-5 rounded-2xl font-black transition-all hover:scale-105 flex items-center gap-4 shadow-2xl shadow-press-blue/20">
                  تعرف علينا أكثر <ArrowLeft size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Stats Quick Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'إجمالي الانتهاكات', value: '1,542', icon: ShieldAlert, color: 'text-red-500', tab: 'observatory' },
          { label: 'دورات تدريبية', value: '48', icon: GraduationCap, color: 'text-blue-500', tab: 'academy' },
          { label: 'أخبار موثقة', value: '3,200', icon: Newspaper, color: 'text-green-500', tab: 'news' },
          { label: 'تحقيقات المسبار', value: '890', icon: SearchCheck, color: 'text-yellow-500', tab: 'factcheck' }
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -10 }} onClick={() => onNav(stat.tab as TabType)} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex items-center gap-6 cursor-pointer hover:shadow-2xl transition-all">
             <div className={`p-5 rounded-2xl bg-gray-50 ${stat.color}`}><stat.icon size={32} /></div>
             <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
               <h4 className="text-3xl font-black text-press-dark">{stat.value}</h4>
             </div>
          </motion.div>
        ))}
      </section>

      {/* Latest Content Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* News Column */}
        <div className="lg:col-span-2 space-y-10">
           <div className="flex justify-between items-center border-r-8 border-press-blue pr-6">
             <h2 className="text-3xl font-black text-press-dark">آخر المستجدات</h2>
             <button onClick={() => onNav('news')} className="text-press-blue font-black text-sm hover:underline">عرض المركز الإعلامي</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {latestNews.slice(0, 2).map(news => (
               <div key={news.id} className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm group">
                  <div className="h-56 overflow-hidden relative">
                    <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    <div className="absolute top-4 right-4 bg-press-blue text-white text-[10px] font-black px-4 py-1.5 rounded-full">{news.category}</div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-xl font-black text-press-dark line-clamp-2">{news.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{news.summary}</p>
                    <button onClick={() => onNav('news')} className="text-press-blue font-black text-xs flex items-center gap-2">اقرأ الخبر <ArrowLeft size={14}/></button>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Training Sidebar */}
        <div className="bg-gray-900 rounded-[4rem] p-10 text-white space-y-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-press-yellow/10 rounded-full blur-[100px]" />
           <div className="relative z-10 flex items-center gap-4 border-r-4 border-press-yellow pr-4">
              <h2 className="text-2xl font-black">أكاديمية التدريب</h2>
           </div>
           <div className="space-y-6 relative z-10">
             {upcomingCourses.map(course => (
               <div key={course.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4 hover:bg-white/10 transition-all cursor-pointer">
                  <span className="text-[10px] font-black text-press-yellow uppercase">{course.category}</span>
                  <h4 className="font-black text-lg">{course.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <Activity size={14} /> يبدأ في: {course.startDate}
                  </div>
                  {course.zoomLink && (
                    <div className="flex items-center gap-2 text-green-400 text-xs font-black animate-pulse">
                      <PlayCircle size={14} /> متاح عبر زووم الآن
                    </div>
                  )}
               </div>
             ))}
             <button onClick={() => onNav('academy')} className="w-full bg-press-yellow text-press-blue font-black py-4 rounded-2xl shadow-xl shadow-press-yellow/10 mt-4">استكشف جميع الدورات</button>
           </div>
        </div>
      </div>

      {/* Profile/Mission Section */}
      <section className="bg-white p-16 lg:p-24 rounded-[5rem] border border-gray-100 flex flex-col lg:flex-row gap-16 items-center shadow-sm">
        <div className="flex-1 space-y-8">
           <h2 className="text-5xl font-black text-press-dark tracking-tighter">صحافة حرة من أجل الإنسان</h2>
           <p className="text-2xl text-gray-500 font-medium leading-loose">
             مؤسسة بيت الصحافة هي منظمة مجتمع مدني يمنية مستقلة، تهدف إلى تعزيز حرية الإعلام وخلق مساحة نقاش مهني للصحفيين للدفاع عن حقوقهم وتطوير مهاراتهم في أصعب الظروف.
           </p>
           <div className="flex gap-4">
              <div className="flex items-center gap-3 bg-gray-50 px-8 py-4 rounded-2xl border border-gray-100">
                 <Users className="text-press-blue" />
                 <span className="font-black text-press-dark text-lg">بيئة حاضنة للصحفيين</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-8 py-4 rounded-2xl border border-gray-100">
                 <MapPin className="text-press-yellow" />
                 <span className="font-black text-press-dark text-lg">تعز، الجمهورية اليمنية</span>
              </div>
           </div>
        </div>
        <div className="w-full lg:w-1/3 bg-press-light p-10 rounded-[4rem] border-4 border-white shadow-xl">
           <img src="https://ph-ye.org/logo.png" className="w-full drop-shadow-2xl" alt="Press House Logo" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
