import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import {
  BarChart3,
  Printer,
  Download,
  Filter,
  Building2,
  CalendarCheck,
  FileCheck2,
  Mail,
  MessageSquareWarning,
  Award,
  TrendingUp,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Maximize2,
  BookOpen
} from 'lucide-react';
import { exportToExcel, exportToPDF } from '../../utils/export-utils';

export const ReportsView: React.FC = () => {
  const {
    schools,
    teachers,
    students,
    attendance,
    assessments,
    correspondence,
    complaints,
    futureLeaders,
    exportDatabaseJSON,
    addToast,
    toggleFocusMode,
    isFocusMode
  } = useRodFarag();

  const [activeReportTab, setActiveReportTab] = useState<'schools' | 'attendance' | 'assessments' | 'correspondence'>('schools');

  const totalRegisteredStudents = schools.reduce((acc, s) => acc + (s.studentsCount || 0), 0);
  const totalTeachers = schools.reduce((acc, s) => acc + (s.teachersCount || 0), 0);
  const totalClasses = schools.reduce((acc, s) => acc + (s.classesCount || 0), 0);
  const overdueCount = correspondence.filter(c => c.status === 'overdue').length;

  const handleExportExcel = () => {
    if (activeReportTab === 'schools') {
      const headers = ['كود المدرسة', 'اسم المدرسة', 'المرحلة الدراسية', 'مدير المدرسة', 'عدد الطلاب', 'عدد المعلمين', 'عدد الفصول', 'متوسط الكثافة', 'حالة الاعتماد'];
      const rows = schools.map(s => [
        s.code,
        s.name,
        s.stageNameAr,
        s.principalName,
        s.studentsCount,
        s.teachersCount,
        s.classesCount,
        Math.round(s.studentsCount / s.classesCount),
        s.accreditationStatus === 'accredited' ? 'معتمدة' : 'قيد الاعتماد'
      ]);
      const stats = [
        { label: 'إجمالي المدارس', value: '16 مدرسة' },
        { label: 'إجمالي الطلاب المقيدين', value: totalRegisteredStudents },
        { label: 'إجمالي المعلمين', value: totalTeachers },
        { label: 'إجمالي الفصول', value: totalClasses }
      ];
      exportToExcel('تقرير_مدارس_روض_الفرج', 'بيان المدارس والكثافات والإحصائيات التجميعية', headers, rows, stats);
      addToast('تم تصدير تقرير المدارس بصيغة Excel بنجاح', 'success');
    } else if (activeReportTab === 'attendance') {
      const headers = ['التاريخ', 'اسم المدرسة', 'المرحلة والفصل', 'قوة الفصل', 'عدد الحاضرين', 'عدد الغائبين', 'نسبة الحضور %'];
      const rows = attendance.map(a => [
        a.date,
        a.schoolName,
        `${a.grade} (${a.classroom})`,
        a.totalStudents,
        a.presentCount,
        a.absentCount,
        `${Math.round((a.presentCount / a.totalStudents) * 100)}%`
      ]);
      const stats = [
        { label: 'متوسط الحضور العام', value: '96.8%' },
        { label: 'إجمالي السجلات المرصودة', value: attendance.length }
      ];
      exportToExcel('تقرير_الحضور_والانضباط_روض_الفرج', 'بيان نسب حضور وانضباط الطلاب اليومي', headers, rows, stats);
      addToast('تم تصدير تقرير الحضور والانضباط بصيغة Excel بنجاح', 'success');
    } else if (activeReportTab === 'assessments') {
      const headers = ['اسم التقييم', 'المادة الدراسية', 'المدرسة', 'الدرجة العظمى', 'متوسط الدرجات', 'حالة الاعتماد', 'المسؤول المعتمد'];
      const rows = assessments.map(asm => [
        asm.title,
        asm.subject,
        asm.schoolName,
        asm.maxScore,
        asm.averageScore || '—',
        asm.status === 'published' ? 'منشور ومعتمد' : 'معتمد',
        asm.approvedBy || '—'
      ]);
      exportToExcel('تقرير_التقييمات_والامتحانات', 'مؤشرات نتائج تقييمات شهر أكتوبر ونوفمبر', headers, rows);
      addToast('تم تصدير تقرير التقييمات بصيغة Excel بنجاح', 'success');
    } else if (activeReportTab === 'correspondence') {
      const headers = ['رقم الصادر', 'الموضوع والتوجيه', 'تاريخ الصدور', 'الموعد الأقصى', 'الحالة'];
      const rows = correspondence.map(c => [
        c.outwardNumber,
        c.subject,
        c.date,
        c.deadlineDate,
        c.status === 'overdue' ? 'متأخرة عن الموعد' : 'في الموعد المحدد'
      ]);
      const stats = [
        { label: 'إجمالي المكاتبات الصادرة', value: correspondence.length },
        { label: 'المتأخرة عن الموعد', value: overdueCount },
        { label: 'نسبة الاستجابة في الموعد', value: `${Math.round(((correspondence.length - overdueCount) / correspondence.length) * 100)}%` }
      ];
      exportToExcel('تقرير_المراسلات_والمكاتبات', 'كفاءة تداول المراسلات والمكاتبات الرسمية', headers, rows, stats);
      addToast('تم تصدير تقرير المراسلات بصيغة Excel بنجاح', 'success');
    }
  };

  const handleExportPDF = () => {
    addToast('جاري تجهيز تقرير PDF الرسمي للطباعة والحفظ الرقمي...', 'info');
    setTimeout(() => {
      exportToPDF('التقرير الإحصائي', 'إدارة روض الفرج التعليمية');
    }, 200);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BarChart3 className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              التقارير الإحصائية والمؤشرات التجميعية
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              مخرجات رسمية قابلة للطباعة والتصدير لمتابعة أداء مدارس روض الفرج الـ16
            </p>
          </div>
        </div>

        {/* Export Data Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export to Excel */}
          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
            title="تحميل المقاييس الحالية كملف Excel (.csv)"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>تصدير Excel (.xlsx)</span>
          </button>

          {/* Export to PDF */}
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
            title="تحميل التقرير كملف PDF رسمي"
          >
            <FileText className="w-4 h-4" />
            <span>تصدير PDF</span>
          </button>

          {/* Print */}
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
            title="طباعة التقرير"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">طباعة</span>
          </button>

          {/* Focus / Reader Mode */}
          <button
            onClick={toggleFocusMode}
            className={`px-3 py-2 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer ${
              isFocusMode
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30'
            }`}
            title="تفعيل وضع القراءة والتركيز لتوسيع مساحة الشاشة وإخفاء القوائم (Alt + F)"
          >
            <Maximize2 className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{isFocusMode ? 'وضع القراءة نشط' : 'وضع القراءة'}</span>
            <span className="text-[9px] font-mono opacity-80">Alt+F</span>
          </button>

          {/* JSON Backup */}
          <button
            onClick={exportDatabaseJSON}
            className="px-2.5 py-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-750 text-xs rounded-xl transition-all cursor-pointer"
            title="تصدير قاعدة البيانات بالكامل بصيغة JSON"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'schools', label: 'تقرير ملخص المدارس الـ16', icon: Building2 },
          { id: 'attendance', label: 'تقرير الحضور والانضباط', icon: CalendarCheck },
          { id: 'assessments', label: 'مؤشرات نتائج الامتحانات', icon: FileCheck2 },
          { id: 'correspondence', label: 'كفاءة تداول المراسلات', icon: Mail }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeReportTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveReportTab(tab.id as typeof activeReportTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-850'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        {/* Printable Official Header */}
        <div className="pb-4 mb-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-amber-400 font-bold">إدارة روض الفرج التعليمية — وحدة نظم المعلومات والتقارير</div>
            <h3 className="text-base font-black text-white mt-1">
              تقرير إحصائي دوري: {activeReportTab === 'schools' ? 'بيان المدارس والكثافات' : activeReportTab === 'attendance' ? 'الانضباط ونسب الحضور' : activeReportTab === 'assessments' ? 'نتائج التقييمات المعتمدة' : 'متابعة المراسلات والمكاتبات'}
            </h3>
          </div>
          <div className="text-left text-xs font-mono text-slate-400">
            تاريخ استخراج التقرير: {new Date().toISOString().split('T')[0]}
          </div>
        </div>

        {/* Tab 1: Schools Summary Report */}
        {activeReportTab === 'schools' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center bg-slate-850 p-3 rounded-xl text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">إجمالي الطلاب المقيدين</span>
                <span className="font-bold text-lg text-white font-mono">{totalRegisteredStudents.toLocaleString('ar-EG')}</span>
              </div>
              <div className="border-r border-l border-slate-700">
                <span className="text-slate-400 block text-[11px]">إجمالي المعلمين</span>
                <span className="font-bold text-lg text-emerald-400 font-mono">{totalTeachers.toLocaleString('ar-EG')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">الفصول الدراسية</span>
                <span className="font-bold text-lg text-amber-400 font-mono">{totalClasses}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">الكود</th>
                    <th className="p-3">اسم المدرسة</th>
                    <th className="p-3">المرحلة</th>
                    <th className="p-3">مدير المدرسة</th>
                    <th className="p-3">الطلاب</th>
                    <th className="p-3">المعلمون</th>
                    <th className="p-3">الفصول</th>
                    <th className="p-3">متوسط الكثافة</th>
                    <th className="p-3">الاعتماد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {schools.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-850/60">
                      <td className="p-3 font-mono text-amber-400 font-bold">{s.code}</td>
                      <td className="p-3 font-bold text-white">{s.name}</td>
                      <td className="p-3 text-slate-300">{s.stageNameAr}</td>
                      <td className="p-3 text-slate-300">{s.principalName}</td>
                      <td className="p-3 font-mono text-slate-200">{s.studentsCount}</td>
                      <td className="p-3 font-mono text-slate-200">{s.teachersCount}</td>
                      <td className="p-3 font-mono text-slate-200">{s.classesCount}</td>
                      <td className="p-3 font-mono text-amber-400 font-bold">
                        {Math.round(s.studentsCount / s.classesCount)} طالب/فصل
                      </td>
                      <td className="p-3">
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                          {s.accreditationStatus === 'accredited' ? 'معتمدة' : 'قيد الاعتماد'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Attendance Report */}
        {activeReportTab === 'attendance' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-850 rounded-xl text-xs text-slate-300 flex items-center justify-between">
              <span>متوسط نسبة الانتظام لمدارس روض الفرج: <b className="text-emerald-400 font-mono text-sm">96.8%</b></span>
              <span>أعلى مرحلة انتظاماً: <b className="text-amber-400">المرحلة الثانوية</b></span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">التاريخ</th>
                    <th className="p-3">المدرسة</th>
                    <th className="p-3">الفصل</th>
                    <th className="p-3">قوة الفصل</th>
                    <th className="p-3">الحاضرون</th>
                    <th className="p-3">الغياب</th>
                    <th className="p-3">نسبة الحضور</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {attendance.map((att) => {
                    const percent = Math.round((att.presentCount / att.totalStudents) * 100);
                    return (
                      <tr key={att.id}>
                        <td className="p-3 font-mono">{att.date}</td>
                        <td className="p-3 font-bold text-white">{att.schoolName}</td>
                        <td className="p-3 font-mono text-amber-300">{att.grade} ({att.classroom})</td>
                        <td className="p-3 font-mono">{att.totalStudents}</td>
                        <td className="p-3 font-mono text-emerald-400 font-bold">{att.presentCount}</td>
                        <td className="p-3 font-mono text-rose-400">{att.absentCount}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">{percent}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Assessments Report */}
        {activeReportTab === 'assessments' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">اسم التقييم</th>
                    <th className="p-3">المادة</th>
                    <th className="p-3">المدرسة</th>
                    <th className="p-3">الدرجة العظمى</th>
                    <th className="p-3">متوسط الدرجات</th>
                    <th className="p-3">حالة الاعتماد</th>
                    <th className="p-3">المسؤول المعتمد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {assessments.map((asm) => (
                    <tr key={asm.id}>
                      <td className="p-3 font-bold text-white">{asm.title}</td>
                      <td className="p-3 text-amber-300">{asm.subject}</td>
                      <td className="p-3 text-slate-300">{asm.schoolName}</td>
                      <td className="p-3 font-mono">{asm.maxScore} درجة</td>
                      <td className="p-3 font-mono font-bold text-emerald-400">{asm.averageScore || '—'}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          asm.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {asm.status === 'published' ? 'منشور ومعتمد' : 'معتمد'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400">{asm.approvedBy || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Correspondence Timeliness */}
        {activeReportTab === 'correspondence' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 bg-slate-850 p-3 rounded-xl text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">المكاتبات الصادرة</span>
                <span className="font-bold text-lg text-white font-mono">{correspondence.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">المتأخرة عن الموعد المحدد</span>
                <span className="font-bold text-lg text-rose-400 font-mono">{overdueCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">نسبة الاستجابة في الموعد</span>
                <span className="font-bold text-lg text-emerald-400 font-mono">
                  {Math.round(((correspondence.length - overdueCount) / correspondence.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">رقم الصادر</th>
                    <th className="p-3">الموضوع</th>
                    <th className="p-3">تاريخ الصدور</th>
                    <th className="p-3">الموعد الأقصى</th>
                    <th className="p-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {correspondence.map((c) => (
                    <tr key={c.id}>
                      <td className="p-3 font-mono font-bold text-amber-400">{c.outwardNumber}</td>
                      <td className="p-3 font-bold text-white">{c.subject}</td>
                      <td className="p-3 font-mono text-slate-400">{c.date}</td>
                      <td className="p-3 font-mono text-slate-400">{c.deadlineDate}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.status === 'overdue' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {c.status === 'overdue' ? 'متأخرة' : 'في الموعد'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
