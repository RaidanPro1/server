
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Calendar, Clock, User, 
  PlayCircle, FileText, CheckCircle, ArrowLeft, 
  X, ShieldCheck, Award 
} from 'lucide-react';
import { TrainingCourse, Trainer } from '../types';
import { MOCK_COURSES, MOCK_TRAINERS } from '../constants';

const Academy: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);

  return (
    <div className="space-y-20 pb-32">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-r-8 border-press-blue pr-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-press-dark tracking-tighter">أكاديمية بيت الصحافة</h1>
          <p className="text-gray-500 font-bold text-lg">بناء القدرات، تمكين الصحفيين، وصناعة المستقبل الإعلامي في اليمن.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-4 px-6">
              <div className="w-10 h-10 bg-press-yellow/10 text-press-yellow rounded-xl flex items-center justify-center"><Award /></div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-gray-400 uppercase">الشهادات الممنوحة</p>
                 <p className="text-xl font-black text-press-dark">1,240+</p>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_COURSES.map(course => {
          const trainer = MOCK_TRAINERS.find(t => t.id === course.trainerId);
          return (
            <motion.div 
              key={course.id} 
              whileHover={{ y: -15 }} 
              className="bg-white rounded-[4rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full"
            >
              <div className="h-64 relative overflow-hidden">
                <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute top-6 right-6 bg-press-blue text-white text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-lg">
                  {course.category}
                </div>
              </div>
              
              <div className="p-10 space-y-6 flex-1 flex flex-col text-right">
                <h3 className="text-2xl font-black text-press-dark leading-tight group-hover:text-press-blue transition-colors">
                  {course.title}
                </h3>
                
                <button 
                  onClick={() => trainer && setSelectedTrainer(trainer)}
                  className="flex items-center gap-3 text-gray-400 hover:text-press-yellow transition-colors font-bold text-sm w-fit"
                >
                  <User size={18} className="text-press-yellow" />
                  مدرب الدورة: {trainer?.name}
                </button>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <Calendar size={14} className="text-press-blue" /> {course.startDate}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <Clock size={14} className="text-press-blue" /> 4 أسابيع
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-press-blue text-white font-black py-4 rounded-2xl shadow-xl shadow-press-blue/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    تفاصيل التسجيل <ArrowLeft size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trainer Detail Modal */}
      <AnimatePresence>
        {selectedTrainer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-press-dark/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[4rem] max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-8 left-8 p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col md:flex-row">
                 <div className="w-full md:w-1/2 h-80 md:h-auto overflow-hidden">
                    <img src={selectedTrainer.image} className="w-full h-full object-cover" alt="" />
                 </div>
                 <div className="p-12 space-y-6 flex-1 text-right">
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black text-press-dark">{selectedTrainer.name}</h2>
                       <p className="text-press-blue font-black text-sm uppercase">{selectedTrainer.role}</p>
                    </div>
                    <p className="text-gray-500 font-medium leading-relaxed">{selectedTrainer.bio}</p>
                    <div className="space-y-4 pt-4">
                       <h4 className="font-black text-press-dark text-sm">مجالات الخبرة:</h4>
                       <div className="flex flex-wrap gap-2">
                          {selectedTrainer.expertise.map((exp, i) => (
                             <span key={i} className="bg-gray-100 px-4 py-1.5 rounded-xl text-xs font-bold text-gray-600">{exp}</span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Academy;
