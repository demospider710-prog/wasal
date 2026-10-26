import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { UserProfile, UserRole } from '../../types';
import {
  X,
  Lock,
  User,
  LogIn,
  KeyRound,
  ShieldCheck,
  CheckCircle,
  Building,
  GraduationCap,
  HeartHandshake,
  UserCheck
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToVerify: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onSwitchToVerify
}) => {
  const { demoUsers, loginUser, addToast } = useRodFarag();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      addToast('يرجى إدخال اسم المستخدم أو الكود الوظيفي', 'error');
      return;
    }

    // Try matching demo users
    const matched = demoUsers.find(
      u => u.name.includes(identifier) || u.email.includes(identifier) || u.id === identifier
    ) || demoUsers[0];

    loginUser(matched);
    onClose();
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    const user = demoUsers.find(u => u.role === role) || demoUsers[0];
    loginUser(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">تسجيل الدخول إلى المنظومة</h3>
              <p className="text-xs text-slate-400">بوابة الدخول الموحدة للكوادر والطلاب وأولياء الأمور</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-3.5 mb-6 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              اسم المستخدم، البريد، أو الكود الوظيفي / كود الطالب:
            </label>
            <input
              type="text"
              required
              placeholder="مثال: admin@rodelgard.edu.eg أو T-1001"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
              dir="ltr"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                كلمة المرور:
              </label>
              <button
                type="button"
                onClick={() => addToast('يمكنك استخدام أي من الحسابات التجريبية السريعة بالأسفل فورًا', 'info')}
                className="text-[11px] text-amber-400 hover:underline"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-between text-slate-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-950"
              />
              <span>تذكر بيانات الدخول على هذا الجهاز</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <LogIn className="w-4 h-4" />
            دخول المنظومة
          </button>
        </form>

        {/* Quick Demo Accounts for Seamless Instant Testing */}
        <div className="border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              دخول سريع بحساب تجريبي معتمد:
            </span>
            <span className="text-[10px] text-slate-400">نقرة واحدة للمعاينة المباشرة</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('directorate_admin')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 text-right transition cursor-pointer flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Building className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-[11px] group-hover:text-amber-300">مدير عام الإدارة</div>
                <div className="text-[10px] text-slate-400">صلاحية شاملة لـ 16 مدرسة</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('school_principal')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 text-right transition cursor-pointer flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-[11px] group-hover:text-purple-300">مدير مدرسة</div>
                <div className="text-[10px] text-slate-400">إدارة مدرسة روض الفرج</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('teacher')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 text-right transition cursor-pointer flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <KeyRound className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-[11px] group-hover:text-blue-300">معلم أول أ</div>
                <div className="text-[10px] text-slate-400">رصد الدرجات والحضور</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 text-right transition cursor-pointer flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="font-bold text-white text-[11px] group-hover:text-emerald-300">طالب ثانوي</div>
                <div className="text-[10px] text-slate-400">الشهادات وجدول الحصص</div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Alternative Links */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            className="text-amber-400 hover:underline font-semibold"
          >
            ليس لديك حساب؟ إنشاء حساب جديد
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToVerify();
            }}
            className="text-slate-400 hover:text-white"
          >
            التحقق من حالة الحساب
          </button>
        </div>
      </div>
    </div>
  );
};
