import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import {
  ShieldAlert,
  Search,
  Lock,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  FileCode,
  Download
} from 'lucide-react';

export const SecurityAuditView: React.FC = () => {
  const { auditLogs, exportDatabaseJSON } = useRodFarag();
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    return (
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actorName.toLowerCase().includes(search.toLowerCase()) ||
      log.targetResource.toLowerCase().includes(search.toLowerCase()) ||
      log.integrityHash.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              الأمان وسجل تدقيق العمليات الإدارية (Audit Trail)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              سجل رقمي غير قابل للتعديل يوثق كافة إجراءات الاعتماد، التعديل، وتداول البيانات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>طباعة السجل</span>
          </button>
          <button
            onClick={exportDatabaseJSON}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>تصدير السجل الأمني</span>
          </button>
        </div>
      </div>

      {/* Security Checksum Notice */}
      <div className="p-3.5 bg-slate-900 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <b>سلامة البيانات والنزاهة الرقمية:</b> كل عملية إدارية يتم تسجيلها فوراً مع توليد بصمة رقمية فريدة (Integrity Hash)، عنوان IP الافتراضي، وتوقيت دقيق بالثواني لمنع التلاعب بالسجلات وتتبع أي نشاط حساس.
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
            placeholder="بحث بالعملية، القائم بالإجراء، أو البصمة..."
            className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-slate-400 font-mono">
          إجمالي القيود الموثقة: {auditLogs.length} عملية
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">التوقيت والتاريخ</th>
                <th className="p-3.5">القائم بالعملية</th>
                <th className="p-3.5">الدور والصلاحية</th>
                <th className="p-3.5">نوع الإجراء</th>
                <th className="p-3.5">المورد والهدف</th>
                <th className="p-3.5">تفاصيل التعديل</th>
                <th className="p-3.5">عنوان IP</th>
                <th className="p-3.5">بصمة التحقق (Hash)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850/60 font-mono text-[11px]">
                  <td className="p-3.5 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3.5 font-bold text-white font-sans">{log.actorName}</td>
                  <td className="p-3.5 font-sans">
                    <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[10px]">
                      {log.actorRole}
                    </span>
                  </td>
                  <td className="p-3.5 font-sans font-bold text-slate-200">{log.action}</td>
                  <td className="p-3.5 text-slate-400">{log.targetResource}</td>
                  <td className="p-3.5 font-sans text-slate-300 max-w-xs">{log.details}</td>
                  <td className="p-3.5 text-slate-400">{log.ipAddress}</td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {log.integrityHash}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
