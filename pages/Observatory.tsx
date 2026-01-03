
import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend 
} from 'recharts';
import { Violation } from '../types';
import { 
  ShieldAlert, BarChart3, PieChart as PieIcon, TrendingUp, 
  FileDown, AlertCircle, MapPin, Activity, CheckCircle, 
  ChevronDown, Filter 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIOLATION_DATA, GOVERNORATE_STATS } from '../constants';

const COLORS = ['#003399', '#d4af37', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

const Observatory: React.FC<{ violations?: Violation[], initialViolationId?: string }> = ({ violations = VIOLATION_DATA, initialViolationId }) => {
  const [highlightedViolation, setHighlightedViolation] = useState<Violation | null>(null);

  useEffect(() => {
    if (initialViolationId) {
      const found = violations.find(v => v.id === initialViolationId);
      if (found) setHighlightedViolation(found);
    }
  }, [initialViolationId, violations]);

  // تجهيز البيانات للرسوم البيانية
  const typeDistribution = violations.reduce((acc: any[], v) => {
    const existing = acc.find(item => item.name === v.type);
    if (existing) existing.value++;
    else acc.push({ name: v.type, value: 1 });
    return acc;
  }, []);

  const timelineData = [
    { name: 'يناير', count: violations.filter(v => v.month === 'يناير').length },
    { name: 'فبراير', count: violations.filter(v => v.month === 'فبراير').length },
    { name: 'مارس', count: violations.filter(v => v.month === 'مارس').length },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-r-8 border-press-yellow pr-8">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-press-dark tracking-tighter">مرصد بيت الصحافة</h1>
          <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-xs">نظام التحليل الإحصائي للانتهاكات الصحفية في اليمن</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border-2 border-gray-100 px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-gray-50 transition-all">
            <FileDown size={18} /> تقرير PDF
          </button>
          <button className="bg-red-600 text-white px-8 py-3 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-red-600/20">
            <AlertCircle size={18} /> إرسال بلاغ
          </button>
        </div>
      </header>

      {/* Analytics Dashboard Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Type Distribution */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black flex items-center gap-3"><PieIcon className="text-press-blue" /> تصنيف الانتهاكات</h3>
              <Filter size={20} className="text-gray-300" />
           </div>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeDistribution}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {typeDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Timeline Analysis */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
           <h3 className="text-2xl font-black flex items-center gap-3"><TrendingUp className="text-press-blue" /> المخطط الزمني للعام</h3>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#003399" strokeWidth={4} dot={{ r: 6, fill: '#003399', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Most Dangerous Governorates */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8 lg:col-span-2">
           <h3 className="text-2xl font-black flex items-center gap-3"><MapPin className="text-press-blue" /> المحافظات الأكثر خطراً</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GOVERNORATE_STATS} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 'black', fill: '#001a4d' }} width={80} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="count" radius={[0, 10, 10, 0]}>
                      {GOVERNORATE_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.risk === 'high' ? '#ef4444' : entry.risk === 'medium' ? '#f59e0b' : '#10b981'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 space-y-2">
                   <h4 className="font-black text-red-700 flex items-center gap-2"><AlertCircle size={18} /> صنعاء وتعز</h4>
                   <p className="text-sm text-red-600 font-medium">تسجلان أعلى معدلات الانتهاكات خلال الربع الأول بنسبة 60% من إجمالي الحالات الموثقة.</p>
                </div>
                <div className="bg-press-blue/5 p-6 rounded-3xl border border-press-blue/10 space-y-2">
                   <h4 className="font-black text-press-blue flex items-center gap-2"><ShieldAlert size={18} /> الجهة الأكثر انتهاكاً</h4>
                   <p className="text-sm text-press-dark font-medium">سلطات الأمر الواقع تتصدر القائمة في الاعتقالات التعسفية وحجب المواقع.</p>
                </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Observatory;
