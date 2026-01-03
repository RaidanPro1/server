
import React from 'react';
import { MapPin, Phone, MessageCircle, Mail, Globe } from 'lucide-react';
import { DEFAULT_SETTINGS } from '../constants';

const ContactSection: React.FC = () => {
  return (
    <section className="bg-white p-16 lg:p-24 rounded-[5rem] border border-gray-100 shadow-sm space-y-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-2 bg-press-blue" />
      
      <div className="flex flex-col lg:flex-row justify-between items-start gap-20 relative z-10">
        <div className="space-y-12 flex-1 w-full text-right">
          <div className="space-y-4">
             <h2 className="text-5xl font-black text-press-dark tracking-tighter">تواصل مع فريقنا</h2>
             <p className="text-xl text-gray-500 font-medium">نحن هنا للإجابة على تساؤلاتكم، سواء كنت صحفياً يحتاج للدعم أو مؤسسة ترغب في الشراكة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="p-4 bg-press-blue/10 text-press-blue rounded-2xl group-hover:bg-press-blue group-hover:text-white transition-all"><MapPin /></div>
                <h4 className="font-black text-xl">المقر الرئيسي</h4>
              </div>
              <p className="font-bold text-gray-500 pr-4">{DEFAULT_SETTINGS.contact.address}</p>
            </div>

            <div className="space-y-4 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="p-4 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all"><MessageCircle /></div>
                <h4 className="font-black text-xl">الواتساب</h4>
              </div>
              <p className="font-bold text-gray-500 pr-4" dir="ltr">+{DEFAULT_SETTINGS.contact.whatsapp}</p>
            </div>

            <div className="space-y-4 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="p-4 bg-press-blue/5 text-press-blue rounded-2xl group-hover:bg-press-blue group-hover:text-white transition-all"><Mail /></div>
                <h4 className="font-black text-xl">البريد الإلكتروني</h4>
              </div>
              <p className="font-bold text-gray-500 pr-4">{DEFAULT_SETTINGS.contact.email}</p>
            </div>

            <div className="space-y-4 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="p-4 bg-press-yellow/10 text-press-yellow rounded-2xl group-hover:bg-press-yellow group-hover:text-press-blue transition-all"><Globe /></div>
                <h4 className="font-black text-xl">الموقع الإلكتروني</h4>
              </div>
              <p className="font-bold text-gray-500 pr-4">www.ph-ye.org</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[50%] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-gray-50 h-[600px] relative">
           <div className="absolute inset-0 z-10 pointer-events-none border-4 border-press-blue/10 rounded-[3rem]" />
           <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: DEFAULT_SETTINGS.contact.mapIframe }} />
           <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50">
              <span className="text-[10px] font-black text-press-blue uppercase tracking-widest">موقعنا في تعز: H2H9+P9J</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
