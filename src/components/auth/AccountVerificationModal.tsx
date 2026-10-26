import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { checkAccountStatus } from '../../utils/registration-logic';
import { AccreditationCheckResult } from '../../types/auth';
import {
  X,
  ShieldCheck,
  Search,
  CheckCircle,
  AlertTriangle,
  FileText,
  Printer,
  Award,
  Building,
  School as SchoolIcon,
  BadgeAlert
} from 'lucide-react';

interface AccountVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountVerificationModal: React.FC<AccountVerificationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { demoUsers, teachers, students, currentUser } = useRodFarag();
  const [queryInput, setQueryInput] = useState('');
  const [result, setResult] = useState<AccreditationCheckResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!queryInput.trim()) return;

    const res = checkAccountStatus(
      demoUsers,
      teachers,
      students,
      queryInput.trim()
    );

    setResult(res);
    setHasSearched(true);
  };

  const handleQuickTest = (term: string) => {
    setQueryInput(term);
    const res = checkAccountStatus(demoUsers, teachers, students, term);
    setResult(res);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">بوابة التحقق من الحساب والاعتماد الرسمي</h3>
              <p className="text-xs text-slate-400">استعلام فوري عن صحة القيد والاعتماد في منظومة روض الفرج</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            أدخل الرقم القومي (14 رقم) أو الكود الوظيفي / كود الطالب:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="مثال: T-1001 أو RDF-STU-001 أو 30104120101234"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pr-9 pl-3 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition text-xs shrink-0 cursor-pointer shadow-md shadow-amber-500/20"
            >
              استعلام الآن
            </button>
          </div>

          {/* Quick Demo Test Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
            <span>نماذج جاهزة للفحص السريع:</span>
            <button
              type="button"
              onClick={() => handleQuickTest('T-1001')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer"
            >
              كود معلم: T-1001
            </button>
            <button
              type="button"
              onClick={() => handleQuickTest('RDF-STU-001')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer"
            >
              كود طالب: RDF-STU-001
            </button>
            <button
              type="button"
              onClick={() => handleQuickTest(currentUser.id)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer"
            >
              حسابي الحالي
            </button>
          </div>
        </form>

        {/* Results Area */}
        {hasSearched && result && (
          <div className="mt-5 border-t border-slate-800 pt-4">
            {result.found ? (
              /* Verified Card */
              <div className="bg-slate-950 border-2 border-emerald-500/40 rounded-2xl p-5 relative overflow-hidden shadow-xl">
                {/* Official Certificate Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="text-xs font-black text-amber-400 block">
                        إفادة اعتماد إلكترونية رسمية
                      </span>
                      <span className="text-[10px] text-slate-400">
                        وزارة التربية والتعليم — إدارة روض الفرج التعليمية
                      </span>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    معتمد ونشط
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px] mb-0.5">الاسم المسجل:</span>
                    <span className="font-bold text-white text-sm">{result.userName}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px] mb-0.5">الصفة أو التخصص:</span>
                    <span className="font-semibold text-amber-300">{result.roleNameAr}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                    <SchoolIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">المؤسسة التعليمية:</span>
                      <span className="font-medium text-slate-200">{result.schoolName}</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">الإدارة والمحافظة:</span>
                      <span className="font-medium text-slate-200">{result.directorateName} — {result.governorateName}</span>
                    </div>
                  </div>
                </div>

                {/* Verification Meta */}
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">الرقم المرجعي للاعتماد:</span>
                    <span className="font-mono text-amber-400 font-bold">{result.certificateRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">تاريخ القيد والتفعيل:</span>
                    <span className="text-slate-300 font-mono">{result.submissionDate}</span>
                  </div>
                  <div className="pt-1 text-slate-300">
                    <span className="text-slate-400">ملاحظات التدقيق: </span>
                    {result.accreditationNotes}
                  </div>
                </div>

                {/* Print button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    طباعة إفادة القيد المعتمدة
                  </button>
                </div>
              </div>
            ) : (
              /* Not Found Card */
              <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto">
                  <BadgeAlert className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">لم يتم العثور على سجل مطابق</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  {result.statusTextAr}
                </p>
                <div className="pt-2 text-xs text-amber-400/90 font-medium">
                  💡 تلميح: إذا كنت قد سجلت حديثًا، فقد يستغرق اعتماد الحساب من قسم الإحصاء بالإدارة حتى 24 ساعة.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
