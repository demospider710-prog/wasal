import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Search,
  CheckCircle2,
  Users,
  GraduationCap,
  CalendarCheck,
  FileSpreadsheet,
  FileText,
  Keyboard,
  WifiOff,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  Building2,
  Compass,
  Zap,
  Mail
} from 'lucide-react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour?: () => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  onStartTour
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students_staff' | 'attendance_assessments' | 'offline_export' | 'shortcuts'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden text-right my-8 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  دليل المستخدم الشامل — الإدارة الرقمية لروض الفرج
                </h3>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  الإصدار الرسمي 2026/2027
                </span>
              </div>
              <p className="text-xs text-slate-400">
                مرجع توثيقي للكوادر الإدارية والتربوية لإدارة الـ16 مدرسة ومتابعة الطلاب بكفاءة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onStartTour && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartTour();
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>بدء الجولة التفاعلية</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/70 border-b border-slate-800 overflow-x-auto shrink-0 text-xs">
          {[
            { id: 'overview', label: 'نظرة عامة والمدارس', icon: Building2 },
            { id: 'students_staff', label: 'الطلاب والمعلمين', icon: GraduationCap },
            { id: 'attendance_assessments', label: 'الحضور والتقييمات والمراسلات', icon: CalendarCheck },
            { id: 'offline_export', label: 'التصدير والعمل دون إنترنت', icon: FileSpreadsheet },
            { id: 'shortcuts', label: 'اختصارات لوحة المفاتيح', icon: Keyboard }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  أهداف منظومة روض الفرج الرقمية
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  صُممت المنظومة لتوفير حوكمة مركزية رقمية لجميع مدارس حي روض الفرج الـ16 بمديرية التربية والتعليم بمحافظة القاهرة، مع ربط إداري متكامل بدليل الـ27 محافظة والإدارات التعليمية بجمهورية مصر العربية.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-slate-850/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block mb-1">الـ 16 مدرسة المشمولة</span>
                  <p className="text-xs text-slate-400">
                    تشمل المرحلة الثانوية (روض الفرج بنين، التوفيقية، ناصر بنات)، الإعدادية (شبرا بنات، الشهيد أسامة سالم)، الابتدائية (جزيرة بدران، طه حسين)، والتجريبي لغات (خديجة الرسمية لغات).
                  </p>
                </div>
                <div className="bg-slate-850/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block mb-1">تعدد الأدوار والصلاحيات</span>
                  <p className="text-xs text-slate-400">
                    يدعم النظام 9 أدوار وظيفية: مسؤول الإدارة، مدير المدرسة، مسؤول شؤون الطلاب، المعلم، الطالب، ولي الأمر، ومسؤولي الشكاوى والملكية الفكرية.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Students & Staff */}
          {activeTab === 'students_staff' && (
            <div className="space-y-4">
              <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  إدارة شؤون الطلاب والكوادر التعليمية
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                  <li><strong>قيد طالب جديد:</strong> انقر زر &quot;تسجيل طالب جديد&quot; أو استخدم الاختصار <code>Ctrl + N</code> لإدراج الاسم، الرقم القومي، كود الطالب، المدرسة، وفصل القيد.</li>
                  <li><strong>الفلترة الزمنية:</strong> استخدم مكون الفترات الأكاديمية بالأعلى لتصفية الطلاب والمعلمين حسب الترم الأول، الترم الثاني، أو نطاق زمني مخصص.</li>
                  <li><strong>شؤون المعلمين:</strong> توزيع المواد والأنصبة الدراسية، متابعة تقييم الكفاءة وتواريخ التعيين والتعاقد.</li>
                  <li><strong>البحث الشامل:</strong> استخدم شريط البحث بالهيدر <code>Ctrl + K</code> للوصول الفوري لأي طالب أو معلم بالاسم أو الكود.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Attendance, Assessments & Memos */}
          {activeTab === 'attendance_assessments' && (
            <div className="space-y-4">
              <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                  <CalendarCheck className="w-5 h-5 text-emerald-400" />
                  الانضباط المدرسي والتقييمات المعتمدة
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                  <li><strong>رصد الحضور اليومي:</strong> تسجيل حضور وغياب الطلاب بكل فصل، مع حساب نسب الانتظام لحظياً وعرضها بمؤشرات الـ Dashboard.</li>
                  <li><strong>اعتماد التقييمات:</strong> تخضع درجات الشهور لاعتماد مدير المدرسة والتوجيه الفني، ولا تظهر لأولياء الأمور إلا بعد التحقق والنشر.</li>
                  <li><strong>المراسلات الرسمية وإشعارات سطح المكتب (Desktop Notifications):</strong> تتبع توجيهات الإدارة التعليمية مع تنبيهات فورية تظهر عبر المتصفح وسطح المكتب مصحوبة بنغمة صوتية عند ورود أي مكاتبة جديدة.</li>
                  <li><strong>وضع القراءة والتركيز (Focus Mode - Alt + F):</strong> إخفاء القوائم الجانبية والهيدر وتوسيع مساحة الشاشة لتسهيل قراءة التقارير الطويلة والوثائق والمكاتبات مع إمكانية تكبير الخط وتغيير نمط العرض (سيبيا، داكن، عالي التباين)، ويمكن الخروج بالضغط على <code>Esc</code>.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Offline & Export */}
          {activeTab === 'offline_export' && (
            <div className="space-y-4">
              <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  تصدير التقارير والعمل في وضع عدم الاتصال (Offline)
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-750">
                    <span className="font-bold text-emerald-400 block mb-1">تصدير Excel (.xlsx / .csv):</span>
                    تنزيل بيانات المدارس والحضور والتقييمات والمراسلات كملفات إكسل داعمة للغة العربية (UTF-8 BOM) لفتحها دون تشوه في الحروف.
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-750">
                    <span className="font-bold text-rose-400 block mb-1">تصدير PDF والطباعة الرسمية:</span>
                    تجهيز مستند التقرير بتنسيق حكومي معتمد جاهز للحفظ بصيغة PDF أو الطباعة الورقية الفورية عبر <code>Ctrl + P</code>.
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-750">
                    <span className="font-bold text-amber-400 block mb-1">ميزة التخزين المؤقت والـ Service Worker:</span>
                    تم تزويد المنظومة بخدمة تخزين متقدمة تحفظ كافة السجلات في الذاكرة المحلية والـ Cache، مما يمكنك من فتح المنظومة وتصفح كافة البيانات السابقة حتى في حال انقطاع شبكة الإنترنت بالكامل.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Shortcuts */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-850 rounded-xl border border-slate-800 text-xs">
                <span className="font-bold text-amber-400 block mb-2">أهم الاختصارات السريعة:</span>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div><code>Ctrl + K</code> — البحث الشامل</div>
                  <div><code>Ctrl + N</code> — إضافة عنصر جديد فوري</div>
                  <div><code>Ctrl + P</code> — طباعة وتصدير PDF</div>
                  <div><code>Shift + ?</code> — فتح دليل الاختصارات</div>
                  <div><code>Alt + 1</code> — لوحة التحكم</div>
                  <div><code>Alt + 4</code> — شؤون الطلاب</div>
                  <div><code>Alt + 6</code> — التقارير الإحصائية</div>
                  <div><code>Esc</code> — إغلاق أي نافذة</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>منظومة الإدارة الرقمية لروض الفرج © 2026/2027</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            إغلاق الدليل
          </button>
        </div>
      </div>
    </div>
  );
};
