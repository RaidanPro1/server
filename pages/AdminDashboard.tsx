
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Newspaper, ShieldAlert, FileText, 
  Users, Briefcase, Sparkles, Plus, Search, 
  Edit3, Trash2, Save, X, ChevronLeft, 
  Settings, TrendingUp, Wand2, Image as ImageIcon,
  BarChart3, PieChart as PieChartIcon, Share2, Download,
  Monitor, Type, ArrowLeftRight, Check, Palette
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie 
} from 'recharts';
import { useTranslation } from '../hooks/useTranslation';
import { MOCK_VIOLATIONS, MOCK_NEWS, MOCK_REPORTS, REAL_TEAM } from '../constants';
import { analyzeLongReport, generateSocialMediaPost } from '../services/aiService';

type AdminTab = 'overview' | 'slider' | 'pages' | 'violations' | 'news' | 'reports' | 'ai-analyzer' | 'team' | 'settings';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [currentFont, setCurrentFont] = useState(localStorage.getItem('app-font') || 'font-cairo');
  
  // States for dynamic content
  const [slides, setSlides] = useState([
    { id: 1, title: 'نحمي الحقيقة وندعم حرية الصحافة', subtitle: 'نحن صوت من لا صوت له في اليمن', image: 'https://picsum.photos/seed/press1/1200/600' },
    { id: 2, title: 'صحافة من أجل الإنسان', subtitle: 'مؤسسة مستقلة لرصد الحريات ودعم العمل الصحفي', image: 'https://picsum.photos/seed/press2/1200/600' }
  ]);

  const [pageContents, setPageContents] = useState({
    about: { title: 'من نحن', intro: 'مؤسسة مجتمع مدني تهدف إلى تعزيز حرية الإعلام...' },
    vision: { title: 'الرؤية', content: 'صحافة مهنية حرة أولويتها الإنسان' }
  });

  const [reportInput, setReportInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  const chartData = [
    { name: 'فبراير', count: 19 }, { name: 'مارس', count: 5 }, { name: 'أبريل', count: 5 },
    { name: 'مايو', count: 21 }, { name: 'يونيو', count: 7 }, { name: 'يوليو', count: 9 },
  ];

  const distributionData = [
    { name: 'الحوثيون', value: 45, color: '#003399' },
    { name: 'الحكومة', value: 32, color: '#d4af37' },
    { name: 'الانتقالي', value: 18, color: '#ef4444' },
  ];

  const changeFont = (fontClass: string) => {
    setCurrentFont(fontClass);
    localStorage.setItem('app-font', fontClass);
    // Dispatch custom event to notify App.tsx
    window.dispatchEvent(new Event('fontChanged'));
  };

  // Fix: Added handleAnalyze function to call AI service and update UI
  const handleAnalyze = async () => {
    if (!reportInput.trim()) return;
    setLoadingAI(true);
    setAnalysisResult("");
    const result = await analyzeLongReport(reportInput);
    setAnalysisResult(result || "تعذر الحصول على نتائج التحليل.");
    setLoadingAI(false);
  };

  const TabButton = ({ id, label, icon: Icon }: { id: AdminTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all relative group ${
        activeTab === id ? 'bg-press-blue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
      }`}
    >
      <Icon size={20} className={`transition-transform duration-300 ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
      {!isSidebarCollapsed && <span className="font-bold text-sm">{label}</span>}
      {activeTab === id && !isSidebarCollapsed && (
        <motion.div layoutId="tab-indicator" className="absolute left-0 top-0 bottom-0 w-1.5 bg-press-yellow" />
      )}
    </button>
  );

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen -m-8">
      <aside className={`bg-white border-l border-gray-100 transition-all duration-300 z-10 ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          {!isSidebarCollapsed && <span className="font-black text-press-blue text-xl tracking-tighter">PH ADMIN</span>}
          <button onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <ChevronLeft className={`transition-transform duration-500 ${isSidebarCollapsed ? 'rotate-180' : ''}`} size={18} />
          </button>
        </div>
        
        <nav className="py-4">
          <TabButton id="overview" label="الإحصائيات" icon={LayoutDashboard} />
          <TabButton id="slider" label="إدارة السلايدر" icon={ImageIcon} />
          <TabButton id="pages" label="محرر الصفحات" icon={Type} />
          <TabButton id="ai-analyzer" label="محلل التقارير AI" icon={Wand2} />
          <TabButton id="violations" label="الانتهاكات" icon={ShieldAlert} />
          <TabButton id="news" label="الأخبار" icon={Newspaper} />
          <TabButton id="team" label="الفريق" icon={Users} />
          <TabButton id="settings" label="الإعدادات" icon={Settings} />
        </nav>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-press-dark tracking-tight">
              {activeTab === 'overview' && 'لوحة المعلومات'}
              {activeTab === 'slider' && 'إدارة الواجهة الرئيسية'}
              {activeTab === 'pages' && 'محرر محتوى الصفحات'}
              {activeTab === 'ai-analyzer' && 'الذكاء الاصطناعي'}
              {activeTab === 'settings' && 'إعدادات المنصة'}
            </h1>
            <p className="text-gray-400 font-medium text-sm mt-1">بيت الصحافة - نظام الإدارة المتكامل</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white border-2 border-gray-100 text-gray-600 px-6 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-gray-50 transition-all">
              <Download size={16} /> تصدير تقارير
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="ov" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'الانتهاكات الموثقة', value: '55', icon: ShieldAlert, color: 'text-blue-600' },
                  { label: 'الأخبار المنشورة', value: '124', icon: Newspaper, color: 'text-green-600' },
                  { label: 'التقارير النوعية', value: '12', icon: FileText, color: 'text-purple-600' },
                  { label: 'فريق العمل', value: '15', icon: Users, color: 'text-amber-600' },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all cursor-default">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase">{s.label}</p>
                        <h4 className="text-3xl font-black text-press-dark">{s.value}</h4>
                      </div>
                      <div className={`p-4 bg-gray-50 rounded-2xl ${s.color}`}><s.icon size={24} /></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                  <BarChart3 className="text-press-blue" /> مؤشر الانتهاكات الشهري
                </h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                      <YAxis hide />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
                      <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                        {chartData.map((e, i) => <Cell key={i} fill={e.count > 15 ? '#ef4444' : '#003399'} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'slider' && (
            <motion.div key="sl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {slides.map(slide => (
                  <div key={slide.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm group">
                    <div className="h-48 relative">
                      <img src={slide.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="bg-white p-3 rounded-full text-press-blue mx-2"><Edit3 size={20}/></button>
                         <button className="bg-white p-3 rounded-full text-red-500 mx-2"><Trash2 size={20}/></button>
                      </div>
                    </div>
                    <div className="p-8 space-y-2">
                      <h4 className="font-black text-lg text-press-dark">{slide.title}</h4>
                      <p className="text-sm text-gray-400 font-medium">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}
                <button className="border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-gray-300 hover:text-press-blue hover:border-press-blue transition-all min-h-[300px]">
                  <Plus size={48} />
                  <span className="font-black mt-4">إضافة شريحة جديدة</span>
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'pages' && (
            <motion.div key="pg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-2">
                <h3 className="font-black text-sm text-gray-400 mb-4 uppercase tracking-widest">اختر الصفحة</h3>
                {['الرئيسية', 'من نحن', 'المشاريع', 'تواصل معنا'].map(p => (
                  <button key={p} className="w-full text-right p-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex justify-between items-center group">
                    {p} <ArrowLeftRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              <div className="lg:col-span-3 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-black">تعديل محتوى "من نحن"</h3>
                   <button className="bg-press-blue text-white px-8 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2">
                     <Save size={16} /> حفظ التغييرات
                   </button>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase pr-2">العنوان الرئيسي</label>
                    <input type="text" defaultValue={pageContents.about.title} className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-press-blue" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase pr-2">المقدمة التعريفية</label>
                    <textarea defaultValue={pageContents.about.intro} className="w-full bg-gray-50 border-none rounded-2xl p-6 font-medium outline-none focus:ring-2 focus:ring-press-blue h-40 resize-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div key="st" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-press-yellow text-press-blue rounded-3xl shadow-xl shadow-press-yellow/10">
                    <Palette size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">تخصيص الهوية البصرية</h3>
                    <p className="text-gray-400 text-sm font-medium">تحكم في الخطوط والألوان العامة للمنصة</p>
                  </div>
                </div>

                <div className="space-y-6">
                   <h4 className="font-black text-press-dark flex items-center gap-2">
                     <Type size={20} className="text-press-blue" /> اختيار الخط العربي (Typography)
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                       { id: 'font-cairo', name: 'خط كايرو (Cairo)', desc: 'عصري وواضح جداً' },
                       { id: 'font-almarai', name: 'خط المراعي (Almarai)', desc: 'أنيق ورسمي' },
                       { id: 'font-tajawal', name: 'خط تجول (Tajawal)', desc: 'انسيابي وناعم' },
                       { id: 'font-ibm', name: 'خط آي بي إم (IBM Plex)', desc: 'احترافي وتقني' }
                     ].map((font) => (
                       <button
                         key={font.id}
                         onClick={() => changeFont(font.id)}
                         className={`p-6 rounded-[2rem] border-2 transition-all text-right space-y-2 relative overflow-hidden group ${
                           currentFont === font.id 
                           ? 'border-press-blue bg-press-blue text-white' 
                           : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-press-blue/30'
                         }`}
                       >
                         <div className={`font-black text-lg ${font.id}`}>{font.name}</div>
                         <div className="text-[10px] opacity-70 font-medium">{font.desc}</div>
                         {currentFont === font.id && (
                           <div className="absolute top-4 left-4">
                             <Check size={20} />
                           </div>
                         )}
                         <div className={`text-2xl absolute -bottom-2 -left-2 opacity-10 font-black tracking-tighter ${font.id}`}>Abc</div>
                       </button>
                     ))}
                   </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex justify-end">
                   <button className="bg-press-blue text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-press-blue/20 hover:scale-105 transition-all">
                     حفظ كافة الإعدادات
                   </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ai-analyzer' && (
            <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-press-blue text-white rounded-3xl shadow-xl shadow-press-blue/20">
                      <Wand2 size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">المساعد الذكي للتقارير</h3>
                      <p className="text-gray-400 text-sm font-medium">تحويل التقارير الضخمة إلى ملخصات جاهزة للنشر</p>
                    </div>
                  </div>
                  <textarea 
                    value={reportInput}
                    onChange={(e) => setReportInput(e.target.value)}
                    placeholder="الصق نص التقرير هنا..."
                    className="w-full h-80 bg-gray-50 border-none rounded-[2.5rem] p-8 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-press-blue transition-all"
                  />
                  <button 
                    onClick={handleAnalyze}
                    disabled={loadingAI}
                    className="w-full bg-press-blue text-white font-black py-5 rounded-2xl shadow-xl shadow-press-blue/10 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {loadingAI ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Sparkles size={20} />
                    )}
                    {loadingAI ? 'جاري التحليل...' : 'تحليل المادة الآن'}
                  </button>
                </div>
              </div>
              <div className="bg-press-dark p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-5"><Sparkles size={200}/></div>
                <h3 className="text-xl font-black text-press-yellow">ملخص النتائج</h3>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-sm font-medium leading-loose text-gray-300 min-h-[300px] whitespace-pre-wrap">
                  {analysisResult || "بانتظار تحليل المادة..."}
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
