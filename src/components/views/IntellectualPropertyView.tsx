import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { IntellectualPropertyAsset } from '../../types';
import {
  ShieldCheck,
  Search,
  Filter,
  Plus,
  AlertTriangle,
  FileText,
  Video,
  Layers,
  Copyright,
  CheckCircle2,
  Lock,
  X
} from 'lucide-react';

export const IntellectualPropertyView: React.FC = () => {
  const { ipAssets, schools, currentUser, registerIpAsset, reportIpInfringement } = useRodFarag();
  const [search, setSearch] = useState('');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [infringementModalAsset, setInfringementModalAsset] = useState<IntellectualPropertyAsset | null>(null);
  const [infringementText, setInfringementText] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ownerName: currentUser.name,
    ownerType: 'teacher' as IntellectualPropertyAsset['ownerType'],
    schoolId: currentUser.schoolId || 'sch-01',
    contentType: 'interactive_module' as IntellectualPropertyAsset['contentType'],
    licenseType: 'open_for_directorate' as IntellectualPropertyAsset['licenseType'],
    allowedEntities: 'جميع مدارس روض الفرج الـ16'
  });

  const filteredAssets = ipAssets.filter((asset) => {
    return (
      asset.title.toLowerCase().includes(search.toLowerCase()) ||
      asset.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      asset.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === formData.schoolId) || schools[0];
    registerIpAsset({
      title: formData.title,
      description: formData.description,
      ownerName: formData.ownerName,
      ownerType: formData.ownerType,
      schoolId: school.id,
      schoolName: school.name,
      contentType: formData.contentType,
      licenseType: formData.licenseType,
      allowedEntities: [formData.allowedEntities],
      verificationStatus: 'verified',
      proofDocuments: ['إقرار_تسجيل_مصنف_تربوي.pdf']
    });
    setIsDepositModalOpen(false);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!infringementModalAsset || !infringementText) return;
    reportIpInfringement(infringementModalAsset.id, infringementText);
    setInfringementModalAsset(null);
    setInfringementText('');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              سجل حماية الملكية الفكرية والمحتوى التعليمي الرقمي
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              حفظ حقوق المعلمين والطلاب في الحقائب التدريبية والمصنفات والبرمجيات والمناهج
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({
              title: '',
              description: '',
              ownerName: currentUser.name,
              ownerType: currentUser.role === 'student' ? 'student' : 'teacher',
              schoolId: currentUser.schoolId || 'sch-01',
              contentType: 'interactive_module',
              licenseType: 'open_for_directorate',
              allowedEntities: 'جميع مدارس روض الفرج الـ16'
            });
            setIsDepositModalOpen(true);
          }}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إيداع وتوثيق مصنف تعليمي</span>
        </button>
      </div>

      {/* Legal verification caveat */}
      <div className="p-3.5 bg-slate-900 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
        <Copyright className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <b>ضابط التوثيق:</b> مجرد رفع الملف أو المصنف لا يعد دليلاً قاطعاً على الملكية حتى يخضع للفحص الفني ومطابقة إقرارات الأصالة ومراجعة الاعتراضات من قسم الملكية الفكرية بإدارة روض الفرج.
        </div>
      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث في سجل المصنفات أو اسم المؤلف..."
            className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* IP Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-slate-400">{asset.createdDate}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  asset.verificationStatus === 'verified'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {asset.verificationStatus === 'verified' ? 'مصنف موثق ومعتمد' : 'قيد التدقيق الفني'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">{asset.title}</h3>
              <p className="text-xs text-amber-300 font-medium mt-1">
                صاحب الحقوق: {asset.ownerName} ({asset.schoolName})
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                {asset.description}
              </p>

              <div className="mt-3 p-2 bg-slate-850 rounded-xl text-[11px] space-y-1">
                <div className="text-slate-400">
                  نوع الترخيص: <b className="text-slate-200">{asset.licenseType === 'open_for_directorate' ? 'متاح لجميع مدارس روض الفرج' : 'ترخيص مقيد بإذن مسبق'}</b>
                </div>
                <div className="text-slate-400">
                  المصرح لهم: <b className="text-slate-200">{asset.allowedEntities.join('، ')}</b>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 font-mono">
                {asset.proofDocuments.length} مستندات إثبات
              </span>
              <button
                onClick={() => setInfringementModalAsset(asset)}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold text-[11px]"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>إبلاغ عن انتهاك حقوق</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Infringement Modal */}
      {infringementModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-5">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-2 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              بلاغ انتهاك ملكية فكرية
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              المصنف المعني: {infringementModalAsset.title}
            </p>
            <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
              <textarea
                rows={4}
                required
                value={infringementText}
                onChange={(e) => setInfringementText(e.target.value)}
                placeholder="وضح تفاصيل الانتهاك أو النقل غير المصرح به مع الروابط أو الأدلة..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInfringementModalAsset(null)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg shadow"
                >
                  رفع البلاغ للشؤون القانونية
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                إيداع وتوثيق مصنف تعليمي
              </h3>
              <button onClick={() => setIsDepositModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDeposit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان المصنف أو المحتوى</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: حقيبة تدريبية تفاعلية في الرياضيات"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">وصف العمل ومجال الاستفادة</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="شرح موجز للمحتوى التربوي..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">صاحب الحقوق</label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">نوع المصنف</label>
                  <select
                    value={formData.contentType}
                    onChange={(e) => setFormData({ ...formData, contentType: e.target.value as IntellectualPropertyAsset['contentType'] })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="interactive_module">برمجية وتطبيق تفاعلي</option>
                    <option value="curriculum_guide">دليل تربوي ومذكرة تعليمية</option>
                    <option value="video">مقطع فيديو وشرح مرئي</option>
                    <option value="text">محتوى نصي وبحثي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">شروط الترخيص والاستخدام</label>
                <select
                  value={formData.licenseType}
                  onChange={(e) => setFormData({ ...formData, licenseType: e.target.value as IntellectualPropertyAsset['licenseType'] })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="open_for_directorate">متاح مجاناً لجميع مدارس إدارة روض الفرج</option>
                  <option value="restricted_permission_required">استخدام مقيد بتصريح كتابي مسبق</option>
                  <option value="creative_commons_by_nc">مشاع إبداعي غير تجاري مع نسب المصنف</option>
                </select>
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsDepositModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  إيداع في السجل الرسمي
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
