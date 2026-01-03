
import React, { useState } from 'react';
import { LogIn, ShieldCheck, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (success: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isNormalLoading, setIsNormalLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNormalLoading(true);
    setError('');
    
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.user === 'admin' && credentials.pass === 'samah@2052024') {
      onLogin(true);
    } else {
      setError('بيانات الاعتماد غير صحيحة، يرجى المحاولة مرة أخرى.');
      setIsNormalLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    
    // محاكاة عملية تسجيل الدخول عبر Google OAuth
    try {
      // هنا يتم استدعاء Google SDK في البيئات الحقيقية
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // نفترض نجاح تسجيل الدخول للمتظاهرين
      onLogin(true);
    } catch (err) {
      setError('فشل الاتصال بخوادم جوجل. حاول مجدداً.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-10 space-y-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-press-light rounded-3xl flex items-center justify-center mx-auto text-press-blue">
              <ShieldCheck size={44} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-black text-press-dark">لوحة المسؤولين</h2>
            <p className="text-gray-400 text-sm">أهلاً بك مجدداً في نظام إدارة محتوى بيت الصحافة</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider pr-2">اسم المستخدم</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={credentials.user}
                  onChange={(e) => setCredentials({...credentials, user: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pr-12 pl-4 text-sm focus:ring-2 focus:ring-press-blue outline-none transition-all"
                  placeholder="admin"
                  disabled={isNormalLoading || isGoogleLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-wider pr-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={credentials.pass}
                  onChange={(e) => setCredentials({...credentials, pass: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pr-12 pl-12 text-sm focus:ring-2 focus:ring-press-blue outline-none transition-all"
                  placeholder="••••••••"
                  disabled={isNormalLoading || isGoogleLoading}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-press-blue"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={isNormalLoading || isGoogleLoading}
              className="w-full bg-press-blue text-white font-black py-4 rounded-2xl shadow-lg shadow-press-blue/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isNormalLoading ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={20} />}
              دخول النظام
            </button>
          </form>

          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold">أو المتابعة عبر</span></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isNormalLoading || isGoogleLoading}
            className="w-full bg-white border-2 border-gray-100 text-gray-600 font-bold py-3.5 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <Loader2 size={20} className="animate-spin text-press-blue" />
            ) : (
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            )}
            {isGoogleLoading ? 'جاري الاتصال بجوجل...' : 'الدخول عبر جوجل'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
