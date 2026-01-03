
import React from 'react';
import { Report } from '../types';
import { Download, Calendar, ExternalLink } from 'lucide-react';

interface ReportsPageProps {
  reports: Report[];
}

// Updated component to accept reports prop from parent
const ReportsPage: React.FC<ReportsPageProps> = ({ reports }) => {
  return (
    <div className="space-y-12 pb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-black text-press-dark underline decoration-press-yellow decoration-4">التقارير النوعية والدورية</h1>
        <p className="text-gray-500">تقارير استقصائية وتحليلية توثق حالة الحريات الإعلامية في اليمن وفق معايير التوثيق الدولية.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-3xl flex gap-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-32 h-44 bg-gray-100 rounded-2xl shrink-0 overflow-hidden border border-gray-200">
              <img src={report.thumbnail} alt={report.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="space-y-3">
                <span className="px-3 py-1 bg-press-light text-press-blue text-[10px] font-black rounded-md uppercase">
                  {report.type === 'annual' ? 'تقرير سنوي' : 'تقرير شهري'}
                </span>
                <h3 className="text-lg font-bold text-press-dark">{report.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Calendar size={14} />
                  <span>تاريخ النشر: {report.date}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-press-blue text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <Download size={14} /> تحميل PDF
                </button>
                <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                  <ExternalLink size={14} /> تصفح أونلاين
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
