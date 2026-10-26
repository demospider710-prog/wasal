import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { Assessment } from '../../types';
import {
  FileCheck2,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Eye,
  Printer,
  Sparkles,
  Lock,
  X,
  AlertCircle
} from 'lucide-react';

export const AssessmentsView: React.FC = () => {
  const {
    assessments,
    schools,
    currentUser,
    createAssessment,
    approveAssessment,
    publishAssessment,
    selectedSchoolFilter
  } = useRodFarag();

  const [search, setSearch] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: 'تقييم شهر أكتوبر - مادة الرياضيات',
    subject: 'الرياضيات',
    schoolId: 'sch-01',
    grade: 'الصف الأول الثانوي',
    classroom: '1/2',
    date: '2026-10-26',
    maxScore: 30,
    studentScoresText: 'كريم محمد عبد الله : 29\nنور الدين وليد النمر : 25'
  });

  const canApprove = ['super_admin', 'directorate_admin', 'school_principal'].includes(currentUser.role);

  const filteredAssessments = assessments.filter((asm) => {
    if (currentUser.schoolId && asm.schoolId !== currentUser.schoolId) return false;
    if (selectedSchoolFilter !== 'all' && asm.schoolId !== selectedSchoolFilter) return false;

    return (
      asm.title.toLowerCase().includes(search.toLowerCase()) ||
      asm.subject.toLowerCase().includes(search.toLowerCase()) ||
      asm.schoolName.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === formData.schoolId) || schools[0];

    const lines = formData.studentScoresText.split('\n').filter(Boolean);
    const parsedScores = lines.map((line, idx) => {
      const parts = line.split(':');
      const name = parts[0]?.trim() || `طالب ${idx + 1}`;
      const scoreNum = Number(parts[1]?.trim()) || 25;
      let gradeEq = 'جيد';
      if (scoreNum >= formData.maxScore * 0.9) gradeEq = 'ممتاز';
      else if (scoreNum >= formData.maxScore * 0.8) gradeEq = 'جيد جداً';
      else if (scoreNum >= formData.maxScore * 0.65) gradeEq = 'جيد';
      else gradeEq = 'مقبول';

      return {
        studentId: `stu-custom-${idx}`,
        studentName: name,
        score: scoreNum,
        gradeEquivalent: gradeEq
      };
    });

    const average = parsedScores.length > 0
      ? Math.round((parsedScores.reduce((acc, s) => acc + s.score, 0) / parsedScores.length) * 10) / 10
      : 0;

    createAssessment({
      title: formData.title,
      subject: formData.subject,
      schoolId: school.id,
      schoolName: school.name,
      grade: formData.grade,
      classroom: formData.classroom,
      date: formData.date,
      maxScore: Number(formData.maxScore),
      status: 'under_review',
      averageScore: average,
      studentScores: parsedScores
    });

    setIsCreateModalOpen(false);
  };

  const getStatusBadge = (status: Assessment['status']) => {
    switch (status) {
      case 'published':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">منشور ومعلن رسمياً</span>;
      case 'approved':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold">معتمد وجاهز للنشر</span>;
      case 'under_review':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold">قيد المراجعة والتدقيق</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full font-bold">مسودة</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FileCheck2 className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              الامتحانات والتقييمات المدرسية
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              دورة رصد الدرجات: التدقيق الأكاديمي، الاعتماد الرسمي، ونشر النتائج لأولياء الأمور
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>رصد تقييم جديد</span>
        </button>
      </div>

      {/* Rules Notice */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200 flex items-center gap-2">
        <Lock className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          ضابط الحوكمة: لا يتمكن أولياء الأمور أو الطلاب من رؤية نتيجة أي اختبار حتى يتم اعتمادها رسمياً من مدير المدرسة أو الإدارة التعليمية وتغيير حالتها إلى «منشور».
        </span>
      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث باسم التقييم، المادة، المدرسة..."
            className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssessments.map((asm) => (
          <div
            key={asm.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-slate-400">{asm.date}</span>
                {getStatusBadge(asm.status)}
              </div>

              <h3 className="text-sm font-bold text-white line-clamp-1">{asm.title}</h3>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">
                {asm.subject} • {asm.grade} (فصل {asm.classroom})
              </p>
              <p className="text-[11px] text-slate-400 mt-1">{asm.schoolName}</p>

              <div className="grid grid-cols-2 gap-2 mt-3 p-2 bg-slate-850 rounded-xl text-xs text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">الدرجة العظمى</span>
                  <span className="font-bold text-white font-mono">{asm.maxScore} درجة</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">متوسط الدرجات</span>
                  <span className="font-bold text-emerald-400 font-mono">{asm.averageScore || '—'}</span>
                </div>
              </div>

              {asm.approvedBy && (
                <div className="mt-2 text-[10px] text-slate-400 text-right">
                  الاعتماد: <span className="text-slate-300 font-medium">{asm.approvedBy}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedAssessment(asm)}
                className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>كشف الدرجات</span>
              </button>

              {/* Approval Button for Authorized Roles */}
              {canApprove && asm.status === 'under_review' && (
                <button
                  onClick={() => approveAssessment(asm.id)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  اعتماد رسمي
                </button>
              )}

              {/* Publish Button */}
              {canApprove && asm.status === 'approved' && (
                <button
                  onClick={() => publishAssessment(asm.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  نشر للأولياء
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Assessment Scores Drawer / Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">{selectedAssessment.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedAssessment.schoolName} • {selectedAssessment.grade} (فصل {selectedAssessment.classroom})
                </p>
              </div>
              <button onClick={() => setSelectedAssessment(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between text-xs bg-slate-850 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block">حالة التقييم</span>
                  <div className="mt-1">{getStatusBadge(selectedAssessment.status)}</div>
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block">الدرجة القصوى</span>
                  <span className="font-bold text-white font-mono">{selectedAssessment.maxScore} درجة</span>
                </div>
              </div>

              {/* Student scores table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">اسم الطالب</th>
                      <th className="p-3">الدرجة المرصودة</th>
                      <th className="p-3">التقدير</th>
                      <th className="p-3">الملاحظات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {selectedAssessment.studentScores.map((score, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-bold text-white">{score.studentName}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">
                          {score.score} / {selectedAssessment.maxScore}
                        </td>
                        <td className="p-3">
                          <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-bold text-[11px]">
                            {score.gradeEquivalent}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{score.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 bg-slate-850 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>طباعة استمارة النتيجة</span>
              </button>

              <div className="flex items-center gap-2">
                {canApprove && selectedAssessment.status === 'under_review' && (
                  <button
                    onClick={() => {
                      approveAssessment(selectedAssessment.id);
                      setSelectedAssessment(null);
                    }}
                    className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg"
                  >
                    اعتماد النتيجة
                  </button>
                )}
                {canApprove && selectedAssessment.status === 'approved' && (
                  <button
                    onClick={() => {
                      publishAssessment(selectedAssessment.id);
                      setSelectedAssessment(null);
                    }}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg"
                  >
                    نشر النتيجة رسمياً
                  </button>
                )}
                <button
                  onClick={() => setSelectedAssessment(null)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Assessment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                رصد تقييم شهري جديد
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان التقييم</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

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
                  <label className="block text-slate-300 font-bold mb-1">المادة الدراسية</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
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
                <div>
                  <label className="block text-slate-300 font-bold mb-1">الدرجة العظمى</label>
                  <input
                    type="number"
                    required
                    value={formData.maxScore}
                    onChange={(e) => setFormData({ ...formData, maxScore: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  رصد درجات الطلاب (سطر لكل طالب: الاسم : الدرجة)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.studentScoresText}
                  onChange={(e) => setFormData({ ...formData, studentScoresText: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  حفظ وتقديم للمراجعة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
