import React from 'react';
import { useOnlineStatus } from '../utils/serviceWorkerRegistration';
import { WifiOff, Database, CheckCircle2 } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 bg-slate-900 border border-amber-500/40 text-slate-100 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-3 duration-300">
      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
        <WifiOff className="w-4 h-4" />
      </div>

      <div className="text-right text-xs">
        <div className="font-bold text-amber-300 flex items-center gap-1.5">
          <span>وضع عدم الاتصال بالإنترنت (Offline Mode)</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </div>
        <p className="text-[11px] text-slate-300 mt-0.5">
          البيانات والمقاييس المحفوظة متاحة للعرض الكامل عبر الذاكرة المحلية وخدمة التخزين المؤقت.
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-1 text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-lg border border-slate-700">
        <Database className="w-3 h-3 text-emerald-400" />
        <span>تخزين محلي آمن</span>
      </div>
    </div>
  );
};
