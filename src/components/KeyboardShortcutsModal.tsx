import React from 'react';
import {
  Keyboard,
  X,
  Search,
  Plus,
  Printer,
  Compass,
  FileText,
  Users,
  GraduationCap,
  CalendarCheck,
  Building2,
  Mail,
  HelpCircle,
  Zap,
  Maximize2
} from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcutGroups = [
    {
      title: 'إجراءات عامة وسريعة (Common Actions)',
      shortcuts: [
        {
          keys: [`${modKey}`, 'K'],
          description: 'فتح شريط البحث الشامل (الطلاب، المعلمين، المدارس)',
          icon: Search,
          badgeColor: 'text-amber-400'
        },
        {
          keys: [`${modKey}`, 'N'],
          description: 'إنشاء عنصر جديد (طالب، معلم، تعميم، مراسلة)',
          icon: Plus,
          badgeColor: 'text-emerald-400'
        },
        {
          keys: ['Alt', 'F'],
          description: 'تفعيل / إلغاء وضع القراءة والتركيز (Focus/Reader Mode)',
          icon: Maximize2,
          badgeColor: 'text-amber-400'
        },
        {
          keys: [`${modKey}`, 'P'],
          description: 'طباعة التقرير الحالي / تصدير PDF',
          icon: Printer,
          badgeColor: 'text-blue-400'
        },
        {
          keys: ['Shift', '?'],
          description: 'عرض دليل اختصارات لوحة المفاتيح',
          icon: HelpCircle,
          badgeColor: 'text-purple-400'
        },
        {
          keys: ['Esc'],
          description: 'إغلاق أي نافذة أو الخروج من وضع القراءة',
          icon: X,
          badgeColor: 'text-rose-400'
        }
      ]
    },
    {
      title: 'التنقل الفوري بين الأقسام (Quick Navigation)',
      shortcuts: [
        { keys: ['Alt', '1'], description: 'لوحة التحكم المركزية (Dashboard)', icon: Zap },
        { keys: ['Alt', '2'], description: 'دليل المدارس الـ16 (Schools)', icon: Building2 },
        { keys: ['Alt', '3'], description: 'شؤون المعلمين وهيئة التدريس (Teachers)', icon: Users },
        { keys: ['Alt', '4'], description: 'شؤون الطلاب وقيد الدارسين (Students)', icon: GraduationCap },
        { keys: ['Alt', '5'], description: 'رصد الحضور والانضباط (Attendance)', icon: CalendarCheck },
        { keys: ['Alt', '6'], description: 'التقارير الإحصائية المجمعة (Reports)', icon: FileText },
        { keys: ['Alt', '7'], description: 'المراسلات والتوجيهات الرسمية (Correspondence)', icon: Mail }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-right my-8">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                دليل اختصارات لوحة المفاتيح
              </h3>
              <p className="text-xs text-slate-400">
                تسريع عمليات البحث والتنقل وإنشاء العناصر للمستخدمين المتقدمين
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2.5">
              <h4 className="text-xs font-bold text-amber-400/90 uppercase tracking-wider flex items-center gap-1.5">
                <span>{group.title}</span>
              </h4>

              <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl bg-slate-950/50 overflow-hidden">
                {group.shortcuts.map((sc, scIdx) => {
                  const Icon = sc.icon;
                  return (
                    <div
                      key={scIdx}
                      className="p-3 flex items-center justify-between hover:bg-slate-850/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-slate-200">
                          {sc.description}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {sc.keys.map((k, kIdx) => (
                          <React.Fragment key={kIdx}>
                            <kbd className="min-w-[28px] h-7 px-2 flex items-center justify-center text-xs font-mono font-bold text-amber-300 bg-slate-800 border border-slate-700 rounded-md shadow-inner">
                              {k}
                            </kbd>
                            {kIdx < sc.keys.length - 1 && (
                              <span className="text-xs text-slate-500 font-bold px-0.5">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>اضغط على <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-750 font-mono text-white text-[11px]">Esc</kbd> للخروج من النافذة</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            حسناً، فهمت
          </button>
        </div>
      </div>
    </div>
  );
};
