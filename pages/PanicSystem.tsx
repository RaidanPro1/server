
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, MapPin, AlertTriangle, CheckCircle2, PhoneCall } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { mockBackend } from '../services/mockBackend';

interface PanicSystemProps {
  onAlertSent?: (alert: any) => void;
}

const PanicSystem: React.FC<PanicSystemProps> = ({ onAlertSent }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'locating' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const triggerSOS = async () => {
    setStatus('locating');
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMessage('متصفحك لا يدعم تحديد الموقع الجغرافي.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setStatus('sending');
        try {
          await mockBackend.sendEmergencyAlert(pos);
          const alert = {
            timestamp: new Date().toLocaleString('ar-YE'),
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            locationName: 'موقع غير محدد'
          };
          onAlertSent?.(alert);
          setStatus('sent');
        } catch (err) {
          setStatus('error');
          setErrorMessage('فشل إرسال الإشارة، يرجى الاتصال بالأرقام المباشرة.');
        }
      },
      (err) => {
        setStatus('error');
        setErrorMessage('تعذر الحصول على موقعك. يرجى منح الإذن للمتصفح.');
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <AlertTriangle className="text-red-600" size={48} />
        </div>
        <h1 className="text-4xl font-black text-red-600 uppercase tracking-tighter">نظام الطوارئ (SOS)</h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          {t('panicInstructions')}
        </p>
      </div>

      <div className="relative flex justify-center">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.button
              key="btn-idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              onClick={triggerSOS}
              className="w-64 h-64 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-[0_0_50px_rgba(220,38,38,0.4)] flex flex-col items-center justify-center gap-4 transition-transform active:scale-90"
            >
              <ShieldAlert size={80} />
              <span className="text-2xl font-black uppercase tracking-widest">إرسال استغاثة</span>
            </motion.button>
          )}

          {(status === 'locating' || status === 'sending') && (
            <motion.div
              key="btn-loading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-64 h-64 bg-gray-100 rounded-full flex flex-col items-center justify-center gap-4"
            >
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-bold text-gray-500">
                {status === 'locating' ? 'جاري تحديد موقعك...' : 'جاري إرسال الإشارة...'}
              </span>
            </motion.div>
          )}

          {status === 'sent' && (
            <motion.div
              key="btn-sent"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-64 h-64 bg-green-500 text-white rounded-full flex flex-col items-center justify-center gap-4 text-center p-6 shadow-xl"
            >
              <CheckCircle2 size={80} />
              <span className="text-xl font-bold">تم إرسال موقعك لفريق الدعم!</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="btn-error"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-64 h-64 bg-red-100 border-2 border-red-600 rounded-full flex flex-col items-center justify-center gap-4 text-center p-6"
            >
              <AlertTriangle className="text-red-600" size={60} />
              <p className="text-xs font-bold text-red-600">{errorMessage}</p>
              <button onClick={() => setStatus('idle')} className="text-[10px] underline font-bold uppercase">حاول مجدداً</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-press-blue rounded-xl flex items-center justify-center">
            <PhoneCall size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm">خط ساخن (قانوني)</h4>
            <p className="text-xs text-gray-400">+967 777 000 000</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm">أقرب مكتب دعم</h4>
            <p className="text-xs text-gray-400">شارع جمال، تعز - اليمن</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanicSystem;
