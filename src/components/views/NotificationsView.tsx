import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { NotificationItem } from '../../types';
import {
  BellRing,
  Award,
  Calendar,
  AlertCircle,
  Plus,
  Send,
  Users,
  CheckCircle2,
  Clock,
  Info,
  X
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, schools, currentUser, broadcastNotification } = useRodFarag();
  const [filterType, setFilterType] = useState<string>('all');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'congratulation' as NotificationItem['type'],
    recipientScope: 'all' as NotificationItem['recipientScope'],
    targetSchoolId: 'sch-01'
  });

  const canBroadcast = ['super_admin', 'directorate_admin', 'school_principal'].includes(currentUser.role);

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    broadcastNotification({
      title: formData.title,
      message: formData.message,
      type: formData.type,
      recipientScope: formData.recipientScope,
      targetSchoolId: formData.recipientScope === 'specific_school' ? formData.targetSchoolId : undefined,
      deliveryStatus: 'delivered',
      readCount: 0,
      externalDispatchNotice: 'جاهز للربط عبر مزود SMS المعتمد عند توفيره'
    });
    setIsBroadcastModalOpen(false);
  };

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'congratulation':
        return <Award className="w-4 h-4 text-amber-400" />;
      case 'exam':
        return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'attendance':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-300" />;
    }
  };

  const getScopeBadge = (scope: NotificationItem['recipientScope']) => {
    switch (scope) {
      case 'all': return 'جميع المدارس وأولياء الأمور';
      case 'parents': return 'أولياء الأمور فقط';
      case 'teachers': return 'المعلمون فقط';
      case 'students': return 'الطلاب فقط';
      default: return 'مدرسة محددة';
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BellRing className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              مركز الإشعارات والتهنئات والتنبيهات
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              إذاعة إعلانات الامتحانات، تهنئات التفوق والتميز، وتنبيهات الحضور والانضباط
            </p>
          </div>
        </div>

        {canBroadcast && (
          <button
            onClick={() => {
              setFormData({
                title: '',
                message: '',
                type: 'congratulation',
                recipientScope: 'all',
                targetSchoolId: 'sch-01'
              });
              setIsBroadcastModalOpen(true);
            }}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>بث إشعار أو تهنئة جديدة</span>
          </button>
        )}
      </div>

      {/* Integration Notice */}
      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          تنويه النزاهة التقنية: الإشعارات تعمل فورياً داخل واجهة التطبيق، مع إمكانية الربط لاحقاً ببوابة الرسائل النصية المعتمدة (SMS Gateway) فور التعاقد دون ادعاء إرسال رسائل هاتفية فعلية قبل الربط.
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'congratulation', label: 'التهنئات والتكريم' },
          { id: 'exam', label: 'مواعيد الامتحانات' },
          { id: 'attendance', label: 'إشعارات الحضور' },
          { id: 'administrative', label: 'تنبيهات إدارية' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all ${
              filterType === tab.id
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-2xl border transition-all ${
              notif.type === 'congratulation'
                ? 'bg-gradient-to-l from-amber-950/20 to-slate-900 border-amber-500/30'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-850 border border-slate-750 shrink-0">
                  {getTypeIcon(notif.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{notif.title}</h3>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                      {getScopeBadge(notif.recipientScope)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{notif.message}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-2">
                    <span>المرسل: <b className="text-slate-200">{notif.sentBy}</b></span>
                    <span>التوقيت: <b className="text-slate-200 font-mono">{notif.createdAt}</b></span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      تم التسليم بنجاح
                    </span>
                    {notif.readCount !== undefined && (
                      <span className="font-mono">تمت المشاهدة: {notif.readCount.toLocaleString('ar-EG')} مرة</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <BellRing className="w-4 h-4 text-amber-400" />
                بث إشعار أو تهنئة جديدة
              </h3>
              <button onClick={() => setIsBroadcastModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">نوع الإشعار</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as NotificationItem['type'] })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="congratulation">تهنئة وتكريم تفوق</option>
                  <option value="exam">إعلان مواعيد امتحانات</option>
                  <option value="attendance">تنبيه حضور وغياب</option>
                  <option value="administrative">إعلان إداري عام</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الفئة المستهدفة بالاستقبال</label>
                <select
                  value={formData.recipientScope}
                  onChange={(e) => setFormData({ ...formData, recipientScope: e.target.value as NotificationItem['recipientScope'] })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="all">جميع المدارس وأولياء الأمور والمعلمين</option>
                  <option value="parents">أولياء الأمور فقط</option>
                  <option value="teachers">المعلمون وهيئة التدريس فقط</option>
                  <option value="students">الطلاب فقط</option>
                  <option value="specific_school">مدرسة بعينها</option>
                </select>
              </div>

              {formData.recipientScope === 'specific_school' && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">المدرسة المستهدفة</label>
                  <select
                    value={formData.targetSchoolId}
                    onChange={(e) => setFormData({ ...formData, targetSchoolId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان الإشعار</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تهنئة بمناسبة حصول مدرسة روض الفرج على المركز الأول"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">نص الرسالة أو التهنئة</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب تفاصيل التهنئة أو التنبيه..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  بث الإشعار
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
