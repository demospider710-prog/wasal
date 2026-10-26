import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { DisciplineIncident } from '../../types';
import {
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Scale,
  ShieldAlert,
  FileText,
  CheckCircle2,
  Lock,
  UserCheck,
  X
} from 'lucide-react';

export const DisciplineView: React.FC = () => {
  const {
    discipline,
    schools,
    currentUser,
    reportDisciplineIncident,
    updateDisciplineHearing,
    approveDisciplineDecision,
    selectedSchoolFilter
  } = useRodFarag();

  const [search, setSearch] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<DisciplineIncident | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [decisionSanctionText, setDecisionSanctionText] = useState('');

  const [formData, setFormData] = useState({
    schoolId: 'sch-01',
    incidentType: 'behavioral' as DisciplineIncident['incidentType'],
    descriptionSummary: '',
    partiesMasked: 'طالب كود #802 (الصف الثاني الثانوي)، طالب كود #810',
    reviewingOfficer: 'الأخصائي الاجتماعي ورئيس لجنة الحماية المدرسية'
  });

  const canManage = ['super_admin', 'directorate_admin', 'school_principal'].includes(currentUser.role);

  const filteredIncidents = discipline.filter((inc) => {
    if (currentUser.schoolId && inc.schoolId !== currentUser.schoolId) return false;
    if (selectedSchoolFilter !== 'all' && inc.schoolId !== selectedSchoolFilter) return false;

    return (
      inc.incidentNumber.toLowerCase().includes(search.toLowerCase()) ||
      inc.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      inc.descriptionSummary.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === formData.schoolId) || schools[0];
    const now = new Date().toISOString().split('T')[0];

    reportDisciplineIncident({
      schoolId: school.id,
      schoolName: school.name,
      date: now,
      incidentType: formData.incidentType,
      descriptionSummary: formData.descriptionSummary,
      partiesInvolvedMasked: formData.partiesMasked.split('،').map(p => p.trim()).filter(Boolean),
      evidenceDocuments: ['محضر_إثبات_حالة_أولي.pdf'],
      reviewingOfficer: formData.reviewingOfficer,
      hearingStatus: 'scheduled',
      status: 'under_investigation',
      isAppealable: true
    });

    setIsReportModalOpen(false);
  };

  const handleApproveDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncident) return;
    const res = approveDisciplineDecision(selectedIncident.id, decisionSanctionText);
    if (res.success) {
      setSelectedIncident(null);
      setDecisionSanctionText('');
    }
  };

  const getStatusBadge = (status: DisciplineIncident['status']) => {
    switch (status) {
      case 'decision_approved':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">تم اعتماد الإجراء والقرار</span>;
      case 'hearing_in_progress':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">جلسة استماع وسماع أقوال</span>;
      default:
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">قيد التحقيق المبدئي</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              الانضباط المدرسي ولجان الحماية المدرسية
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              توثيق الوقائع بخصوصية وسرية، ضمان المحاكمة العادلة وسماع الأطراف، وحظر الجزاءات التلقائية
            </p>
          </div>
        </div>

        {canManage && (
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>توثيق واقعة انضباط جديدة</span>
          </button>
        )}
      </div>

      {/* Due Process & Legal Notice */}
      <div className="p-3.5 bg-slate-900 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
        <Scale className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <b>ضوابط العدالة التربوية:</b> لا تصدر أي عقوبة أو جزاء تلقائياً بناءً على مجرد البلاغ. يلزم انعقاد لجنة الحماية وسماع أقوال الأطراف وتدوين محضر رسمي، وتظل القرارات قابلة للتظلم أمام الإدارة التعليمية لحماية حقوق الطلاب.
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">رقم الواقعة</th>
                <th className="p-3.5">المدرسة</th>
                <th className="p-3.5">التاريخ</th>
                <th className="p-3.5">التصنيف</th>
                <th className="p-3.5">الوصف الموضوعي</th>
                <th className="p-3.5">الأطراف المعنية (مشفر)</th>
                <th className="p-3.5">جلسة الاستماع</th>
                <th className="p-3.5">حالة المتابعة</th>
                <th className="p-3.5">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="p-3.5 font-mono text-amber-400 font-bold">{inc.incidentNumber}</td>
                  <td className="p-3.5 font-bold text-white">{inc.schoolName}</td>
                  <td className="p-3.5 font-mono text-slate-400">{inc.date}</td>
                  <td className="p-3.5 text-slate-200">
                    {inc.incidentType === 'behavioral' ? 'سلوك طلابي' : 'مخالفة انضباط ومواعيد'}
                  </td>
                  <td className="p-3.5 text-slate-300 max-w-xs truncate">{inc.descriptionSummary}</td>
                  <td className="p-3.5">
                    <span className="text-[11px] font-mono text-amber-300 bg-slate-800 px-2 py-0.5 rounded">
                      {inc.partiesInvolvedMasked.join('، ')}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inc.hearingStatus === 'conducted'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {inc.hearingStatus === 'conducted' ? 'تمت الجلسة وسماع الأقوال' : 'مجدولة بانتظار الانعقاد'}
                    </span>
                  </td>
                  <td className="p-3.5">{getStatusBadge(inc.status)}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => setSelectedIncident(inc)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold rounded-lg"
                    >
                      فحص واتخاذ قرار
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision / Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">
                  محضر الواقعة: {selectedIncident.incidentNumber}
                </h3>
                <p className="text-xs text-slate-400">{selectedIncident.schoolName}</p>
              </div>
              <button onClick={() => setSelectedIncident(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              <div className="bg-slate-850 p-3 rounded-xl space-y-1.5">
                <div>الطرف المسؤول عن الفحص: <b className="text-white">{selectedIncident.reviewingOfficer}</b></div>
                <div>حالة جلسة الاستماع: <b className="text-amber-400">{selectedIncident.hearingStatus === 'conducted' ? 'تمت وسُمعت أقوال الأطراف' : 'مجدولة'}</b></div>
                <div>الأطراف المعنية بحماية الخصوصية: <b className="font-mono text-slate-200">{selectedIncident.partiesInvolvedMasked.join('، ')}</b></div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">وصف الواقعة الموضوعي:</h4>
                <div className="p-3 bg-slate-850/80 rounded-xl text-slate-300 leading-relaxed">
                  {selectedIncident.descriptionSummary}
                </div>
              </div>

              {selectedIncident.approvedSanction ? (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
                  <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    القرار التأديبي / التربوي المعتمد:
                  </div>
                  <p className="text-slate-200 leading-relaxed">{selectedIncident.approvedSanction}</p>
                  <div className="text-[10px] text-slate-400 mt-2">
                    تاريخ الاعتماد: {selectedIncident.closedDate} • القرار خاضع للتظلم أمام الإدارة التعليمية
                  </div>
                </div>
              ) : (
                canManage && (
                  <form onSubmit={handleApproveDecision} className="space-y-3 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white">تسجيل القرار التربوي / الجزاء المعتمد:</h4>
                      {selectedIncident.hearingStatus !== 'conducted' && (
                        <button
                          type="button"
                          onClick={() => updateDisciplineHearing(selectedIncident.id, 'conducted')}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-bold"
                        >
                          تأكيد عقد جلسة الاستماع
                        </button>
                      )}
                    </div>

                    <textarea
                      rows={3}
                      required
                      value={decisionSanctionText}
                      onChange={(e) => setDecisionSanctionText(e.target.value)}
                      placeholder="اكتب التوجيه التربوي والقرار المعتمد بناءً على ما أسفرت عنه جلسة الاستماع ولائحة الانضباط..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                      >
                        اعتماد وتوثيق القرار رسمياً
                      </button>
                    </div>
                  </form>
                )
              )}
            </div>

            <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                توثيق واقعة انضباط وإحالتها للتحقيق
              </h3>
              <button onClick={() => setIsReportModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReport} className="p-4 space-y-3 text-xs">
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
                <label className="block text-slate-300 font-bold mb-1">تصنيف الواقعة</label>
                <select
                  value={formData.incidentType}
                  onChange={(e) => setFormData({ ...formData, incidentType: e.target.value as DisciplineIncident['incidentType'] })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="behavioral">سلوك طلابي غير منضبط</option>
                  <option value="academic_integrity">نزاهة أكاديمية واختبارات</option>
                  <option value="attendance_violation">تكرار غياب وتأخر غير مبرر</option>
                  <option value="property_damage">إتلاف مرافق مدرسية</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الوصف الموضوعي المختصر</label>
                <textarea
                  rows={3}
                  required
                  value={formData.descriptionSummary}
                  onChange={(e) => setFormData({ ...formData, descriptionSummary: e.target.value })}
                  placeholder="وصف موضوعي للواقعة دون أحكام مسبقة..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الأطراف المعنية (مع تشفير الأسماء للسرية)</label>
                <input
                  type="text"
                  required
                  value={formData.partiesMasked}
                  onChange={(e) => setFormData({ ...formData, partiesMasked: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  توثيق وجدولة جلسة الاستماع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
