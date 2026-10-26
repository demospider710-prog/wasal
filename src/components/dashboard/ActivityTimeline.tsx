import React, { useState, useMemo } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import {
  Clock,
  GraduationCap,
  Users,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Mail,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

export type ActivityCategory = 'all' | 'students' | 'teachers' | 'system' | 'correspondence';

interface TimelineItem {
  id: string;
  timestamp: string;
  category: 'students' | 'teachers' | 'system' | 'correspondence';
  title: string;
  description: string;
  actorName: string;
  actorRole: string;
  schoolName?: string;
  badgeText: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  targetSection?: 'students' | 'teachers' | 'schools' | 'attendance' | 'correspondence' | 'assessments' | 'complaints';
}

export const ActivityTimeline: React.FC = () => {
  const context = useRodFarag();
  const auditLogs = context?.auditLogs || [];
  const students = context?.students || [];
  const teachers = context?.teachers || [];
  const correspondence = context?.correspondence || [];
  const setActiveSection = context?.setActiveSection || (() => {});

  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('all');
  const [displayCount, setDisplayCount] = useState<number>(6);

  // Compile unified timeline items with useMemo for optimal performance & stability
  const timelineItems = useMemo<TimelineItem[]>(() => {
    const items: TimelineItem[] = [];

    // 1. Audit Logs -> System & Administrative actions
    if (Array.isArray(auditLogs)) {
      auditLogs.forEach((log) => {
        items.push({
          id: `audit-${log.id}`,
          timestamp: log.timestamp || '2026-10-26 12:00:00',
          category: 'system',
          title: log.action || 'إجراء نظام إداري',
          description: log.details || '',
          actorName: log.actorName || 'مسؤول النظام',
          actorRole: 'مسؤول المنظومة الإدارية',
          badgeText: 'إجراء إداري رسمي',
          badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
          icon: ShieldCheck,
          targetSection: (log.targetResource || '').includes('Assessment')
            ? 'assessments'
            : (log.targetResource || '').includes('Complaint')
            ? 'complaints'
            : 'schools'
        });
      });
    }

    // 2. Student Enrollments
    if (Array.isArray(students)) {
      students.slice(0, 6).forEach((st, idx) => {
        const studentDate = st.enrollmentDate || (idx % 2 === 0 ? '2026-10-24 11:20:00' : '2026-10-22 09:40:00');
        items.push({
          id: `stu-${st.id}`,
          timestamp: studentDate,
          category: 'students',
          title: `قيد وتوثيق ملف الطالب: ${st.name}`,
          description: `تم إدراج الطالب بـ ${st.schoolName} (${st.grade} - فصل ${st.classroom}) بنسبة حضور ${st.attendanceRate}%.`,
          actorName: 'مكتب شؤون الطلاب والامتحانات',
          actorRole: 'شؤون الطلاب',
          schoolName: st.schoolName,
          badgeText: 'قيد دارس جديد',
          badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
          icon: GraduationCap,
          targetSection: 'students'
        });
      });
    }

    // 3. Teacher Updates
    if (Array.isArray(teachers)) {
      teachers.slice(0, 5).forEach((tch, idx) => {
        const teacherDate = idx % 2 === 0 ? '2026-10-25 13:15:00' : '2026-10-21 10:00:00';
        items.push({
          id: `tch-${tch.id}`,
          timestamp: teacherDate,
          category: 'teachers',
          title: `اعتماد النصاب وتحديث بيانات: ${tch.name}`,
          description: `توزيع المادة (${tch.subject}) والفصول المسندة (${(tch.assignedClasses || []).join('، ')}) بـ ${tch.schoolName}.`,
          actorName: 'التوجيه الفني العام — إدارة روض الفرج',
          actorRole: 'التوجيه التعليمي',
          schoolName: tch.schoolName,
          badgeText: 'تحديث كادر تدريسي',
          badgeColor: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
          icon: Users,
          targetSection: 'teachers'
        });
      });
    }

    // 4. Correspondence Memos
    if (Array.isArray(correspondence)) {
      correspondence.slice(0, 4).forEach((memo) => {
        items.push({
          id: `memo-${memo.id}`,
          timestamp: memo.date ? `${memo.date} 08:30:00` : '2026-10-24 08:30:00',
          category: 'correspondence',
          title: `إصدار مكاتبة رسمية: ${memo.subject}`,
          description: `توجيه رقم صادر (${memo.outwardNumber}) موجه لمدارس حي روض الفرج بموعد أقصى ${memo.deadlineDate}.`,
          actorName: memo.sender || 'إدارة روض الفرج التعليمية',
          actorRole: 'إدارة التعليم العام',
          badgeText: 'مراسلة وزارية',
          badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
          icon: Mail,
          targetSection: 'correspondence'
        });
      });
    }

    return items;
  }, [auditLogs, students, teachers, correspondence]);

  // Sort Chronologically (Newest first)
  const sortedItems = useMemo(() => {
    return [...timelineItems].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [timelineItems]);

  // Filter by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return sortedItems;
    return sortedItems.filter((item) => item.category === selectedCategory);
  }, [sortedItems, selectedCategory]);

  const displayedItems = filteredItems.slice(0, displayCount);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm text-right">
      {/* Header & Filter Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              سجل النشاط الزمني اللحظي (Activity Timeline)
              <span className="text-xs bg-slate-800 text-amber-400 font-mono px-2 py-0.5 rounded-full border border-slate-700">
                {filteredItems.length} حدث
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              تتبع زمني متسلسل لعمليات القيد الطلابي، تحديثات المعلمين، والقرارات الإدارية المعتمدة
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'students', label: 'قيد الطلاب' },
            { id: 'teachers', label: 'المعلمون' },
            { id: 'system', label: 'إجراءات المنظومة' },
            { id: 'correspondence', label: 'المراسلات' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as ActivityCategory)}
              className={`px-2.5 py-1 text-xs rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Timeline Body */}
      <div className="relative mt-6 mr-3">
        {/* Continuous vertical timeline connector line */}
        <div className="absolute top-2 bottom-4 right-[15px] w-0.5 bg-gradient-to-b from-amber-500/60 via-slate-700 to-slate-800/40 pointer-events-none" />

        <div className="space-y-6">
          {displayedItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative flex items-start gap-4 pr-1 group">
                {/* Node Dot / Icon */}
                <div className="relative z-10 w-8 h-8 rounded-xl bg-slate-900 border-2 border-slate-700 group-hover:border-amber-400 flex items-center justify-center shrink-0 shadow-md transition-colors">
                  <Icon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>

                {/* Event Card */}
                <div className="flex-1 bg-slate-850/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-4 transition-all shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                        {item.badgeText}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    {/* Timestamp */}
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Footer metadata */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300 font-semibold">{item.actorName}</span>
                      <span>•</span>
                      <span className="text-slate-400">{item.actorRole}</span>
                      {item.schoolName && (
                        <>
                          <span>•</span>
                          <span className="text-amber-400/90 flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {item.schoolName}
                          </span>
                        </>
                      )}
                    </div>

                    {item.targetSection && (
                      <button
                        onClick={() => setActiveSection(item.targetSection!)}
                        className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 group-hover:underline cursor-pointer"
                      >
                        <span>عرض التفاصيل</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {displayedItems.length === 0 && (
            <div className="py-8 text-center text-slate-400">
              <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-300">لا توجد أنشطة مسجلة في هذا التصنيف</p>
            </div>
          )}
        </div>
      </div>

      {/* Show more button */}
      {filteredItems.length > displayCount && (
        <div className="mt-5 pt-3 border-t border-slate-800 text-center">
          <button
            onClick={() => setDisplayCount((prev) => prev + 5)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-bold rounded-xl border border-slate-700/80 transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>عرض المزيد من الأنشطة السابقة ({filteredItems.length - displayCount})</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
