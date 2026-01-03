
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Newspaper, ShieldAlert, FileText, 
  Users, Briefcase, Plus, Edit3, Trash2, Save, X, ChevronLeft, 
  ImageIcon, Palette, Type, Globe, AlertTriangle, 
  Monitor, List as ListIcon, Video, GraduationCap, Settings, Wand2, Database
} from 'lucide-react';
import { useTranslation } from './hooks/useTranslation';
import { Violation, NewsArticle, TeamMember, SiteSettings, SlideItem, TrainingCourse, Project } from './types';
import { REAL_TEAM, ADVISORY_BOARD, PROJECTS, MOCK_COURSES, DEFAULT_SETTINGS } from './constants';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all relative group ${
        activeTab === id ? 'bg-press-blue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
      }`}
    >
      <Icon size={20} className={activeTab === id ? 'text-press-yellow' : ''} />
      {!isSidebarCollapsed && <span className="font-bold text-sm">{label}</span>}
      {activeTab === id && !isSidebarCollapsed && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-press-yellow" />}
    </button>
  );

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen -m-8">
      <aside className={`bg-white border-l border-gray-100 transition-all duration-300 z-50 ${isSidebarCollapsed ? 'w-24' : 'w-80'}`}>
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          {!isSidebarCollapsed && <span className="font-black text-press-blue text-2xl tracking-tighter">Command Center</span>}
          <button onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} className="p-2 bg-gray-50 rounded-xl">
            <ChevronLeft size={20} className={isSidebarCollapsed ? 'rotate-180' : ''} />
          </button>
        </div>
        
        <nav className="py-6 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
          <TabButton id="overview" label="لوحة التحكم" icon={LayoutDashboard} />
          <div className="px-8 py-4 text-[10px] font-black text-gray-300 uppercase tracking-widest mt-4">الموقع والهوية</div>
          <TabButton id="branding" label="الهوية البصرية" icon={Palette} />
          <TabButton id="slider" label="محرر السلايدر" icon={ImageIcon} />
          <TabButton id="projects" label="إدارة المشاريع" icon={Briefcase} />
          
          <div className="px-8 py-4 text-[10px] font-black text-gray-300 uppercase tracking-widest mt-4">البرامج والبيانات</div>
          <TabButton id="academy" label="إدارة الأكاديمية" icon={GraduationCap} />
          <TabButton id="news" label="إدارة الأخبار" icon={Newspaper} />
          <TabButton id="observatory" label="إدارة المرصد" icon={ShieldAlert} />
          <TabButton id="team" label="فريق العمل" icon={Users} />
          
          <div className="px-8 py-4 text-[10px] font-black text-gray-300 uppercase tracking-widest mt-4">النظام</div>
          <TabButton id="settings" label="الإعدادات المتقدمة" icon={Settings} />
        </nav>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-16">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-press-dark tracking-tight capitalize">
              {activeTab === 'overview' && 'نظرة عامة'}
              {activeTab === 'branding' && 'تخصيص الهوية'}
              {activeTab === 'projects' && 'إدارة المشاريع'}
            </h1>
            <p className="text-gray-400 font-bold text-sm">إدارة المؤسسة الرقمية بالكامل.</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-press-blue text-white px-10 py-3.5 rounded-2xl font-black shadow-2xl flex items-center gap-3">
               <Database size={18}/> حفظ التغييرات
             </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { label: 'إجمالي الانتهاكات', value: '1,542', icon: ShieldAlert, color: 'text-red-500' },
                 { label: 'المتدربون', value: '1,240', icon: GraduationCap, color: 'text-blue-500' },
                 { label: 'الأخبار الموثقة', value: '3,200', icon: Newspaper, color: 'text-green-500' },
                 { label: 'المشاريع المنفذة', value: '12', icon: Briefcase, color: 'text-yellow-600' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-2xl transition-all">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-gray-400 uppercase">{stat.label}</p>
                       <h4 className="text-3xl font-black text-press-dark">{stat.value}</h4>
                    </div>
                    <div className={`p-5 rounded-2xl bg-gray-50 ${stat.color} group-hover:bg-press-blue group-hover:text-white transition-all`}>
                       <stat.icon size={28} />
                    </div>
                 </div>
               ))}
            </motion.div>
          )}

          {activeTab === 'branding' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 rounded-[4rem] border border-gray-100 space-y-12">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                     <h3 className="text-xl font-black text-press-dark">الألوان والخطوط</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-xs font-black text-gray-400">اللون الأساسي</label>
                           <input type="color" className="w-full h-12 rounded-xl border-none p-1" value={settings.primaryColor} />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black text-gray-400">اللون الثانوي</label>
                           <input type="color" className="w-full h-12 rounded-xl border-none p-1" value={settings.secondaryColor} />
                        </div>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <h3 className="text-xl font-black text-press-dark">الشعارات</h3>
                     <div className="p-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] text-center cursor-pointer hover:border-press-blue transition-all">
                        <ImageIcon size={44} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-sm font-black text-gray-400">تحميل شعار جديد (PNG)</p>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
