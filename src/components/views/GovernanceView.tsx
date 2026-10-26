import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { SchoolGovernanceDoc } from '../../types';
import {
  Scale,
  ShieldCheck,
  FileText,
  AlertCircle,
  Download,
  BookOpen,
  Printer,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const GovernanceView: React.FC = () => {
  const { governanceDocs } = useRodFarag();
  const [expandedId, setExpandedId] = useState<string>(governanceDocs[0]?.id || 'gov-01');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Scale className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              الحقوق والحوكمة المدرسية وسياسات العمل
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              مواثيق حقوق الطلاب والمعلمين، مسؤوليات الإدارة، وضوابط مكافحة تضارب المصالح
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-750 font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          <span>طباعة اللوائح المعتمدة</span>
        </button>
      </div>

      {/* Mandatory Disclaimer Badge */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <b>تنويه الشفافية والمسؤولية القانونية:</b> جميع الوثائق المعروضة موسومة صراحة بأنها <b>«مسودة غير معتمدة نهائياً»</b> ومعدة كأطر عمل استرشادية لمنظومة روض الفرج الرقمية، ولا تمثل قرارات وزارية نافذة دون نشرها رسمياً في الوقائع المصرية أو بكتب دورية وزارية معتمدة.
        </div>
      </div>

      {/* Governance Documents Accordion */}
      <div className="space-y-4">
        {governanceDocs.map((doc) => {
          const isExpanded = expandedId === doc.id;
          return (
            <div
              key={doc.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? '' : doc.id)}
                className="p-4 bg-slate-850/80 hover:bg-slate-800/90 cursor-pointer flex items-center justify-between gap-3 border-b border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                      <span className="text-[10px] bg-rose-500/10 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold">
                        مسودة غير معتمدة
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {doc.version} • تاريخ السريان المقترح: {doc.effectiveDate} • جهة الإعداد: {doc.approvingBody}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 space-y-4 text-xs text-slate-300">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 leading-relaxed">
                    <span className="font-bold text-amber-400 block mb-1">الهدف العام من الوثيقة:</span>
                    {doc.summary}
                  </div>

                  <div className="space-y-3">
                    {doc.chapters.map((ch, idx) => (
                      <div key={idx} className="bg-slate-850/60 p-3.5 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          {ch.title}
                        </h4>
                        <ul className="space-y-1.5 list-disc list-inside text-slate-300 pr-2 leading-relaxed">
                          {ch.clauses.map((clause, cIdx) => (
                            <li key={cIdx}>{clause}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>النسخة الرقمية المشفرة: RDF-GOV-2026-V1</span>
                    <button
                      onClick={() => window.print()}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      طباعة نسخة PDF استرشادية
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
