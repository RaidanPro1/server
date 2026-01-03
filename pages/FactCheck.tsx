
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SearchCheck, ImageIcon, LinkIcon, FileSearch, 
  Globe, Info, Search, AlertCircle, CheckCircle, 
  Fingerprint, Wand2, ArrowLeftRight, ExternalLink 
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const FactCheck: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'ai' | 'image' | 'link' | 'metadata'>('ai');
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runAiAnalysis = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `بصفتك خبيراً في التحقق من الأخبار (Fact-checker) في اليمن، قم بتحليل الادعاء التالي وتقديم تقرير حول صحته (صحيح، مضلل، زائف، خارج السياق) بناءً على المعرفة المتاحة والأدلة المحتملة: ${input}`
      });
      setResult(response.text);
    } catch (err) {
      setResult('حدث خطأ أثناء الاتصال بنظام الذكاء الاصطناعي. يرجى المحاولة لاحقاً.');
    }
    setIsAnalyzing(false);
  };

  const openReverseSearch = () => {
    window.open(`https://www.google.com/searchbyimage?image_url=${input}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-32">
      <header className="text-center space-y-6">
        <div className="w-24 h-24 bg-press-blue/10 text-press-blue rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
          <SearchCheck size={48} />
        </div>
        <h1 className="text-5xl font-black text-press-dark tracking-tighter">تحقق: مختبر التحقق الرقمي</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">نظام التحقق المستقل لمكافحة المعلومات المضللة وتوثيق الحقائق الرقمية في البيئة اليمنية.</p>
      </header>

      <div className="bg-white p-4 rounded-[3rem] border border-gray-100 shadow-sm flex flex-wrap justify-center gap-4">
        {[
          { id: 'ai', label: 'محلل الذكاء الاصطناعي', icon: Wand2, desc: 'تحليل المنطق والمصادر' },
          { id: 'image', label: 'البحث العكسي', icon: ImageIcon, desc: 'كشف أصل الصور' },
          { id: 'link', label: 'تحليل الروابط', icon: LinkIcon, desc: 'فحص المواقع المشبوهة' },
          { id: 'metadata', label: 'بيانات الميتاداتا', icon: Fingerprint, desc: 'تحليل ملفات الصور' }
        ].map(tool => (
          <button
            key={tool.id}
            onClick={() => { setActiveTool(tool.id as any); setResult(null); setInput(''); }}
            className={`px-8 py-5 rounded-2xl font-black text-sm flex flex-col items-center gap-2 transition-all flex-1 min-w-[200px] ${activeTool === tool.id ? 'bg-press-blue text-white shadow-xl shadow-press-blue/20' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <tool.icon size={24} />
            <span>{tool.label}</span>
            <span className={`text-[10px] opacity-60 font-medium ${activeTool === tool.id ? 'text-press-yellow' : ''}`}>{tool.desc}</span>
          </button>
        ))}
      </div>

      <div className="bg-white p-12 lg:p-20 rounded-[4rem] border border-gray-100 shadow-sm space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-press-yellow" />
        
        <AnimatePresence mode="wait">
          {activeTool === 'ai' && (
            <motion.div key="ai" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="space-y-4">
                 <h3 className="text-2xl font-black text-press-dark">حلل أي خبر أو ادعاء فوراً</h3>
                 <p className="text-gray-400 font-medium">أدخل نص الخبر المشكوك فيه وسيقوم الذكاء الاصطناعي بمطابقته مع سياقات النشر المعروفة.</p>
              </div>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="الصق نص الخبر هنا..."
                className="w-full h-48 bg-gray-50 border-none rounded-[2.5rem] p-8 text-lg font-medium outline-none focus:ring-4 focus:ring-press-blue/5 transition-all"
              />
              <button 
                onClick={runAiAnalysis}
                disabled={isAnalyzing || !input.trim()}
                className="w-full bg-press-blue text-white font-black py-6 rounded-2xl shadow-2xl shadow-press-blue/20 flex items-center justify-center gap-3"
              >
                {isAnalyzing ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={24} />}
                {isAnalyzing ? 'جاري الفحص...' : 'بدء عملية التحقق'}
              </button>
            </motion.div>
          )}

          {activeTool === 'image' && (
            <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 space-y-8">
               <ImageIcon size={64} className="mx-auto text-press-blue opacity-20" />
               <h3 className="text-3xl font-black text-press-dark">البحث العكسي عن الصور</h3>
               <p className="text-gray-500 max-w-md mx-auto">ضع رابط الصورة المباشر للبحث عنها في محركات البحث العالمية ومعرفة تاريخ نشرها الأول.</p>
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="أدخل رابط الصورة (Direct Image URL)..."
                 className="w-full bg-gray-50 border-none rounded-2xl p-5 font-medium outline-none focus:ring-4 focus:ring-press-blue/5"
               />
               <button onClick={openReverseSearch} className="bg-press-blue text-white px-12 py-4 rounded-2xl font-black flex items-center gap-2 mx-auto">
                 <ExternalLink size={20} /> فتح البحث في جوجل
               </button>
            </motion.div>
          )}

          {activeTool === 'link' && (
            <motion.div key="link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
               <h3 className="text-2xl font-black text-press-dark">فحص الروابط والمواقع</h3>
               <p className="text-gray-500">فحص هوية النطاق (Domain) وتاريخ تسجيل الموقع لكشف المواقع الإخبارية الوهمية.</p>
               <div className="flex gap-4">
                 <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="example.com"
                   className="flex-1 bg-gray-50 border-none rounded-2xl p-5 font-bold outline-none"
                 />
                 <button className="bg-press-yellow text-press-blue px-10 rounded-2xl font-black hover:bg-press-blue hover:text-white transition-all">فحص</button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 border-2 border-press-blue/10 p-10 rounded-[3rem] space-y-6 mt-10">
            <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
               <CheckCircle className="text-green-500" size={32} />
               <h4 className="text-xl font-black text-press-dark">نتيجة التحليل الرقمي</h4>
            </div>
            <div className="text-gray-700 font-medium leading-loose whitespace-pre-wrap">{result}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FactCheck;
