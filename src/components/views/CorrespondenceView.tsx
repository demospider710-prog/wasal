import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { Correspondence, CorrespondenceStatus, ConfidentialityLevel } from '../../types';
import {
  Mail,
  Search,
  Filter,
  Plus,
  Send,
  Clock,
  AlertTriangle,
  Paperclip,
  CheckCircle2,
  Reply,
  ShieldAlert,
  Printer,
  X,
  FileText,
  Maximize2
} from 'lucide-react';

export const CorrespondenceView: React.FC = () => {
  const {
    correspondence,
    schools,
    currentUser,
    createCorrespondence,
    updateCorrespondenceStatus,
    replyToCorrespondence,
    selectedSchoolFilter,
    toggleFocusMode,
    isFocusMode
  } = useRodFarag();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<Correspondence | null>(null);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const [formData, setFormData] = useState({
    outwardNumber: `${Math.floor(100 + Math.random() * 900)} / صادر تعليم`,
    subject: '',
    content: '',
    recipient: 'جميع المدارس الـ16 التابعة للإدارة',
    confidentiality: 'normal' as ConfidentialityLevel,
    deadlineDate: '2026-11-05'
  });

  const canCompose = ['super_admin', 'directorate_admin', 'school_principal'].includes(currentUser.role);

  const filteredCorrespondence = correspondence.filter((c) => {
    const matchesSearch =
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.outwardNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.referenceNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCompose = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString().split('T')[0];
    const ref = `RDF-COR-${Date.now().toString().slice(-6)}`;

    createCorrespondence({
      referenceNumber: ref,
      outwardNumber: formData.outwardNumber,
      date: now,
      subject: formData.subject,
      content: formData.content,
      sender: currentUser.role === 'directorate_admin' ? 'مدير عام إدارة روض الفرج التعليمية' : `${currentUser.name} (${schools.find(s => s.id === currentUser.schoolId)?.name || 'المدرسة'})`,
      recipients: [formData.recipient],
      confidentiality: formData.confidentiality,
      deadlineDate: formData.deadlineDate,
      status: 'in_progress',
      attachments: [
        { name: 'كتاب_دوري_رسمي_مرفق.pdf', size: '1.2 ميجابايت', type: 'application/pdf' }
      ]
    });

    setIsComposeModalOpen(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !replyText.trim()) return;
    replyToCorrespondence(selectedItem.id, replyText);
    setReplyText('');
    setSelectedItem(null);
  };

  const getStatusBadge = (status: CorrespondenceStatus) => {
    switch (status) {
      case 'overdue':
        return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold">متأخرة عن الموعد</span>;
      case 'replied':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">تم الرد الرسمي</span>;
      case 'in_progress':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">قيد التنفيذ والمتابعة</span>;
      case 'received':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">تم استلامها</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-bold">مسودة</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Mail className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              المراسلات والمكاتبات الإلكترونية الرسمية
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              بديل رقمي معتمد للمكاتبات الورقية بين الإدارة التعليمية والمدارس الـ16
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Reader / Focus Mode Button */}
          <button
            onClick={toggleFocusMode}
            className={`px-3 py-2 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer ${
              isFocusMode
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30'
            }`}
            title="تفعيل وضع القراءة والتركيز لتوسيع مساحة الشاشة وقراءة المكاتبات بوضوح (Alt + F)"
          >
            <Maximize2 className="w-4 h-4 text-amber-400" />
            <span>{isFocusMode ? 'وضع القراءة نشط' : 'وضع القراءة والتركيز'}</span>
            <span className="text-[9px] font-mono opacity-80">Alt+F</span>
          </button>

          {canCompose && (
            <button
              onClick={() => {
                setFormData({
                  outwardNumber: `${Math.floor(100 + Math.random() * 900)} / صادر تعليم 2026`,
                  subject: '',
                  content: '',
                  recipient: 'جميع المدارس الـ16 التابعة للإدارة',
                  confidentiality: 'normal',
                  deadlineDate: '2026-11-05'
                });
                setIsComposeModalOpen(true);
              }}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء مكاتبة رسمية جديدة</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم الصادر، الموضوع، الرقم المرجعي..."
            className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            الحالة:
          </span>
          {[
            { id: 'all', label: 'الكل' },
            { id: 'in_progress', label: 'قيد التنفيذ' },
            { id: 'overdue', label: 'متأخرة' },
            { id: 'replied', label: 'تم الرد' }
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

      {/* Correspondence Cards */}
      <div className="space-y-3">
        {filteredCorrespondence.map((c) => (
          <div
            key={c.id}
            className={`p-4 rounded-2xl border transition-all ${
              c.status === 'overdue'
                ? 'bg-rose-950/20 border-rose-500/30'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 bg-slate-850 px-2 py-0.5 rounded border border-slate-700">
                  {c.outwardNumber}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  مرجع: {c.referenceNumber}
                </span>
                {c.confidentiality === 'confidential' && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                    سري
                  </span>
                )}
                {c.confidentiality === 'top_secret' && (
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded font-bold">
                    سري للغاية
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400">تاريخ الصدور: <b className="text-slate-200 font-mono">{c.date}</b></span>
                <span className="text-slate-400">الموعد الأقصى: <b className={`font-mono ${c.status === 'overdue' ? 'text-rose-400 font-bold' : 'text-amber-400'}`}>{c.deadlineDate}</b></span>
                {getStatusBadge(c.status)}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-bold text-white">{c.subject}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-3">
                {c.content}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                  <span>الجهة المرسلة: <b className="text-slate-200">{c.sender}</b></span>
                  <span>المستلم: <b className="text-slate-200">{c.recipients.join('، ')}</b></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedItem(c)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>عرض التفاصيل والردود ({c.auditTrail.length})</span>
                  </button>
                </div>
              </div>

              {/* School Reply Section Preview */}
              {c.schoolReply && (
                <div className="mt-3 p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-slate-200">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    الرد الرسمي المعتمد من المدرسة ({c.schoolReply.repliedBy}) • {c.schoolReply.repliedAt}:
                  </div>
                  <p className="text-slate-300 leading-relaxed">{c.schoolReply.replyText}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Details & Reply Drawer/Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">{selectedItem.subject}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  رقم صادر: {selectedItem.outwardNumber} • مرجع: {selectedItem.referenceNumber}
                </p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              <div className="bg-slate-850 p-3.5 rounded-xl space-y-2">
                <div className="text-slate-400">المرسل: <b className="text-white">{selectedItem.sender}</b></div>
                <div className="text-slate-400">المستلمون: <b className="text-white">{selectedItem.recipients.join('، ')}</b></div>
                <div className="text-slate-400">تاريخ الإصدار: <b className="text-white font-mono">{selectedItem.date}</b></div>
                <div className="text-slate-400">الموعد المحدد لانتهاء الرد: <b className="text-amber-400 font-mono">{selectedItem.deadlineDate}</b></div>
              </div>

              <div>
                <h4 className="font-bold text-white text-xs mb-1">نص المكاتبة الرسمية:</h4>
                <div className="p-3 bg-slate-850/80 rounded-xl text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedItem.content}
                </div>
              </div>

              {/* Attachments */}
              {selectedItem.attachments.length > 0 && (
                <div>
                  <h4 className="font-bold text-white text-xs mb-1">المرفقات الرسمية:</h4>
                  <div className="space-y-1.5">
                    {selectedItem.attachments.map((att, idx) => (
                      <div key={idx} className="p-2 bg-slate-800 rounded-lg flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-slate-200">
                          <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                          {att.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{att.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action History / Audit Trail */}
              <div>
                <h4 className="font-bold text-white text-xs mb-1">سجل الإجراءات والتداول:</h4>
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden">
                  {selectedItem.auditTrail.map((at, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-850/60 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-bold text-slate-200">{at.action}</span>
                        <span className="text-slate-400 block text-[10px]">بواسطة: {at.actor}</span>
                      </div>
                      <span className="font-mono text-slate-400 text-[10px]">{at.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* School Reply Box */}
              {!selectedItem.schoolReply && (
                <div className="pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
                    <Reply className="w-3.5 h-3.5 text-amber-400" />
                    تسجيل رد المدرسة الرسمي:
                  </h4>
                  <form onSubmit={handleSendReply} className="space-y-2">
                    <textarea
                      rows={3}
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="اكتب رد المدرسة التفصيلي وتأكيد الإجراءات المتخذة..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-xs"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                      >
                        إرسال الرد وتحديث المراسلة
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-850 border-t border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>طباعة أمر التكليف</span>
                </button>
                <button
                  onClick={() => {
                    toggleFocusMode();
                    setSelectedItem(null);
                  }}
                  className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer font-bold"
                  title="الانتقال إلى وضع القراءة الكامل للشاشة"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>قراءة في وضع التركيز (Alt+F)</span>
                </button>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compose Modal */}
      {isComposeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                إصدار مكاتبة رسمية جديدة
              </h3>
              <button onClick={() => setIsComposeModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompose} className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">رقم الصادر الرسمي</label>
                  <input
                    type="text"
                    required
                    value={formData.outwardNumber}
                    onChange={(e) => setFormData({ ...formData, outwardNumber: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">درجة السرية</label>
                  <select
                    value={formData.confidentiality}
                    onChange={(e) => setFormData({ ...formData, confidentiality: e.target.value as ConfidentialityLevel })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="normal">عادي</option>
                    <option value="confidential">سري</option>
                    <option value="top_secret">سري للغاية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الجهات المستلمة</label>
                <select
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="جميع المدارس الـ16 التابعة للإدارة">جميع المدارس الـ16 التابعة للإدارة</option>
                  {schools.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">موضوع المكاتبة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تعليمات تشكيل لجان الرصد والمتابعة"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">نص المكاتبة والتوجيهات</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="يرجى من السادة مديري المدارس اتخاذ اللازم نحو..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الموعد الأقصى للرد والتنفيذ</label>
                <input
                  type="date"
                  required
                  value={formData.deadlineDate}
                  onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsComposeModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  إرسال وتعميم المكاتبة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
