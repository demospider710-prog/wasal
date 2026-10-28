import React, { useState, useMemo } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { AcademicEvent, AcademicEventType } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Award,
  Sparkles,
  Palmtree,
  BookOpen,
  Plus,
  Download,
  Filter,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  X,
  Search,
  CalendarDays,
  FileCheck2
} from 'lucide-react';

export const AcademicCalendar: React.FC = () => {
  const { academicEvents, addAcademicEvent, language, t, addToast, schools } = useRodFarag();
  const isEn = language === 'en';

  const [selectedType, setSelectedType] = useState<'all' | AcademicEventType>('all');
  const [selectedAudience, setSelectedAudience] = useState<'all' | AcademicEvent['targetAudience']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEventModal, setSelectedEventModal] = useState<AcademicEvent | null>(null);

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newType, setNewType] = useState<AcademicEventType>('exam');
  const [newAudience, setNewAudience] = useState<AcademicEvent['targetAudience']>('all');
  const [newDescription, setNewDescription] = useState('');
  const [newDescriptionEn, setNewDescriptionEn] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newIsImportant, setNewIsImportant] = useState(false);

  // Filtered & Sorted events
  const filteredEvents = useMemo(() => {
    return academicEvents
      .filter((evt) => {
        if (selectedType !== 'all' && evt.type !== selectedType) return false;
        if (selectedAudience !== 'all' && evt.targetAudience !== selectedAudience && evt.targetAudience !== 'all') {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = (evt.title || '').toLowerCase().includes(q) || (evt.titleEn || '').toLowerCase().includes(q);
          const matchDesc = (evt.description || '').toLowerCase().includes(q) || (evt.descriptionEn || '').toLowerCase().includes(q);
          const matchLoc = (evt.location || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc) return false;
        }
        return true;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [academicEvents, selectedType, selectedAudience, searchQuery]);

  // Current or Next upcoming event
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingEvent = useMemo(() => {
    const upcoming = academicEvents
      .filter((e) => e.date >= todayStr || (e.endDate && e.endDate >= todayStr))
      .sort((a, b) => a.date.localeCompare(b.date));
    return upcoming.length > 0 ? upcoming[0] : academicEvents[0];
  }, [academicEvents, todayStr]);

  // Helper for days countdown
  const getDaysDiff = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getEventBadge = (type: AcademicEventType) => {
    switch (type) {
      case 'exam':
        return {
          label: isEn ? 'Official Exam' : 'امتحان واختبار',
          color: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          icon: FileCheck2
        };
      case 'holiday':
        return {
          label: isEn ? 'Official Holiday' : 'عطلة رسمية',
          color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          icon: Palmtree
        };
      case 'milestone':
        return {
          label: isEn ? 'Term Milestone' : 'محطة دراسية',
          color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          icon: CalendarDays
        };
      case 'activity':
        return {
          label: isEn ? 'School Activity' : 'فعالية ومسابقات',
          color: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
          icon: Sparkles
        };
      default:
        return {
          label: isEn ? 'Event' : 'حدث',
          color: 'bg-slate-700 text-slate-300 border-slate-600',
          icon: CalendarIcon
        };
    }
  };

  const getAudienceLabel = (aud: AcademicEvent['targetAudience']) => {
    switch (aud) {
      case 'students': return isEn ? 'Students' : 'الطلاب';
      case 'teachers': return isEn ? 'Teachers' : 'المعلمون';
      case 'parents': return isEn ? 'Parents' : 'أولياء الأمور';
      case 'administrators': return isEn ? 'Administration' : 'الإدارة';
      default: return isEn ? 'All School Community' : 'الجميع';
    }
  };

  // Export events to standard .ics iCalendar file
  const handleExportICal = () => {
    try {
      let icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Rod El Farag Digital Administration//Academic Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:تقويم إدارة روض الفرج التعليمية 2026-2027'
      ];

      academicEvents.forEach((evt) => {
        const startDateFormatted = evt.date.replace(/-/g, '');
        const endDateFormatted = evt.endDate ? evt.endDate.replace(/-/g, '') : startDateFormatted;
        icsContent.push('BEGIN:VEVENT');
        icsContent.push(`UID:${evt.id}@rodelgard.edu.eg`);
        icsContent.push(`DTSTART;VALUE=DATE:${startDateFormatted}`);
        icsContent.push(`DTEND;VALUE=DATE:${endDateFormatted}`);
        icsContent.push(`SUMMARY:${evt.title.replace(/,/g, '\\,')}`);
        icsContent.push(`DESCRIPTION:${(evt.description || '').replace(/\n/g, ' ')}`);
        if (evt.location) {
          icsContent.push(`LOCATION:${evt.location.replace(/,/g, '\\,')}`);
        }
        icsContent.push('STATUS:CONFIRMED');
        icsContent.push('END:VEVENT');
      });

      icsContent.push('END:VCALENDAR');
      const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rod_el_farag_calendar_2026_2027.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast(
        isEn
          ? 'iCal file exported! You can open it in Google Calendar, Outlook, or Apple Calendar.'
          : 'تم تصدير ملف التقويم iCal بنجاح! يمكنك فتحه في Google Calendar أو Outlook.',
        'success'
      );
    } catch {
      addToast(isEn ? 'Export failed' : 'فشل التصدير', 'error');
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) {
      addToast(isEn ? 'Please provide at least a title and date' : 'يرجى كتابة عنوان الفعالية وتاريخها', 'error');
      return;
    }

    addAcademicEvent({
      title: newTitle.trim(),
      titleEn: newTitleEn.trim() || newTitle.trim(),
      description: newDescription.trim() || 'فعالية رسمية معتمدة بإدارة روض الفرج التعليمية.',
      descriptionEn: newDescriptionEn.trim() || newDescription.trim(),
      date: newDate,
      endDate: newEndDate || undefined,
      type: newType,
      targetAudience: newAudience,
      location: newLocation.trim() || undefined,
      isImportant: newIsImportant
    });

    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewTitleEn('');
    setNewDate('');
    setNewEndDate('');
    setNewDescription('');
    setNewDescriptionEn('');
    setNewLocation('');
    setNewIsImportant(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-5 text-right">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/30 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{t('cal_title')}</span>
              <span className="text-xs bg-slate-800 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-slate-700 font-bold">
                2026 / 2027
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t('cal_subtitle')}
            </p>
          </div>
        </div>

        {/* Action Buttons: Add Event & Export iCal */}
        <div className="flex items-center gap-2 flex-wrap self-end lg:self-auto">
          <button
            type="button"
            onClick={handleExportICal}
            title={t('cal_export_ical')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEn ? 'Export iCal' : 'تصدير التقويم'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('cal_add_event')}</span>
          </button>
        </div>
      </div>

      {/* Featured Upcoming Milestone Hero Callout */}
      {upcomingEvent && (
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-850 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] font-bold uppercase leading-none text-slate-400">
                {new Date(upcomingEvent.date).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', { month: 'short' })}
              </span>
              <span className="text-lg font-black text-amber-400 leading-tight">
                {new Date(upcomingEvent.date).getDate()}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-md">
                  {isEn ? 'Upcoming Highlight' : 'أبرز فعالية قادمة'}
                </span>
                <span className="text-xs font-mono text-slate-300 font-bold">
                  {upcomingEvent.date} {upcomingEvent.endDate ? `— ${upcomingEvent.endDate}` : ''}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                {isEn && upcomingEvent.titleEn ? upcomingEvent.titleEn : upcomingEvent.title}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 max-w-2xl">
                {isEn && upcomingEvent.descriptionEn ? upcomingEvent.descriptionEn : upcomingEvent.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            {(() => {
              const diff = getDaysDiff(upcomingEvent.date);
              return (
                <div className="text-center bg-slate-900/90 border border-amber-500/30 px-3 py-1.5 rounded-xl shadow-xs">
                  <div className="text-[10px] text-slate-400 font-medium">
                    {isEn ? 'Countdown' : 'العد التنازلي'}
                  </div>
                  <div className="text-sm font-black text-amber-400 font-mono">
                    {diff === 0
                      ? isEn ? 'Today' : 'اليوم'
                      : diff > 0
                      ? isEn ? `${diff} days left` : `باقي ${diff} يوم`
                      : isEn ? `${Math.abs(diff)} days ago` : `انقضى منذ ${Math.abs(diff)} يوم`}
                  </div>
                </div>
              );
            })()}

            <button
              type="button"
              onClick={() => setSelectedEventModal(upcomingEvent)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-amber-400 text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              {t('btn_details')}
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: t('cal_filter_all'), count: academicEvents.length },
            { id: 'exam', label: t('cal_filter_exams'), count: academicEvents.filter(e => e.type === 'exam').length },
            { id: 'holiday', label: t('cal_filter_holidays'), count: academicEvents.filter(e => e.type === 'holiday').length },
            { id: 'milestone', label: t('cal_filter_milestones'), count: academicEvents.filter(e => e.type === 'milestone').length },
            { id: 'activity', label: t('cal_filter_activities'), count: academicEvents.filter(e => e.type === 'activity').length }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedType(tab.id as 'all' | AcademicEventType)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                selectedType === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${selectedType === tab.id ? 'bg-black/20 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Audience Selector & Search */}
        <div className="flex items-center gap-2">
          {/* Audience Filter Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl py-1.5 pr-3 pl-7 focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">{isEn ? 'All Audiences' : 'كل الفئات المستهدفة'}</option>
              <option value="students">{isEn ? 'Students Only' : 'الطلاب فقط'}</option>
              <option value="teachers">{isEn ? 'Teachers Only' : 'المعلمون فقط'}</option>
              <option value="parents">{isEn ? 'Parents Only' : 'أولياء الأمور فقط'}</option>
              <option value="administrators">{isEn ? 'Administration' : 'الإدارات والمدراء'}</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[160px] sm:min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search events...' : 'بحث في الفعاليات...'}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-400 text-xs rounded-xl py-1.5 pr-8 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events Chronological Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
        {filteredEvents.map((event) => {
          const badge = getEventBadge(event.type);
          const BadgeIcon = badge.icon;
          const diffDays = getDaysDiff(event.date);
          const isPast = diffDays < 0;

          return (
            <div
              key={event.id}
              onClick={() => setSelectedEventModal(event)}
              className={`bg-slate-850/80 hover:bg-slate-800 border transition-all rounded-2xl p-4 flex flex-col justify-between cursor-pointer group shadow-xs ${
                event.isImportant ? 'border-amber-500/40 hover:border-amber-500/80' : 'border-slate-800 hover:border-slate-700'
              } ${isPast ? 'opacity-75' : ''}`}
            >
              <div>
                {/* Header Badge & Date */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${badge.color}`}>
                    <BadgeIcon className="w-3 h-3" />
                    <span>{badge.label}</span>
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{event.date}</span>
                  </span>
                </div>

                {/* Event Title */}
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mt-2.5 leading-snug">
                  {isEn && event.titleEn ? event.titleEn : event.title}
                </h4>

                {/* Event Description */}
                <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                  {isEn && event.descriptionEn ? event.descriptionEn : event.description}
                </p>
              </div>

              {/* Card Footer: Audience, Location & Days Count */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 gap-1.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="bg-slate-900 border border-slate-700/80 text-slate-300 px-1.5 py-0.2 rounded text-[10px] font-semibold truncate">
                    {getAudienceLabel(event.targetAudience)}
                  </span>

                  {event.location && (
                    <span className="flex items-center gap-1 text-[10px] text-slate-400 truncate">
                      <MapPin className="w-3 h-3 text-amber-400/80 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </span>
                  )}
                </div>

                <span className={`text-[10px] font-mono font-bold shrink-0 ${
                  diffDays === 0
                    ? 'text-emerald-400'
                    : diffDays > 0
                    ? 'text-amber-400'
                    : 'text-slate-500'
                }`}>
                  {diffDays === 0
                    ? isEn ? 'Today' : 'اليوم'
                    : diffDays > 0
                    ? isEn ? `in ${diffDays}d` : `خلال ${diffDays}ي`
                    : isEn ? `${Math.abs(diffDays)}d ago` : `مضت`}
                </span>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl">
            <CalendarIcon className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-semibold text-slate-300">{t('cal_empty')}</p>
            <p className="text-xs text-slate-500 mt-1">
              {isEn ? 'Try changing your filter category or search keyword' : 'جرب تغيير تصنيف التصفية أو كلمة البحث'}
            </p>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl text-right animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getEventBadge(selectedEventModal.type).color}`}>
                  {getEventBadge(selectedEventModal.type).label}
                </span>
                {selectedEventModal.isImportant && (
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded">
                    {t('cal_important')}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedEventModal(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <h3 className="text-base sm:text-lg font-black text-white">
                {isEn && selectedEventModal.titleEn ? selectedEventModal.titleEn : selectedEventModal.title}
              </h3>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">{isEn ? 'Date' : 'تاريخ البداية'}</span>
                  <span className="font-mono font-bold text-white">{selectedEventModal.date}</span>
                </div>
                {selectedEventModal.endDate && (
                  <div>
                    <span className="text-slate-400 block text-[11px]">{isEn ? 'End Date' : 'تاريخ النهاية'}</span>
                    <span className="font-mono font-bold text-white">{selectedEventModal.endDate}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block text-[11px]">{isEn ? 'Audience' : 'الفئة المستهدفة'}</span>
                  <span className="font-bold text-amber-300">{getAudienceLabel(selectedEventModal.targetAudience)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{isEn ? 'Location' : 'المقر / النطاق'}</span>
                  <span className="text-slate-200 font-medium">{selectedEventModal.location || (isEn ? 'Directorate-wide' : 'كافة المدارس')}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-300 block mb-1">
                  {isEn ? 'Event Details' : 'التفاصيل والتعليمات الإدارية:'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-850 p-3 rounded-xl border border-slate-800">
                  {isEn && selectedEventModal.descriptionEn ? selectedEventModal.descriptionEn : selectedEventModal.description}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEventModal(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {t('btn_close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl text-right animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>{t('cal_add_event')}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isEn ? 'Event Title (Arabic) *' : 'عنوان الفعالية بالعربية *'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: امتحانات شهر مارس التجريبية"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isEn ? 'Event Title (English)' : 'عنوان الفعالية بالإنجليزية (اختياري)'}
                </label>
                <input
                  type="text"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  placeholder="e.g. March Monthly Practice Exams"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none text-left dir-ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isEn ? 'Start Date *' : 'تاريخ البداية *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isEn ? 'End Date (Optional)' : 'تاريخ النهاية (اختياري)'}
                  </label>
                  <input
                    type="date"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isEn ? 'Category *' : 'نوع الفعالية *'}
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as AcademicEventType)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
                  >
                    <option value="exam">{t('cal_filter_exams')}</option>
                    <option value="holiday">{t('cal_filter_holidays')}</option>
                    <option value="milestone">{t('cal_filter_milestones')}</option>
                    <option value="activity">{t('cal_filter_activities')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isEn ? 'Audience *' : 'الفئة المستهدفة *'}
                  </label>
                  <select
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
                  >
                    <option value="all">{isEn ? 'All' : 'الجميع'}</option>
                    <option value="students">{isEn ? 'Students' : 'الطلاب'}</option>
                    <option value="teachers">{isEn ? 'Teachers' : 'المعلمون'}</option>
                    <option value="parents">{isEn ? 'Parents' : 'أولياء الأمور'}</option>
                    <option value="administrators">{isEn ? 'Administration' : 'الإدارة المدرسية'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isEn ? 'Location / Venue' : 'المقر أو مكان الفعالية'}
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="مثال: مسرح مدرسة قاسم أمين الإعدادية"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {isEn ? 'Description' : 'تفاصيل الفعالية'}
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="وصف مختصر للفعالية والتعليمات الخاصة بها..."
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-important"
                  checked={newIsImportant}
                  onChange={(e) => setNewIsImportant(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="chk-important" className="text-slate-300 font-medium cursor-pointer">
                  {isEn ? 'Mark as official high-importance event' : 'تمييز كفعالية رسمية بالغة الأهمية'}
                </label>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl font-bold transition-all cursor-pointer"
                >
                  {t('btn_cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold transition-all cursor-pointer shadow-sm"
                >
                  {t('btn_save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;
