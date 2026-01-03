
import React, { useState, useEffect } from 'react';
import { TabType, SiteSettings, NewsArticle, Violation, TeamMember, SlideItem, Report, TrainingCourse } from './types';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Observatory from './pages/Observatory';
import FactCheck from './pages/FactCheck';
import PanicSystem from './pages/PanicSystem';
import AdminDashboard from './AdminDashboard';
import AboutUsPage from './pages/AboutUsPage';
import NewsPage from './pages/NewsPage';
import Academy from './pages/Academy';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import { Search, Bell, ShieldAlert, GraduationCap, Archive, SearchCheck, Newspaper, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MOCK_NEWS, VIOLATION_DATA, REAL_TEAM, 
  SLIDER_DATA, MOCK_REPORTS, NAVIGATION_ITEMS, 
  MOCK_COURSES, DEFAULT_SETTINGS, PROJECTS, PARTNERS 
} from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [navigationParams, setNavigationParams] = useState<any>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  const handleNavigate = (tab: TabType, params?: any) => {
    setActiveTab(tab);
    if (params) setNavigationParams(params);
  };

  const renderContent = () => {
    if (activeTab === 'login') return <LoginPage onLogin={(success) => success && (setIsAdminLoggedIn(true), setActiveTab('admin'))} />;
    
    switch (activeTab) {
      case 'home': return (
        <HomePage 
          onNav={handleNavigate} 
          slides={SLIDER_DATA} 
          latestNews={MOCK_NEWS} 
          latestViolations={VIOLATION_DATA} 
          upcomingCourses={MOCK_COURSES} 
          team={REAL_TEAM} 
        />
      );
      case 'observatory': return <Observatory violations={VIOLATION_DATA} initialViolationId={navigationParams?.violationId} />;
      case 'factcheck': return <FactCheck />;
      case 'academy': return <Academy />;
      case 'news': return <NewsPage news={MOCK_NEWS} onNavigate={handleNavigate} />;
      case 'admin': return isAdminLoggedIn ? <AdminDashboard /> : <LoginPage onLogin={() => setIsAdminLoggedIn(true)} />;
      case 'panic': return <PanicSystem />;
      case 'about': return <AboutUsPage showContact={true} team={REAL_TEAM} siteLogo={DEFAULT_SETTINGS.logoUrl} />;
      case 'reports': return <ReportsPage reports={MOCK_REPORTS} />;
      default: return <HomePage onNav={handleNavigate} slides={SLIDER_DATA} latestNews={MOCK_NEWS} latestViolations={VIOLATION_DATA} upcomingCourses={MOCK_COURSES} team={REAL_TEAM} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#FDFDFD] font-cairo overflow-x-hidden selection:bg-press-yellow/30 selection:text-press-blue`}>
      <style>{`
        :root {
          --press-blue: ${DEFAULT_SETTINGS.primaryColor};
          --press-yellow: ${DEFAULT_SETTINGS.secondaryColor};
        }
      `}</style>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleNavigate} 
        menuItems={NAVIGATION_ITEMS} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      <main className={`transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'mr-24' : 'mr-80'}`}>
        <header className="sticky top-0 z-[55] bg-white/70 backdrop-blur-xl border-b border-gray-100 h-24 px-12 flex items-center justify-between">
           <div className="flex items-center gap-10 flex-1">
              <div className="relative w-full max-w-xl hidden lg:block">
                 <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                 <input type="text" placeholder="البحث في الأرشيف، المرصد، والأكاديمية..." className="w-full bg-gray-50/50 border-2 border-transparent focus:border-press-blue/10 rounded-2xl py-4 pr-16 pl-8 text-sm outline-none transition-all font-bold" />
              </div>
           </div>

           <div className="flex items-center gap-8">
              <button onClick={()=>handleNavigate('panic')} className="hidden xl:flex items-center gap-3 bg-red-50 text-red-600 px-8 py-4 rounded-2xl text-xs font-black hover:bg-red-100 transition-all border border-red-100">
                 <ShieldAlert size={18} /> SOS الطوارئ
              </button>
              
              <div className="flex items-center gap-6 border-r border-gray-100 pr-8">
                 <div className="text-left hidden sm:block">
                    <p className="text-sm font-black text-press-dark text-right leading-none mb-1">بيت الصحافة</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-right text-press-blue">Digital Institution</p>
                 </div>
                 <div className="w-14 h-14 bg-press-yellow text-press-blue rounded-2xl flex items-center justify-center font-black shadow-xl shadow-press-yellow/20 cursor-pointer hover:scale-105 transition-all" onClick={() => handleNavigate('login')}>
                    PH
                 </div>
              </div>
           </div>
        </header>

        <div className="p-12 lg:p-20 max-w-[1800px] mx-auto min-h-screen">
           {renderContent()}
        </div>
        
        <Footer onNav={handleNavigate} menuItems={NAVIGATION_ITEMS} />
      </main>
    </div>
  );
};

export default App;
