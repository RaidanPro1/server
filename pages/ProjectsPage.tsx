
import React from 'react';
import { motion } from 'framer-motion';
import { REAL_PROJECTS, PARTNERS } from '../constants';
import { Briefcase, Handshake, CheckCircle, ArrowLeft } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      <section className="space-y-16">
        <div className="flex items-center gap-6 border-r-8 border-press-blue pr-6">
           <div className="p-4 bg-press-blue text-white rounded-3xl shadow-xl shadow-press-blue/20">
             <Briefcase size={44} />
           </div>
           <div>
             <h1 className="text-4xl lg:text-5xl font-black text-press-dark tracking-tighter">مشاريعنا الاستراتيجية</h1>
             <p className="text-gray-400 font-bold mt-2">نعمل على تحويل التحديات إلى فرص للنمو المهني</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          {REAL_PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`bg-white rounded-[4rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col lg:flex-row hover:shadow-2xl transition-all group ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-[45%] h-80 lg:h-auto bg-gray-100 overflow-hidden">
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-12 lg:p-20 space-y-8 flex-1 flex flex-col justify-center">
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-press-blue tracking-tighter">{project.title}</h3>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">{project.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {project.activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:border-press-blue/30 transition-colors">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0"><CheckCircle size={18} /></div>
                      <span className="text-sm font-black text-gray-600">{act}</span>
                    </div>
                  ))}
                </div>
                <button className="self-start flex items-center gap-3 text-press-blue font-black hover:gap-6 transition-all pt-6">
                  استكشف تفاصيل المشروع <ArrowLeft size={24} className="text-press-yellow" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-press-dark p-16 lg:p-24 rounded-[5rem] text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,30,0.5)]">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="grid grid-cols-12 gap-4 h-full">
             {Array.from({length: 48}).map((_, i) => <div key={i} className="border-r border-b border-white/10"></div>)}
           </div>
        </div>
        
        <div className="text-center space-y-6 relative z-10">
           <div className="w-24 h-24 bg-press-yellow/20 rounded-[2.5rem] flex items-center justify-center mx-auto text-press-yellow shadow-inner">
             <Handshake size={56} />
           </div>
           <h1 className="text-5xl font-black uppercase tracking-widest text-press-yellow">شركاء النجاح</h1>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
             نعتز بشراكتنا مع المؤسسات الرائدة لتعزيز العمل الحقوقي والإعلامي في اليمن وضمان استدامة الأثر.
           </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 lg:gap-16 pt-16 relative z-10">
          {PARTNERS.map((partner) => (
            <motion.div 
              key={partner.id} 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 hover:border-press-yellow transition-all flex flex-col items-center gap-6 group grayscale hover:grayscale-0 shadow-xl"
            >
               <div className="h-20 flex items-center justify-center">
                 <img src={partner.logo} alt={partner.name} className="max-h-full max-w-[180px] object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
               </div>
               <span className="text-sm font-black text-gray-400 group-hover:text-press-yellow transition-colors uppercase tracking-widest">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
