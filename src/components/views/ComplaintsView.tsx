import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { Complaint } from '../../types';
import {
  MessageSquareWarning,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Send,
  Lock,
  X
} from 'lucide-react';

export const ComplaintsView: React.FC = () => {
  const {
    complaints,
    schools,
    currentUser,
    submitComplaint,
    updateComplaintStatus
  } = useRodFarag();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [trackingSearchCode, setTrackingSearchCode] = useState('');
  const [officialResponseText, setOfficialResponseText] = useState('');

  const [formData, setFormData] = useState({
    schoolId: 'sch-01',
    category: 'academic' as Complaint['category'],
    subject: '',
    description: '',
    submitterType: 'student' as Complaint['submitterType'],
    submitterMasked: 'مقدم الشكوى (محمي الهوية والسرية)',
    contact: '01000000000'
  });

  const canManageComplaints = ['super_admin', 'directorate_admin', 'complaints_officer'].includes(currentUser.role);

  const filteredComplaints = complaints.filter((cmp) => {
    // If specific tracking search code is provided
    if (trackingSearchCode && !cmp.trackingCode.toLowerCase().includes(trackingSearchCode.toLowerCase())) {
      return false;
    }

    const matchesSearch =
      cmp.trackingCode.toLowerCase().includes(search.toLowerCase()) ||
      cmp.subject.toLowerCase().includes(search.toLowerCase()) ||
      cmp.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || cmp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenSubmit = () => {
    setFormData({
      schoolId: currentUser.schoolId || 'sch-01',
      category: 'academic',
      subject: '',
      description: '',
      submitterType: currentUser.role === 'parent' ? 'parent' : currentUser.role === 'student' ? 'student' : 'teacher',
      submitterMasked: currentUser.name,
      contact: currentUser.phone || '01000000000'
    });
    setIsSubmitModalOpen(true);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === formData.schoolId) || schools[0];
    submitComplaint({
      schoolId: school.id,
      schoolName: school.name,
      submitterType: formData.submitterType,
      submitterNameMasked: formData.submitterMasked,
      submitterContact: formData.contact,
      category: formData.category,
      subject: formData.subject,
      description: formData.description,
      assignedAuthority: 'لجنة فحص الشكاوى والحياد الإداري بروض الفرج'
    });
    setIsSubmitModalOpen(false);
  };

  const handleIssueResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !officialResponseText.trim()) return;
    updateComplaintStatus(selectedComplaint.id, 'response_issued', officialResponseText);
    setOfficialResponseText('');
    setSelectedComplaint(null);
  };

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'response_issued':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">صدر رد رسمي معتمد</span>;
      case 'under_review':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold">قيد الفحص والمراجعة</span>;
      case 'referred':
        return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-bold">محالة للتوجيه الفني</span>;
      case 'info_requested':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold">تحتاج معلومات إضافية</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full font-bold">جديدة</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <MessageSquareWarning className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              منظومة الشكاوى والتظلمات والنزاهة الإدارية
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              قنوات سرية مؤمنة للطلاب وأولياء الأمور والمعلمين مع أرقام تتبع مشفرة
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenSubmit}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>تقديم شكوى أو تظلم جديد</span>
        </button>
      </div>

      {/* Confidentiality and Anti-retaliation Banner */}
      <div className="p-3.5 bg-slate-900 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <b>حماية الخصوصية ومكافحة تضارب المصالح:</b> يحظر على المشكو في حقه الاطلاع على هوية الشاكي أو حذف الشكوى. وتخضع جميع الإجراءات للمتابعة المباشرة من لجنة التظلمات المركزية بروض الفرج دون أي أثر سلبي على الطالب أو المعلم.
        </div>
      </div>

      {/* Tracking Code Quick Finder */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Lock className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-bold text-white shrink-0">استعلام برقم التتبع السري:</span>
          <input
            type="text"
            value={trackingSearchCode}
            onChange={(e) => setTrackingSearchCode(e.target.value)}
            placeholder="مثال: RDF-CMP-2026-8812"
            className="w-full md:w-60 bg-slate-800 border border-slate-700 text-xs text-slate-200 font-mono placeholder-slate-400 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {trackingSearchCode && (
            <button
              onClick={() => setTrackingSearchCode('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              مسح
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400">الحالة:</span>
          {[
            { id: 'all', label: 'الكل' },
            { id: 'new', label: 'جديدة' },
            { id: 'under_review', label: 'قيد المراجعة' },
            { id: 'response_issued', label: 'تم الرد' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors font-semibold ${
                statusFilter === st.id
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List Cards */}
      <div className="space-y-3">
        {filteredComplaints.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 shadow-sm transition-all text-right"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {c.trackingCode}
                </span>
                <span className="text-xs font-bold text-white">{c.subject}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-slate-400">{c.submittedDate}</span>
                {getStatusBadge(c.status)}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {c.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-4 text-[11px]">
                  <span>المدرسة: <b className="text-slate-200">{c.schoolName}</b></span>
                  <span>الجهة المختصة: <b className="text-slate-200">{c.assignedAuthority}</b></span>
                </div>
                <button
                  onClick={() => setSelectedComplaint(c)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>متابعة تفاصيل الشكوى والردود</span>
                </button>
              </div>

              {c.officialResponse && (
                <div className="mt-3 p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-slate-200">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    القرار والرد الرسمي المعتمد:
                  </div>
                  <p className="text-slate-300 leading-relaxed">{c.officialResponse}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Details & Response Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">{selectedComplaint.subject}</h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  رقم المتابعة: {selectedComplaint.trackingCode}
                </p>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              <div className="bg-slate-850 p-3 rounded-xl space-y-1 text-slate-300">
                <div>المدرسة: <b className="text-white">{selectedComplaint.schoolName}</b></div>
                <div>تاريخ التقديم: <b className="font-mono text-white">{selectedComplaint.submittedDate}</b></div>
                <div>الجهة المكلفة: <b className="text-white">{selectedComplaint.assignedAuthority}</b></div>
                <div>الحالة الحالية: <div className="inline-block mr-2">{getStatusBadge(selectedComplaint.status)}</div></div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">تفاصيل الشكوى / التظلم:</h4>
                <div className="p-3 bg-slate-850/80 rounded-xl text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedComplaint.description}
                </div>
              </div>

              {selectedComplaint.officialResponse ? (
                <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl">
                  <h4 className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    الرد الرسمي المعتمد:
                  </h4>
                  <p className="text-slate-200 leading-relaxed">{selectedComplaint.officialResponse}</p>
                </div>
              ) : (
                canManageComplaints && (
                  <form onSubmit={handleIssueResponse} className="space-y-3 pt-2 border-t border-slate-800">
                    <h4 className="font-bold text-white">تسجيل قرار لجنة الفحص والرد الرسمي:</h4>
                    <textarea
                      rows={3}
                      required
                      value={officialResponseText}
                      onChange={(e) => setOfficialResponseText(e.target.value)}
                      placeholder="اكتب نتيجة الفحص والقرار المتخذ بعد استيفاء المستندات..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => updateComplaintStatus(selectedComplaint.id, 'info_requested')}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs"
                      >
                        طلب معلومات إضافية
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                      >
                        اعتماد ونشر الرد الرسمي
                      </button>
                    </div>
                  </form>
                )
              )}
            </div>

            <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                تقديم شكوى أو تظلم برقم سري
              </h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">المدرسة المعنية</label>
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
                <label className="block text-slate-300 font-bold mb-1">تصنيف الشكوى</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Complaint['category'] })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="academic">أكاديمية (درجات وتقييمات ومناهج)</option>
                  <option value="administrative">إدارية ومعاملات مدرسية</option>
                  <option value="facilities">مرافق وصيانة وتجهيزات</option>
                  <option value="behavioral">سلوكية وانضباط</option>
                  <option value="general">عامة</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">موضوع الشكوى</label>
                <input
                  type="text"
                  required
                  placeholder="موضوع مختصر ومحدد"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">تفاصيل الشكوى والوقائع</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="اشرح الواقعة بالتفصيل مع ذكر التواريخ والشهود إن وجدوا..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  إرسال وتوليد كود التتبع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
