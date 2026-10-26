import React, { useState } from 'react';
import { RodFaragProvider, useRodFarag } from './context/RodFaragContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';
import { GovernoratesModal } from './components/GovernoratesModal';
import { ToastContainer } from './components/ToastContainer';
import { AuthPortal } from './components/auth/AuthPortal';

// 18 Distinct Section Views
import { DashboardView } from './components/views/DashboardView';
import { SchoolsView } from './components/views/SchoolsView';
import { TeachersView } from './components/views/TeachersView';
import { StudentsView } from './components/views/StudentsView';
import { ParentsView } from './components/views/ParentsView';
import { AttendanceView } from './components/views/AttendanceView';
import { AssessmentsView } from './components/views/AssessmentsView';
import { CorrespondenceView } from './components/views/CorrespondenceView';
import { NotificationsView } from './components/views/NotificationsView';
import { DisciplineView } from './components/views/DisciplineView';
import { ComplaintsView } from './components/views/ComplaintsView';
import { GovernanceView } from './components/views/GovernanceView';
import { IntellectualPropertyView } from './components/views/IntellectualPropertyView';
import { FutureLeadersView } from './components/views/FutureLeadersView';
import { ReportsView } from './components/views/ReportsView';
import { UsersRolesView } from './components/views/UsersRolesView';
import { SecurityAuditView } from './components/views/SecurityAuditView';
import { SettingsView } from './components/views/SettingsView';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { QuickNewItemModal } from './components/QuickNewItemModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { UserGuideModal } from './components/UserGuideModal';
import { OnboardingTour } from './components/OnboardingTour';
import { FocusModeBar } from './components/FocusModeBar';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const MainLayout: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    isGovModalOpen,
    setIsGovModalOpen,
    addToast,
    isFocusMode,
    setIsFocusMode,
    readerFontSize,
    readerTheme,
    toggleFocusMode
  } = useRodFarag();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [quickNewModalOpen, setQuickNewModalOpen] = useState(false);
  const [userGuideOpen, setUserGuideOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  // Auto-prompt onboarding tour on first visit
  React.useEffect(() => {
    try {
      const hasCompletedTour = localStorage.getItem('rod_farag_tour_completed');
      if (!hasCompletedTour) {
        setTourOpen(true);
      }
    } catch {
      // Ignore localStorage exceptions in restricted environments
    }
  }, []);

  // Global Keyboard Shortcuts Listener (Ctrl+N, Shift+?, Alt+F, Esc, Alt+1..8, etc.)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      // Escape: Exit Focus Mode if active
      if (e.key === 'Escape' && isFocusMode) {
        e.preventDefault();
        setIsFocusMode(false);
        addToast('تم الخروج من وضع القراءة والعودة للعرض الكامل', 'info');
        return;
      }

      // Alt + F: Toggle Focus / Reader Mode
      if (e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFocusMode();
        return;
      }

      // Ctrl + N or Cmd + N: Quick New Item
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setQuickNewModalOpen(true);
        return;
      }

      // Shift + ? or Ctrl + /: Keyboard Shortcuts Cheatsheet
      if ((e.key === '?' && !isInput) || ((e.ctrlKey || e.metaKey) && e.key === '/')) {
        e.preventDefault();
        setShortcutsModalOpen(prev => !prev);
        return;
      }

      // Quick Section Navigation: Alt + 1 ... Alt + 8
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setActiveSection('dashboard');
            addToast('الانتقال السريع: لوحة التحكم (Alt + 1)', 'info');
            break;
          case '2':
            e.preventDefault();
            setActiveSection('schools');
            addToast('الانتقال السريع: دليل المدارس الـ16 (Alt + 2)', 'info');
            break;
          case '3':
            e.preventDefault();
            setActiveSection('teachers');
            addToast('الانتقال السريع: شؤون المعلمين (Alt + 3)', 'info');
            break;
          case '4':
            e.preventDefault();
            setActiveSection('students');
            addToast('الانتقال السريع: شؤون الطلاب (Alt + 4)', 'info');
            break;
          case '5':
            e.preventDefault();
            setActiveSection('attendance');
            addToast('الانتقال السريع: رصد الحضور (Alt + 5)', 'info');
            break;
          case '6':
            e.preventDefault();
            setActiveSection('reports');
            addToast('الانتقال السريع: التقارير الإحصائية (Alt + 6)', 'info');
            break;
          case '7':
            e.preventDefault();
            setActiveSection('assessments');
            addToast('الانتقال السريع: التقييمات والامتحانات (Alt + 7)', 'info');
            break;
          case '8':
            e.preventDefault();
            setActiveSection('correspondence');
            addToast('الانتقال السريع: المراسلات الرسمية (Alt + 8)', 'info');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveSection, addToast, isFocusMode, setIsFocusMode, toggleFocusMode]);

  const renderActiveView = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardView />;
      case 'schools': return <SchoolsView />;
      case 'teachers': return <TeachersView />;
      case 'students': return <StudentsView />;
      case 'parents': return <ParentsView />;
      case 'attendance': return <AttendanceView />;
      case 'assessments': return <AssessmentsView />;
      case 'correspondence': return <CorrespondenceView />;
      case 'notifications': return <NotificationsView />;
      case 'discipline': return <DisciplineView />;
      case 'complaints': return <ComplaintsView />;
      case 'governance': return <GovernanceView />;
      case 'intellectual_property': return <IntellectualPropertyView />;
      case 'future_leaders': return <FutureLeadersView />;
      case 'reports': return <ReportsView />;
      case 'users_roles': return <UsersRolesView />;
      case 'security_audit': return <SecurityAuditView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  const themeClasses = {
    slate: 'bg-slate-950 text-slate-100',
    sepia: 'bg-[#181410] text-[#efe6d8]',
    contrast: 'bg-black text-white'
  };

  const fontSizeClasses = {
    normal: 'text-sm leading-relaxed',
    large: 'text-base leading-relaxed',
    xlarge: 'text-lg leading-loose',
    huge: 'text-xl leading-loose'
  };

  return (
    <div className={`min-h-screen ${themeClasses[readerTheme]} flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-300`}>
      {/* Top Header - hidden in Focus/Reader Mode */}
      {!isFocusMode && (
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onOpenRoleModal={() => setRoleModalOpen(true)}
          onOpenShortcutsModal={() => setShortcutsModalOpen(true)}
          onOpenQuickNew={() => setQuickNewModalOpen(true)}
          onOpenUserGuide={() => setUserGuideOpen(true)}
          onOpenTour={() => setTourOpen(true)}
        />
      )}

      {/* Floating Reader Mode Controls when Focus Mode is Active */}
      {isFocusMode && (
        <FocusModeBar onExit={() => setIsFocusMode(false)} />
      )}

      {/* Main Body with Sidebar & Content */}
      <div className={`flex-1 flex w-full mx-auto ${isFocusMode ? 'max-w-6xl px-4 sm:px-8 py-2' : 'max-w-7xl'}`}>
        {/* Sidebar - hidden in Focus Mode */}
        {!isFocusMode && (
          <Sidebar
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
            onOpenUserGuide={() => setUserGuideOpen(true)}
            onOpenTour={() => setTourOpen(true)}
          />
        )}

        {/* Content Container - expanded to full width in Focus Mode */}
        <main className={`flex-1 overflow-x-hidden ${isFocusMode ? `w-full py-4 ${fontSizeClasses[readerFontSize]}` : 'p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-93px)]'}`}>
          <ErrorBoundary
            componentName="MainSectionView"
            fallbackTitle="تعذر تحميل الصفحة المحددة"
            fallbackMessage="حدث خطأ أثناء تحميل محتوى القسم. يمكنك التبديل لقسم آخر أو النقر على إعادة المحاولة."
          >
            {renderActiveView()}
          </ErrorBoundary>
        </main>
      </div>

      {/* Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
      />

      {/* 27 Governorates & Directorates Modal */}
      <GovernoratesModal
        isOpen={isGovModalOpen}
        onClose={() => setIsGovModalOpen(false)}
      />

      {/* Keyboard Shortcuts Cheatsheet Modal */}
      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
      />

      {/* Quick New Item Modal (Ctrl + N) */}
      <QuickNewItemModal
        isOpen={quickNewModalOpen}
        onClose={() => setQuickNewModalOpen(false)}
      />

      {/* Comprehensive Arabic User Guide Modal */}
      <UserGuideModal
        isOpen={userGuideOpen}
        onClose={() => setUserGuideOpen(false)}
        onStartTour={() => {
          setUserGuideOpen(false);
          setTourOpen(true);
        }}
      />

      {/* Interactive Onboarding Tour */}
      <OnboardingTour
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
      />

      {/* Real-time Offline Cache Status Indicator */}
      <OfflineIndicator />

      {/* Global Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { showAuthPortal, isGovModalOpen, setIsGovModalOpen } = useRodFarag();

  if (showAuthPortal) {
    return (
      <>
        <AuthPortal />
        <GovernoratesModal
          isOpen={isGovModalOpen}
          onClose={() => setIsGovModalOpen(false)}
        />
        <ToastContainer />
      </>
    );
  }

  return <MainLayout />;
};

export default function App() {
  return (
    <RodFaragProvider>
      <AppContent />
    </RodFaragProvider>
  );
}
