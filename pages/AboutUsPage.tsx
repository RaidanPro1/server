
import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { REAL_TEAM } from '../constants';
import ContactSection from '../components/ContactSection';
import { PageContent, TeamMember } from '../types';

interface AboutUsPageProps {
  showContact?: boolean;
  pagesContent?: PageContent;
  team?: TeamMember[];
  siteLogo?: string;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ showContact = false, pagesContent, team = REAL_TEAM, siteLogo }) => {
  const content = pagesContent?.about || {
    heroTitle: 'صحافة حرة من أجل الإنسان',
    heroDescription: 'مؤسسة مجتمع مدني يمنية مستقلة تهدف إلى تعزيز حرية الإعلام وحماية حقوق الصحفيين.',
    vision: 'صحافة مهنية حرة أولويتها الإنسان',
    mission: 'تعزيز حرية الصحافة وحمل مطالبها والدفاع عن استحقاقاتها.',
    goals: [
      { text: "إيجاد مساحات نقاش عملية ومهنية للصحفيين.", iconName: "MessageSquare" },
      { text: "توفير حاضنة أعمال صحفية ومساحات عمل مجانية.", iconName: "Home" },
      { text: "الدفاع عن حرية الصحافة وتطوير مهارات الوسط الإعلامي.", iconName: "ShieldCheck" }
    ]
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={32} /> : <Icons.Target size={32} />;
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="bg-white rounded-[3.5rem] p-12 lg:p-20 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-16 items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-press-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-press-yellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="flex-1 space-y-10 z-10 text-right">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-press-blue text-white px-8 py-3 rounded-2xl text-sm font-black shadow-2xl shadow-press-blue/20"
          >
            <Icons.Shield size={20} /> مؤسسة بيت الصحافة
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-press-dark leading-tight tracking-tighter"
          >
            {content.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-500 font-medium leading-loose max-w-3xl"
          >
            {content.heroDescription}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="w-full lg:w-1/3 flex justify-center z-10"
        >
          <img 
            src={siteLogo || "logp.png"} 
            alt="Press House Logo" 
            className="w-full max-w-[400px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500" 
          />
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          whileHover={{ y: -15, rotate: 1 }} 
          className="bg-press-dark p-16 rounded-[4rem] text-white space-y-8 shadow-2xl text-right relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
             <Icons.Eye size={120} />
          </div>
          <div className="flex items-center gap-6 justify-end">
             <h3 className="text-4xl font-black text-press-yellow">رؤيتنا</h3>
             <div className="p-5 bg-press-yellow rounded-[2rem] text-press-dark shadow-xl shadow-press-yellow/20"><Icons.Eye size={44} /></div>
          </div>
          <p className="text-3xl font-black leading-relaxed relative z-10 italic">"{content.vision}"</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -15, rotate: -1 }} 
          className="bg-press-blue p-16 rounded-[4rem] text-white space-y-8 shadow-2xl text-right relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
             <Icons.MessageSquare size={120} />
          </div>
          <div className="flex items-center gap-6 justify-end">
             <h3 className="text-4xl font-black text-press-yellow">رسالتنا</h3>
             <div className="p-5 bg-press-yellow rounded-[2rem] text-press-blue shadow-xl shadow-press-yellow/20"><Icons.MessageSquare size={44} /></div>
          </div>
          <p className="text-xl font-bold leading-relaxed opacity-90 relative z-10">{content.mission}</p>
        </motion.div>
      </div>

      {/* Goals with Icons */}
      <section className="bg-white p-20 rounded-[5rem] border border-gray-100 space-y-16 shadow-sm">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black text-press-dark tracking-tighter">أهدافنا الاستراتيجية</h2>
          <div className="w-24 h-2 bg-press-yellow mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {content.goals.map((goal, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center gap-6 shadow-sm hover:bg-white hover:shadow-2xl transition-all group"
            >
              <div className="w-20 h-20 bg-white text-press-blue rounded-3xl flex items-center justify-center shadow-lg group-hover:bg-press-blue group-hover:text-white transition-all">
                {renderIcon(goal.iconName)}
              </div>
              <p className="text-xl text-gray-700 font-black leading-relaxed">{goal.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black text-press-dark tracking-tighter">فريق العمل</h2>
          <p className="text-gray-400 font-bold">نخبة من المهنيين والمدافعين عن حقوق الصحافة</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {team.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative mb-8 mx-auto w-48 h-48 rounded-[3rem] overflow-hidden border-4 border-white group-hover:border-press-yellow transition-all shadow-2xl">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-press-blue/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-black text-press-dark">{member.name}</h3>
              <p className="text-press-blue text-sm font-black mt-2 uppercase tracking-tighter bg-press-light inline-block px-4 py-1 rounded-full">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {showContact && <ContactSection />}
    </div>
  );
};

export default AboutUsPage;
