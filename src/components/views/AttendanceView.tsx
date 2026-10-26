import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { AttendanceRecord } from '../../types';
import {
  CalendarCheck,
  Search,
  Filter,
  Plus,
  Building,
  CheckCircle2,
  AlertCircle,
  X,
  Users
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const {
    attendance,
    schools,
    currentUser,
    recordAttendance,
    selectedSchoolFilter
  } = useRodFarag();

  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-10-26');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: '2026-10-26',
    schoolId: 'sch-01',
    grade: 'الصف الأول الثانوي',
    classroom: '1/3',
    totalStudents: 42,
    presentCount: 41,
    absentCount: 1,
    excusedCount: 0
  });

  const canRecord = ['super_admin', 'directorate_admin', 'school_principal', 'student_affairs', 'teacher'].includes(currentUser.role);

  const filteredRecords = attendance.filter((rec) => {
    if (currentUser.schoolId && rec.schoolId !== currentUser.schoolId) return false;
    if (selectedSchoolFilter !== 'all' && rec.schoolId !== selectedSchoolFilter) return false;

    const matchesSearch =
      rec.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      rec.classroom.toLowerCase().includes(search.toLowerCase()) ||
      rec.grade.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === formData.schoolId) || schools[0];
    recordAttendance({
      date: formData.date,
      schoolId: school.id,
      schoolName: school.name,
      grade: formData.grade,
      classroom: formData.classroom,
      totalStudents: Number(formData.totalStudents),
      presentCount: Number(formData.presentCount),
      absentCount: Number(formData.absentCount),
      excusedCount: Number(formData.excusedCount),
      recordedBy: currentUser.name,
      status: 'confirmed'
    });
    setIsRecordModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <CalendarCheck className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              منظومة الحضور والغياب اليومي للطلاب
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              رصد الانضباط المدرسي اليومي في الفصول بجميع مدارس روض الفرج
            </p>
          </div>
        </div>

        {canRecord && (
          <button
            onClick={() => {
              setFormData({
                date: new Date().toISOString().split('T')[0],
                schoolId: currentUser.schoolId || 'sch-01',
                grade: 'الصف الأول الثانوي',
                classroom: '1/3',
                totalStudents: 40,
                presentCount: 38,
                absentCount: 2,
                excusedCount: 0
              });
              setIsRecordModalOpen(true);
            }}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل حضور فصل جديد</span>
          </button>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] text-slate-400 block font-semibold">متوسط الحضور العام</span>
          <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">96.8%</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] text-slate-400 block font-semibold">إجمالي الحاضرين اليوم</span>
          <span className="text-xl font-black text-white font-mono mt-1 block">14,710 طالب</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] text-slate-400 block font-semibold">حالات الغياب المبرر</span>
          <span className="text-xl font-black text-amber-400 font-mono mt-1 block">182 حالة</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] text-slate-400 block font-semibold">السجلات المكتملة</span>
          <span className="text-xl font-black text-blue-400 font-mono mt-1 block">100% المدارس</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالمدرسة أو الفصل..."
            className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>التاريخ:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-mono focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">التاريخ</th>
                <th className="p-3.5">المدرسة</th>
                <th className="p-3.5">الصف والفصل</th>
                <th className="p-3.5">قوة الفصل</th>
                <th className="p-3.5">الحضور</th>
                <th className="p-3.5">الغياب</th>
                <th className="p-3.5">نسبة الانضباط</th>
                <th className="p-3.5">القائم بالرصد</th>
                <th className="p-3.5">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredRecords.map((r) => {
                const percent = Math.round((r.presentCount / r.totalStudents) * 100);
                return (
                  <tr key={r.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="p-3.5 font-mono text-slate-300">{r.date}</td>
                    <td className="p-3.5 font-bold text-white">{r.schoolName}</td>
                    <td className="p-3.5 font-semibold text-amber-300">
                      {r.grade} — فصل {r.classroom}
                    </td>
                    <td className="p-3.5 font-mono text-slate-200">{r.totalStudents} طالب</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">{r.presentCount}</td>
                    <td className="p-3.5 font-mono text-rose-400">{r.absentCount} (عذر: {r.excusedCount})</td>
                    <td className="p-3.5">
                      <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                        {percent}%
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">{r.recordedBy}</td>
                    <td className="p-3.5">
                      <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        معتمد ونهائي
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Attendance Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-amber-400" />
                رصد حضور وانصراف فصل دراسي
              </h3>
              <button onClick={() => setIsRecordModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAttendance} className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">المدرسة</label>
                  <select
                    value={formData.schoolId}
                    onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">التاريخ</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">الصف</label>
                  <input
                    type="text"
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">الفصل</label>
                  <input
                    type="text"
                    required
                    value={formData.classroom}
                    onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">قوة الفصل (العدد)</label>
                  <input
                    type="number"
                    required
                    value={formData.totalStudents}
                    onChange={(e) => setFormData({ ...formData, totalStudents: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">عدد الحاضرين</label>
                  <input
                    type="number"
                    required
                    value={formData.presentCount}
                    onChange={(e) => setFormData({ ...formData, presentCount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">الغياب</label>
                  <input
                    type="number"
                    required
                    value={formData.absentCount}
                    onChange={(e) => setFormData({ ...formData, absentCount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  حفظ السجل وتأكيده
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
