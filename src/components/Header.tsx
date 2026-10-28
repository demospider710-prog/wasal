import React, { useState } from 'react';
import { useRodFarag } from '../context/RodFaragContext';
import {
  Search,
  Bell,
  Printer,
  UserCheck,
  Building2,
  Menu,
  X,
  ChevronDown,
  Info,
  MapPin,
  Compass,
  LogOut,
  Keyboard,
  Plus,
  BookOpen,
  Sparkles,
  Maximize2,
  Volume2,
  BellRing,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { UserRole } from '../types';
import { GlobalSearchBar } from './GlobalSearchBar';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onOpenRoleModal: () => void;
  onOpenShortcutsModal?: () => void;
  onOpenQuickNew?: () => void;
  onOpenUserGuide?: () => void;
  onOpenTour?: () => void;
}

/**
 * Reusable compact icon button with sleek floating hover tooltip
 */
interface CompactIconButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel?: string;
  shortcut?: string;
  onClick?: () => void;
  badge?: React.ReactNode;
  variant?: 'default' | 'amber' | 'danger' | 'active';
  ariaLabel: string;
}

const CompactIconButton: React.FC<CompactIconButtonProps> = ({
  icon: Icon,
  label,
  sublabel,
  shortcut,
  onClick,
  badge,
  variant = 'default',
  ariaLabel
}) => {
  const variantStyles = {
    default:
      'bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700/80 hover:border-slate-600',
    amber:
      'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 hover:text-amber-300 border-amber-500/30 hover:border-amber-500/50',
    active:
      'bg-amber-500 text-slate-950 font-bold border-amber-400 hover:bg-amber-400',
    danger:
      'bg-slate-800/90 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border-slate-700/80 hover:border-rose-500/40'
  };

  return (
    <div className="relative group/btn flex items-center">
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center active:scale-95 shadow-xs ${variantStyles[variant]}`}
      >
        <Icon className="w-4 h-4" />
        {badge}
      </button>

      {/* Floating Hover Tooltip: Appears below the icon on hover */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover/btn:flex flex-col items-center pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-2 h-2 bg-slate-950 border-t border-l border-slate-700 rotate-45 -mb-1 z-10"></div>
        <div className="bg-slate-950 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700 shadow-2xl whitespace-nowrap flex items-center gap-1.5 text-right">
          <span>{label}</span>
          {sublabel && (
            <span className="text-[10px] text-slate-400 font-normal">({sublabel})</span>
          )}
          {shortcut && (
            <kbd className="text-[9px] font-mono bg-slate-800 border border-slate-600 px-1.5 py-0.2 rounded text-amber-300 font-bold">
              {shortcut}
            </kbd>
          )}
        </div>
      </div>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onOpenRoleModal,
  onOpenShortcutsModal,
  onOpenQuickNew,
  onOpenUserGuide,
  onOpenTour
}) => {
  const {
    currentUser,
    schools,
    selectedSchoolFilter,
    setSelectedSchoolFilter,
    notifications,
    setActiveSection,
    activeGovernorate,
    activeDirectorate,
    setIsGovModalOpen,
    logoutUser,
    toggleFocusMode,
    desktopNotificationsEnabled,
    desktopPermissionStatus,
    toggleDesktopNotifications,
    testDesktopNotification,
    isDarkMode,
    toggleDarkMode,
    language,
    toggleLanguage,
    t
  } = useRodFarag();

  const isEn = language === 'en';

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const getRoleArabicTitle = (role: UserRole) => {
    switch (role) {
      case 'directorate_admin': return 'مسؤول الإدارة التعليمية';
      case 'school_principal': return 'مدير مدرسة';
      case 'student_affairs': return 'مسؤول شؤون الطلاب';
      case 'teacher': return 'المدرس';
      case 'student': return 'الطالب';
      case 'parent': return 'ولي الأمر';
      case 'complaints_officer': return 'مسؤول الشكاوى';
      case 'ip_officer': return 'مسؤول الملكية الفكرية';
      case 'super_admin': return 'مسؤول النظام التقني';
      default: return 'مستخدم المنظومة';
    }
  };

  const getRoleDisplayTitle = (role: UserRole) => {
    if (isEn) {
      return t(`role_${role}`, getRoleArabicTitle(role));
    }
    return getRoleArabicTitle(role);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-md print:hidden transition-colors">
      {/* Streamlined Governmental Strip */}
      <div className="bg-slate-950 px-3 sm:px-4 py-1 text-[11px] border-b border-slate-800/80 flex flex-wrap items-center justify-between text-slate-300 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-amber-400">{t('republic_ministry')}</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <button
            onClick={() => setIsGovModalOpen(true)}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700/80 hover:border-amber-500/50 px-2 py-0.5 rounded-md transition-all font-semibold group cursor-pointer text-[11px]"
            title={t('gov_modal_title')}
          >
            <MapPin className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold">{activeGovernorate.name}</span>
            <span className="text-slate-400">—</span>
            <span className="text-amber-300">{activeDirectorate?.name || 'إدارة تعليمية'}</span>
            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded font-bold mr-1">
              {t('change_gov')}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px]">
          <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.2 rounded flex items-center gap-1 font-medium">
            <Info className="w-3 h-3 text-amber-400" />
            {t('accredited_env')}
          </span>
          <span className="hidden md:inline text-slate-400 font-sans">2026 / 2027</span>
        </div>
      </div>

      {/* Main Bar: Compact, Streamlined & Icon-Focused */}
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left Side: Mobile Menu Button & App Identity */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="تبديل القائمة الجانبية"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveSection('dashboard')}
            title={t('app_full_title')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-md border border-amber-300/30 shrink-0 group-hover:scale-105 transition-transform">
              <span className="font-black text-slate-950 text-xs tracking-tighter">RDF</span>
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1 leading-tight group-hover:text-amber-300 transition-colors">
                {t('app_title')}
              </h1>
              <p className="text-[10px] text-amber-400/90 font-medium hidden sm:block leading-none">
                {t('app_sub_title')}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar & School Selector Dropdown */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center gap-2 mx-2">
          {/* School Selector Dropdown */}
          <div className="relative min-w-[170px] max-w-[210px] shrink-0">
            <Building2 className="w-3.5 h-3.5 text-amber-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedSchoolFilter}
              onChange={(e) => setSelectedSchoolFilter(e.target.value)}
              disabled={Boolean(currentUser.schoolId)}
              className="w-full bg-slate-800/95 border border-slate-700 text-slate-200 text-xs rounded-xl py-1.5 pr-8 pl-6 focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed truncate shadow-inner"
              title="نطاق المدرسة المحددة"
            >
              <option value="all">{t('all_schools_central')}</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 min-w-[220px]">
            <GlobalSearchBar className="w-full" />
          </div>
        </div>

        {/* Right Side: Compact Icon-Only Actions with Tooltips */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white md:hidden border border-slate-700"
            aria-label={t('btn_search')}
            title={t('btn_search')}
          >
            <Search className="w-4 h-4 text-amber-400" />
          </button>

          {/* Quick New Item (Ctrl+N) */}
          {onOpenQuickNew && (
            <CompactIconButton
              icon={Plus}
              label={t('quick_new')}
              sublabel={t('quick_new_desc')}
              shortcut="⌘N"
              variant="amber"
              onClick={onOpenQuickNew}
              ariaLabel={t('quick_new')}
            />
          )}

          {/* Dark Mode Toggle */}
          <CompactIconButton
            icon={isDarkMode ? Sun : Moon}
            label={isDarkMode ? t('dark_mode_on') : t('dark_mode_off')}
            sublabel={t('theme_sublabel')}
            onClick={toggleDarkMode}
            ariaLabel="Dark mode toggle"
            variant={isDarkMode ? 'default' : 'amber'}
          />

          {/* Localization Language Switcher (AR / EN) */}
          <CompactIconButton
            icon={Languages}
            label={t('lang_toggle')}
            sublabel={t('lang_sublabel')}
            shortcut={isEn ? 'AR' : 'EN'}
            onClick={toggleLanguage}
            ariaLabel="Language switcher"
            variant={isEn ? 'amber' : 'default'}
          />

          {/* Interactive Onboarding Tour */}
          {onOpenTour && (
            <CompactIconButton
              icon={Sparkles}
              label="الجولة التعريفية التفاعلية"
              sublabel="استعراض معالم المنظومة خطوة بخطوة"
              onClick={onOpenTour}
              ariaLabel="بدء الجولة التعريفية"
              variant="default"
            />
          )}

          {/* Comprehensive User Guide */}
          {onOpenUserGuide && (
            <CompactIconButton
              icon={BookOpen}
              label="دليل المستخدم ومراجع التشغيل"
              sublabel="الكتيب الإرشادي الشامل"
              onClick={onOpenUserGuide}
              ariaLabel="فتح دليل المستخدم"
            />
          )}

          {/* Keyboard Shortcuts Modal */}
          {onOpenShortcutsModal && (
            <CompactIconButton
              icon={Keyboard}
              label="دليل اختصارات لوحة المفاتيح"
              shortcut="⌘/"
              onClick={onOpenShortcutsModal}
              ariaLabel="دليل اختصارات لوحة المفاتيح"
            />
          )}

          {/* 27 Governorates Quick Selector */}
          <CompactIconButton
            icon={Compass}
            label="دليل الـ27 محافظة المصرية"
            sublabel="استعراض الإدارات التعليمية والمدارس"
            onClick={() => setIsGovModalOpen(true)}
            ariaLabel="دليل المحافظات"
          />

          {/* Reader / Focus Mode (Alt+F) */}
          <CompactIconButton
            icon={Maximize2}
            label="وضع القراءة والتركيز"
            sublabel="إخفاء القوائم وتوسيع المستندات"
            shortcut="Alt+F"
            onClick={toggleFocusMode}
            ariaLabel="وضع القراءة والتركيز"
          />

          {/* Print button */}
          <CompactIconButton
            icon={Printer}
            label="طباعة الصفحة / التقرير"
            sublabel="تصدير طباعي معتمد"
            onClick={handlePrint}
            ariaLabel="طباعة"
          />

          {/* Notifications Dropdown */}
          <div className="relative">
            <div className="relative group/btn flex items-center">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer active:scale-95 shadow-xs"
                aria-label="الإشعارات والتنبيهات"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover/btn:flex flex-col items-center pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="w-2 h-2 bg-slate-950 border-t border-l border-slate-700 rotate-45 -mb-1 z-10"></div>
                <div className="bg-slate-950 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700 shadow-2xl whitespace-nowrap flex items-center gap-1.5 text-right">
                  <span>مركز الإشعارات والتنبيهات</span>
                  <span className="text-[10px] text-amber-300 font-mono">({notifications.length})</span>
                </div>
              </div>
            </div>

            {notifDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 sm:w-88 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    مركز الإشعارات والتهنئات
                  </h3>
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(false);
                      setActiveSection('notifications');
                    }}
                    className="text-[11px] text-amber-400 hover:underline font-semibold"
                  >
                    عرض الكل ({notifications.length})
                  </button>
                </div>

                {/* Desktop Notifications Integration Panel */}
                <div className="p-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
                      <BellRing className="w-3.5 h-3.5 text-amber-400" />
                      <span>إشعارات سطح المكتب (Desktop)</span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold border ${
                        desktopPermissionStatus === 'granted'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : desktopPermissionStatus === 'denied'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {desktopPermissionStatus === 'granted'
                        ? 'مفعلة'
                        : desktopPermissionStatus === 'denied'
                        ? 'محظورة'
                        : 'غير مفعلة'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleDesktopNotifications}
                      className="flex-1 py-1 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-bold text-[11px] transition-colors cursor-pointer text-center"
                    >
                      {desktopPermissionStatus === 'granted'
                        ? desktopNotificationsEnabled
                          ? 'تعطيل التنبيهات'
                          : 'تشغيل التنبيهات'
                        : 'تفعيل إشعارات المتصفح'}
                    </button>
                    <button
                      onClick={testDesktopNotification}
                      title="تجربة إرسال إشعار فوري ونغمة صوتية لسطح المكتب"
                      className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3 text-amber-400" />
                      <span>تجربة</span>
                    </button>
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-slate-800">
                  {notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotifDropdownOpen(false);
                        setActiveSection('notifications');
                      }}
                      className="p-3 hover:bg-slate-800/60 transition-colors cursor-pointer text-right"
                    >
                      <div className="text-xs font-semibold text-slate-200 line-clamp-1">{n.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{n.message}</div>
                      <div className="text-[10px] text-amber-400/80 mt-1">{n.createdAt} • {n.sentBy}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher Badge */}
          <div className="relative group/role flex items-center">
            <button
              onClick={onOpenRoleModal}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-slate-800 to-slate-850 hover:from-slate-750 hover:to-slate-750 border border-amber-500/30 rounded-xl px-2 py-1 sm:px-2.5 sm:py-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="تبديل الدور والصلاحيات"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white line-clamp-1 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-amber-400 font-medium leading-none">
                  {getRoleDisplayTitle(currentUser.role)}
                </div>
              </div>
            </button>

            {/* Tooltip for Role */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover/role:flex flex-col items-center pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-2 h-2 bg-slate-950 border-t border-l border-slate-700 rotate-45 -mb-1 z-10"></div>
              <div className="bg-slate-950 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700 shadow-2xl whitespace-nowrap text-right">
                <span>{t('switch_role')}: </span>
                <span className="text-amber-300 font-bold">{getRoleDisplayTitle(currentUser.role)}</span>
              </div>
            </div>
          </div>

          {/* Logout / Switch to Auth Portal */}
          <CompactIconButton
            icon={LogOut}
            label={t('logout_btn')}
            sublabel={isEn ? 'Secure Sign Out' : 'الخروج الآمن'}
            onClick={logoutUser}
            ariaLabel={t('logout_btn')}
            variant="danger"
          />
        </div>
      </div>

      {/* Mobile Search Modal Overlay */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex flex-col md:hidden animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" />
              البحث الشامل في المنظومة
            </span>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4">
            <GlobalSearchBar
              isMobileModal={true}
              onCloseMobileModal={() => setMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
};
