import React from 'react';
import { useRodFarag, SectionKey } from '../context/RodFaragContext';
import {
  LayoutDashboard,
  School,
  GraduationCap,
  Users,
  UserCheck,
  CalendarCheck,
  FileCheck2,
  Mail,
  BellRing,
  AlertTriangle,
  MessageSquareWarning,
  Scale,
  ShieldCheck,
  Award,
  BarChart3,
  KeyRound,
  ShieldAlert,
  Settings,
  ChevronLeft,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onOpenUserGuide?: () => void;
  onOpenTour?: () => void;
}

interface NavSectionItem {
  key: SectionKey;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, onOpenUserGuide, onOpenTour }) => {
  const {
    activeSection,
    setActiveSection,
    schools,
    correspondence,
    complaints,
    discipline,
    assessments
  } = useRodFarag();

  const overdueCount = correspondence.filter(c => c.status === 'overdue').length;
  const openComplaintsCount = complaints.filter(c => ['new', 'under_review', 'info_requested'].includes(c.status)).length;
  const pendingHearingsCount = discipline.filter(d => d.hearingStatus === 'scheduled').length;
  const pendingAssessmentsCount = assessments.filter(a => a.status === 'under_review').length;

  const navGroups: { groupTitle: string; items: NavSectionItem[] }[] = [
    {
      groupTitle: 'الإدارة والبيانات المدرسية',
      items: [
        { key: 'dashboard', label: 'الرئيسية ولوحة الإحصائيات', icon: LayoutDashboard },
        { key: 'schools', label: 'إدارة المدارس الـ16', icon: School, badge: schools.length },
        { key: 'teachers', label: 'شؤون المدرسين', icon: Users },
        { key: 'students', label: 'شؤون الطلاب', icon: GraduationCap },
        { key: 'parents', label: 'بوابة أولياء الأمور', icon: UserCheck }
      ]
    },
    {
      groupTitle: 'العمليات التعليمية والتقييم',
      items: [
        { key: 'attendance', label: 'الحضور والغياب', icon: CalendarCheck },
        {
          key: 'assessments',
          label: 'الامتحانات والتقييمات',
          icon: FileCheck2,
          badge: pendingAssessmentsCount > 0 ? pendingAssessmentsCount : undefined,
          badgeColor: 'bg-amber-600'
        },
        {
          key: 'correspondence',
          label: 'المراسلات الإلكترونية',
          icon: Mail,
          badge: overdueCount > 0 ? `${overdueCount} متأخر` : undefined,
          badgeColor: 'bg-rose-600'
        },
        { key: 'notifications', label: 'مركز الإشعارات والتهنئات', icon: BellRing }
      ]
    },
    {
      groupTitle: 'الانضباط والحوكمة والابتكار',
      items: [
        {
          key: 'discipline',
          label: 'الانضباط المدرسي والمخالفات',
          icon: AlertTriangle,
          badge: pendingHearingsCount > 0 ? pendingHearingsCount : undefined,
          badgeColor: 'bg-amber-600'
        },
        {
          key: 'complaints',
          label: 'الشكاوى والتظلمات',
          icon: MessageSquareWarning,
          badge: openComplaintsCount > 0 ? openComplaintsCount : undefined,
          badgeColor: 'bg-blue-600'
        },
        { key: 'governance', label: 'الحقوق والحوكمة المدرسية', icon: Scale },
        { key: 'intellectual_property', label: 'الملكية الفكرية', icon: ShieldCheck },
        { key: 'future_leaders', label: 'قادة المستقبل', icon: Award }
      ]
    },
    {
      groupTitle: 'التقارير والأمان والنظام',
      items: [
        { key: 'reports', label: 'التقارير والإحصائيات', icon: BarChart3 },
        { key: 'users_roles', label: 'المستخدمون والصلاحيات', icon: KeyRound },
        { key: 'security_audit', label: 'الأمان وسجل العمليات', icon: ShieldAlert },
        { key: 'settings', label: 'إعدادات النظام', icon: Settings }
      ]
    }
  ];

  const handleSelect = (key: SectionKey) => {
    setActiveSection(key);
    // On small mobile screens, auto-close sidebar upon selection
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-35 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[93px] right-0 h-screen lg:h-[calc(100vh-93px)] w-72 bg-slate-900 border-l border-slate-800 flex flex-col z-40 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none print:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header in sidebar */}
        <div className="p-4 border-b border-slate-800 lg:hidden flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
              RDF
            </div>
            <span className="font-bold text-white text-sm">أقسام المنظومة (18 قسم)</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center justify-between">
                <span>{group.groupTitle}</span>
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-l from-amber-500/20 to-amber-500/10 text-amber-300 border border-amber-500/40 shadow-xs'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.badge !== undefined && (
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full text-white ${
                              item.badgeColor || 'bg-slate-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {isActive && <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info within sidebar */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-center space-y-2">
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <button
              onClick={() => {
                onOpenUserGuide?.();
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className="text-[11px] font-bold text-slate-300 hover:text-amber-400 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-lg py-1.5 px-2 flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>دليل المستخدم</span>
            </button>
            <button
              onClick={() => {
                onOpenTour?.();
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className="text-[11px] font-bold text-slate-300 hover:text-amber-400 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-lg py-1.5 px-2 flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>جولة تعريفية</span>
            </button>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            إدارة روض الفرج التعليمية
          </div>
          <div className="text-[10px] text-amber-500/90 mt-0.5 font-medium">
            نظام متصل • 16 مدرسة مسجلة
          </div>
        </div>
      </aside>
    </>
  );
};
