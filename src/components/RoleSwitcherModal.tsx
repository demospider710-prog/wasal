import React from 'react';
import { useRodFarag } from '../context/RodFaragContext';
import { UserRole } from '../types';
import {
  ShieldCheck,
  Building,
  GraduationCap,
  Users,
  UserCheck,
  MessageSquareWarning,
  Copyright,
  Laptop,
  CheckCircle2,
  X,
  Info
} from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, switchRole, demoUsers } = useRodFarag();

  if (!isOpen) return null;

  const roleDefinitions: {
    role: UserRole;
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string;
  }[] = [
    {
      role: 'directorate_admin',
      title: 'مسؤول الإدارة التعليمية',
      description: 'إشراف عام شامل على المدارس الـ16 بروض الفرج، المراسلات، الاعتمادات المركزية، والإحصائيات.',
      icon: Building,
      badge: 'صلاحيات عليا'
    },
    {
      role: 'school_principal',
      title: 'مدير مدرسة (مدرسة روض الفرج)',
      description: 'إدارة المدرسة المعين بها فقط، اعتماد درجات الامتحانات والتقييمات، الرد على المراسلات.',
      icon: ShieldCheck,
      badge: 'نطاق مدرسي'
    },
    {
      role: 'student_affairs',
      title: 'مسؤول شؤون الطلاب',
      description: 'تسجيل الطلاب، تحديث بيانات القيد، رصد وتأكيد سجلات الحضور والغياب اليومي.',
      icon: Users,
      badge: 'شؤون قيد'
    },
    {
      role: 'teacher',
      title: 'المدرس (معلم أول)',
      description: 'رصد درجات الطلاب في الفصول المسندة، إيداع المواد التعليمية والملكية الفكرية، متابعة الحضور.',
      icon: GraduationCap,
      badge: 'فصول مسندة'
    },
    {
      role: 'parent',
      title: 'ولي الأمر (بوابة مخصصة)',
      description: 'رؤية الأبناء المرتبطين بالحساب فقط، نتائج معتمدة، متابعة الغياب، إرسال استفسار أو تظلم.',
      icon: UserCheck,
      badge: 'خاص بالأبناء'
    },
    {
      role: 'student',
      title: 'الطالب (قادة المستقبل)',
      description: 'الاطلاع على النتائج المعتمدة، الحضور، التكريمات، تقديم مبادرات قادة المستقبل.',
      icon: GraduationCap,
      badge: 'ملف فردي'
    },
    {
      role: 'complaints_officer',
      title: 'مسؤول الشكاوى والتظلمات',
      description: 'فحص الشكاوى السرية، توجيهها للجان، تسجيل الردود المعتمدة، منع تضارب المصالح.',
      icon: MessageSquareWarning,
      badge: 'سرية ونزاهة'
    },
    {
      role: 'ip_officer',
      title: 'مسؤول الملكية الفكرية',
      description: 'مراجعة طلبات تراخيص المحتوى، تدقيق المصنفات التعليمية، فحص بلاغات الانتهاك.',
      icon: Copyright,
      badge: 'حقوق رقمية'
    },
    {
      role: 'super_admin',
      title: 'مسؤول النظام التقني',
      description: 'إدارة الأمان، فحص سجل العمليات والتدقيق الرقمي المشفر، النسخ الاحتياطي والإعدادات.',
      icon: Laptop,
      badge: 'نظام وأمان'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-slate-850 border-b border-slate-700/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              تبديل الدور واختبار الصلاحيات (RBAC Simulator)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              اختر دوراً لمعاينة كيف تختلف واجهات وصلاحيات المنظومة وفق متطلبات الأمان
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info banner */}
        <div className="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            تنبيه أمان: يتم تطبيق مبدأ أقل صلاحية (Least Privilege)؛ فمثلاً لن يستطيع ولي الأمر رؤية سوى أبنائه، ولن تنشر نتائج الامتحانات إلا بعد اعتمادها.
          </span>
        </div>

        {/* Role options list */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-slate-800/60">
          {roleDefinitions.map((item) => {
            const Icon = item.icon;
            const isSelected = currentUser.role === item.role;
            return (
              <div
                key={item.role}
                onClick={() => {
                  switchRole(item.role);
                  onClose();
                }}
                className={`pt-2.5 first:pt-0 cursor-pointer p-3 rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{item.title}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full font-medium">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {isSelected ? (
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>الحالي</span>
                    </div>
                  ) : (
                    <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg shrink-0 border border-slate-700 transition-colors">
                      تفعيل
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
