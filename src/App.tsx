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

const MainLayout: React.FC = () => {
  const { activeSection, isGovModalOpen, setIsGovModalOpen } = useRodFarag();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onOpenRoleModal={() => setRoleModalOpen(true)}
      />

      {/* Main Body with Sidebar & Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-h-[calc(100vh-93px)]">
          {renderActiveView()}
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
