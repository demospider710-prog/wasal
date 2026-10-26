import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { GeographicWizard } from './GeographicWizard';
import { LoginModal } from './LoginModal';
import { AccountVerificationModal } from './AccountVerificationModal';
import { RequestSchoolModal } from './RequestSchoolModal';
import {
  Building2,
  LogIn,
  UserPlus,
  ShieldCheck,
  MapPin,
  School as SchoolIcon,
  Users,
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  Info,
  Shield,
  FileText
} from 'lucide-react';
import { UserRole } from '../../types';

export const AuthPortal: React.FC = () => {
  const {
    demoUsers,
    loginUser,
    schools,
    governorates,
    setIsGovModalOpen,
    authPortalTab,
    setAuthPortalTab
  } = useRodFarag();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isRequestSchoolOpen, setIsRequestSchoolOpen] = useState(false);
  const [isRegisterWizardActive, setIsRegisterWizardActive] = useState(false);

  const handleQuickLogin = (role: UserRole) => {
    const user = demoUsers.find(u => u.role === role) || demoUsers[0];
    loginUser(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Official Governmental Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Official Emblem & State Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm shadow-sm">
              <span>RDF</span>
            </div>
            <div>
              <div className="font-extrabold text-white text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
                <span>جمهورية مصر العربية</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400">وزارة التربية والتعليم والتعليم الفني</span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                مديرية التربية والتعليم بالقاهرة — إدارة روض الفرج التعليمية
              </div>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGovModalOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>دليل الـ27 محافظة</span>
            </button>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>تسجيل الدخول</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center">
        {isRegisterWizardActive ? (
          /* Multi-level 4-Step Geographic Registration Wizard */
          <GeographicWizard onCancel={() => setIsRegisterWizardActive(false)} />
        ) : (
          /* Landing Screen */
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-5 pt-4">
              {/* Temporary Logo / Seal Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/40 rounded-full px-4 py-1.5 text-amber-300 text-xs font-bold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>البوابة الرقمية المعتمدة لإدارة روض الفرج التعليمية</span>
              </div>

              {/* Title & Brand */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  منظومة الإدارة التعليمية الرقمية
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                  نظام تسجيل ذكي وموحد يربط الإدارة التعليمية بكافة المدارس الـ16 والمعلمين والطلاب وأولياء الأمور في بيئة رقمية متكاملة.
                </p>
              </div>

              {/* 3 Main Action Buttons Requested by User */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                {/* 1. Login Button */}
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-7 py-3.5 rounded-2xl transition text-sm flex items-center gap-2.5 shadow-xl shadow-amber-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <LogIn className="w-5 h-5 text-slate-950" />
                  <span>تسجيل الدخول</span>
                </button>

                {/* 2. New Account Button */}
                <button
                  type="button"
                  onClick={() => setIsRegisterWizardActive(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white border-2 border-amber-500/50 hover:border-amber-400 font-black px-7 py-3.5 rounded-2xl transition text-sm flex items-center gap-2.5 shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UserPlus className="w-5 h-5 text-amber-400" />
                  <span>إنشاء حساب جديد</span>
                </button>

                {/* 3. Verify Account Button */}
                <button
                  type="button"
                  onClick={() => setIsVerifyModalOpen(true)}
                  className="bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 hover:border-slate-600 font-bold px-6 py-3.5 rounded-2xl transition text-sm flex items-center gap-2 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>التحقق من الحساب والاعتماد</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Access Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    دخول سريع للحسابات التجريبية (للمعاينة والتقييم الفوري)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    انقر على أي بطاقة للدخول المباشر إلى لوحة التحكم الخاصة بهذه الفئة دون الحاجة لكتابة بيانات
                  </p>
                </div>
                <span className="text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full font-bold self-start sm:self-auto">
                  5 حسابات جاهزة
                </span>
              </div>

              {/* Demo Roles Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {/* 1. Directorate Admin */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('directorate_admin')}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500 hover:bg-amber-500/10 text-right transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white group-hover:text-amber-300">مدير عام الإدارة</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">كافة المدارس الـ16</div>
                  </div>
                </button>

                {/* 2. School Principal */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('school_principal')}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500 hover:bg-purple-500/10 text-right transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <SchoolIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white group-hover:text-purple-300">مدير مدرسة</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">ثانوية روض الفرج</div>
                  </div>
                </button>

                {/* 3. Teacher */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('teacher')}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 hover:bg-blue-500/10 text-right transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white group-hover:text-blue-300">معلم أول لغة عربية</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">دفتر الدرجات والغياب</div>
                  </div>
                </button>

                {/* 4. Student */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student')}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-500/10 text-right transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white group-hover:text-emerald-300">طالب ثانوي</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">التقييمات والجدول</div>
                  </div>
                </button>

                {/* 5. Parent */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('parent')}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-rose-500 hover:bg-rose-500/10 text-right transition cursor-pointer group flex flex-col justify-between col-span-2 sm:col-span-1"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white group-hover:text-rose-300">ولي أمر معتمد</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">متابعة الأبناء والشكاوى</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Institutional Stats & Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {/* Card 1: 27 Governorates */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-amber-400 font-mono">27</span>
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-bold text-white text-sm">محافظات جمهورية مصر العربية</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  هيكل إداري كامل يشمل كافة المحافظات والإدارات التعليمية، قابل للتوسع وربط المدارس على مستوى الجمهورية.
                </p>
                <button
                  onClick={() => setIsGovModalOpen(true)}
                  className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1 pt-1"
                >
                  <span>استعراض دليل المحافظات</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 2: 16 Schools in Rod El Farag */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-emerald-400 font-mono">16</span>
                  <SchoolIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-sm">مدارس إدارة روض الفرج المعتمدة</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  ربط كامل للمدارس الثانوية والإعدادية والابتدائية والتجريبية بأكواد معتمدة وشؤون طلاب وإحصاءات دقيقة.
                </p>
                <button
                  onClick={() => setIsRequestSchoolOpen(true)}
                  className="text-xs text-emerald-400 hover:underline font-semibold flex items-center gap-1 pt-1"
                >
                  <span>طلب إضافة مدرسة جديدة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 3: Multi-role Governance */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-purple-400 font-mono">18</span>
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="font-bold text-white text-sm">قسماً إدارياً وحوكمة مدرسية</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  أنظمة الحضور، الامتحانات، المراسلات، الانضباط، الشكاوى، حماية الملكية الفكرية، ومبادرة قادة المستقبل.
                </p>
                <button
                  onClick={() => setIsVerifyModalOpen(true)}
                  className="text-xs text-purple-400 hover:underline font-semibold flex items-center gap-1 pt-1"
                >
                  <span>التحقق من الاعتماد الرسمي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Official Governmental Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="text-slate-400 font-medium">
            منظومة الإدارة التعليمية الرقمية — إدارة روض الفرج التعليمية © {new Date().getFullYear()}
          </p>
          <p className="text-[11px] text-slate-600">
            تطبيق ويب حكومي وتعليمي مصمم وفق اللوائح الموحدة لوزارة التربية والتعليم والتعليم الفني بجمهورية مصر العربية.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => setIsRegisterWizardActive(true)}
        onSwitchToVerify={() => setIsVerifyModalOpen(true)}
      />

      <AccountVerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

      <RequestSchoolModal
        isOpen={isRequestSchoolOpen}
        onClose={() => setIsRequestSchoolOpen(false)}
      />
    </div>
  );
};
