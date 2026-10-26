import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { SchoolAdditionRequest } from '../../types/auth';
import { X, Building2, FileCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface RequestSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedGovId?: string;
  preselectedDirId?: string;
}

export const RequestSchoolModal: React.FC<RequestSchoolModalProps> = ({
  isOpen,
  onClose,
  preselectedGovId,
  preselectedDirId
}) => {
  const { governorates, addSchoolAdditionRequest } = useRodFarag();

  const [selectedGovId, setSelectedGovId] = useState<string>(preselectedGovId || 'cairo');
  const [selectedDirId, setSelectedDirId] = useState<string>(preselectedDirId || 'cairo_rodelgard');
  const [schoolName, setSchoolName] = useState('');
  const [stage, setStage] = useState<'primary' | 'preparatory' | 'secondary' | 'vocational' | 'experimental_languages'>('secondary');
  const [educationType, setEducationType] = useState<SchoolAdditionRequest['educationType']>('حكومي عربي');
  const [address, setAddress] = useState('');
  const [decreeNumber, setDecreeNumber] = useState('');
  const [requesterName, setRequesterName] = useState('');
  const [requesterPhone, setRequesterPhone] = useState('');
  const [requesterRole, setRequesterRole] = useState('مدير مدرسة مكلف');
  const [notes, setNotes] = useState('');

  const [submittedRequest, setSubmittedRequest] = useState<SchoolAdditionRequest | null>(null);

  if (!isOpen) return null;

  const currentGov = governorates.find(g => g.id === selectedGovId) || governorates[0];
  const availableDirs = currentGov.directorates;
  const currentDir = availableDirs.find(d => d.id === selectedDirId) || availableDirs[0];

  const stageLabels: Record<string, string> = {
    primary: 'المرحلة الابتدائية',
    preparatory: 'المرحلة الإعدادية',
    secondary: 'المرحلة الثانوية العامة',
    vocational: 'التعليم الفني والتطبيقي',
    experimental_languages: 'الرسمية لغات (تجريبي)'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName.trim() || !requesterName.trim() || !requesterPhone.trim()) {
      return;
    }

    const newReq = addSchoolAdditionRequest({
      schoolName,
      governorateId: currentGov.id,
      governorateName: currentGov.name,
      directorateId: currentDir.id,
      directorateName: currentDir.name,
      stage,
      stageNameAr: stageLabels[stage],
      educationType,
      address,
      ministerialDecreeNumber: decreeNumber,
      requesterName,
      requesterPhone,
      requesterRole,
      notes
    });

    setSubmittedRequest(newReq);
  };

  const handleResetAndClose = () => {
    setSubmittedRequest(null);
    setSchoolName('');
    setAddress('');
    setDecreeNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">طلب إضافة مدرسة جديدة للاعتماد</h3>
              <p className="text-xs text-slate-400">إحالة رسمية لقسم الإحصاء والتخطيط بالإدارة التعليمية</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedRequest ? (
          /* Submission Success View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-white">تم استلام طلب اعتماد المؤسسة بنجاح</h4>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              وفقًا للائحة التنظيمية الموحدة، تم تسجيل الطلب بحالة <span className="text-amber-400 font-bold">«قيد التدقيق والمطابقة»</span>، وسيتم مراجعته والتأكد من اشتراطات هيئة الأبنية التعليمية وقرار التأسيس الوزاري.
            </p>

            <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 max-w-md mx-auto text-right space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">رقم متابعة الطلب:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{submittedRequest.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">اسم المدرسة:</span>
                <span className="font-bold text-white">{submittedRequest.schoolName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">الإدارة والمحافظة:</span>
                <span className="text-slate-300">{submittedRequest.governorateName} — {submittedRequest.directorateName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">حالة الاعتماد:</span>
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold">
                  قيد فحص ومراجعة الإدارة
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition text-sm cursor-pointer"
              >
                العودة ومتابعة التسجيل
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Regulatory Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-3 text-amber-200">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>تنبيه حوكمة معتمد:</strong> لا يسمح النظام بإنشاء مدارس رسمية معتمدة مباشرة من قبل الأفراد. يتم إرسال طلبكم لمديرية التربية والتعليم وقسم التخطيط لمراجعة كود المدرسة وسجل الأبنية التعليمية قبل تفعيلها بالمنظومة.
              </p>
            </div>

            {/* Geographical Hierarchy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">المحافظة</label>
                <select
                  value={selectedGovId}
                  onChange={(e) => {
                    setSelectedGovId(e.target.value);
                    const gov = governorates.find(g => g.id === e.target.value);
                    if (gov && gov.directorates.length > 0) {
                      setSelectedDirId(gov.directorates[0].id);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-amber-500"
                >
                  {governorates.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">الإدارة التعليمية التابع لها</label>
                <select
                  value={selectedDirId}
                  onChange={(e) => setSelectedDirId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-amber-500"
                >
                  {availableDirs.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* School Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">الاسم الرسمي للمدرسة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مدرسة روض الفرج الإعدادية بنات الجديدة"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">المرحلة التعليمية</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="primary">المرحلة الابتدائية</option>
                  <option value="preparatory">المرحلة الإعدادية</option>
                  <option value="secondary">المرحلة الثانوية العامة</option>
                  <option value="experimental_languages">الرسمية لغات تجريبي</option>
                  <option value="vocational">التعليم الفني والتطبيقي</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">نوع التعليم</label>
                <select
                  value={educationType}
                  onChange={(e) => setEducationType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="حكومي عربي">حكومي عربي</option>
                  <option value="تجريبي لغات رسمية">تجريبي لغات رسمية</option>
                  <option value="خاص معتمد">خاص معتمد</option>
                  <option value="تعليم فني وتطبيقي">تعليم فني وتطبيقي</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">رقم القرار الوزاري / رخصة الإنشاء (إن وجد)</label>
                <input
                  type="text"
                  placeholder="رقم القرار لسنة التأسيس"
                  value={decreeNumber}
                  onChange={(e) => setDecreeNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">العنوان بالتفصيل</label>
                <input
                  type="text"
                  placeholder="الشارع، الحي، أقرب علامة مميزة"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Requester Contact Info */}
            <div className="border-t border-slate-800 pt-3">
              <h4 className="text-slate-300 font-bold mb-2">بيانات مقدم الطلب والمتابعة:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">اسم مقدم الطلب *</label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم ثلاثي"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">الصفة / التكليف *</label>
                  <input
                    type="text"
                    required
                    placeholder="مدير مدرسة، وكيل، ممثل إدارة"
                    value={requesterRole}
                    onChange={(e) => setRequesterRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">رقم الهاتف للتواصل *</label>
                  <input
                    type="text"
                    required
                    placeholder="010XXXXXXXX"
                    value={requesterPhone}
                    onChange={(e) => setRequesterPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 text-left font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">ملاحظات إضافية</label>
              <textarea
                rows={2}
                placeholder="أي بيانات تهم قسم التخطيط والمتابعة..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 resize-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold transition"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <FileCheck className="w-4 h-4" />
                إرسال الطلب للاعتماد الرسمي
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
