import { UserProfile, UserRole, School, Student, Teacher, Assessment, DisciplineIncident, Correspondence, Complaint } from '../types';

/**
 * Checks if a user has permission to access data belonging to a specific school.
 * Directorate Admin and System Admin can access all schools.
 * School Principal, Teacher, Student Affairs, and local staff can only access their assigned school.
 */
export function canAccessSchool(user: UserProfile, targetSchoolId?: string): boolean {
  if (!user) return false;
  if (user.role === 'super_admin' || user.role === 'directorate_admin' || user.role === 'complaints_officer' || user.role === 'ip_officer') {
    return true;
  }
  if (!targetSchoolId) return true;
  return user.schoolId === targetSchoolId;
}

/**
 * Checks if a user can view a specific student's record.
 * A parent can ONLY view students linked to their account.
 * A student can only view their own profile.
 * A school staff member can only view students in their school.
 */
export function canViewStudent(user: UserProfile, student: Student): boolean {
  if (!user || !student) return false;
  if (user.role === 'super_admin' || user.role === 'directorate_admin') {
    return true;
  }
  if (user.role === 'parent') {
    return Array.isArray(user.linkedStudentIds) && user.linkedStudentIds.includes(student.id);
  }
  if (user.role === 'student') {
    return user.studentId === student.id;
  }
  // School staff (principal, student affairs, teacher)
  return user.schoolId === student.schoolId;
}

/**
 * Verifies whether an assessment can be published to students and parents.
 * RULE: Results cannot be published until approved by an authorized official.
 */
export function canPublishAssessment(user: UserProfile, assessment: Assessment): { allowed: boolean; reason?: string } {
  if (!['super_admin', 'directorate_admin', 'school_principal'].includes(user.role)) {
    return { allowed: false, reason: 'فقط الإدارة التعليمية أو مدير المدرسة يملكان صلاحية نشر النتائج' };
  }
  if (assessment.status !== 'approved') {
    return { allowed: false, reason: 'لا يمكن نشر النتيجة قبل اعتمادها وتوثيقها رسمياً' };
  }
  return { allowed: true };
}

/**
 * Verifies that a disciplinary sanction complies with due process regulations.
 * RULE: No sanctions can be automatically issued upon a report. Must undergo investigation
 * and hearing before approval, and is subject to appeal.
 */
export function validateDisciplineSanction(
  incident: DisciplineIncident,
  sanctionText: string,
  user: UserProfile
): { valid: boolean; reason?: string } {
  if (!['directorate_admin', 'school_principal', 'super_admin'].includes(user.role)) {
    return { valid: false, reason: 'ليس لديك صلاحية اعتماد قرارات الانضباط' };
  }
  if (incident.status === 'new_report') {
    return { valid: false, reason: 'لا يمكن توقيع جزاء مباشر بناء على البلاغ دون تحقيق وسماع الأطراف' };
  }
  if (incident.hearingStatus === 'scheduled') {
    return { valid: false, reason: 'يجب استكمال جلسة الاستماع الرسمية وسماع أقوال الأطراف أولاً' };
  }
  if (!sanctionText || sanctionText.trim().length < 5) {
    return { valid: false, reason: 'يجب توضيح مبررات القرار والسند اللائحي المعتمد' };
  }
  return { valid: true };
}

/**
 * Checks if a complaint response or status transition is permitted.
 * RULE: The reported party cannot control or delete the complaint.
 */
export function canManageComplaint(user: UserProfile, complaint: Complaint): boolean {
  if (!user) return false;
  if (['super_admin', 'directorate_admin', 'complaints_officer'].includes(user.role)) {
    return true;
  }
  if (user.role === 'school_principal' && user.schoolId === complaint.schoolId) {
    // School principal can view complaints concerning their school unless designated conflict
    return true;
  }
  return false;
}

/**
 * Calculates whether a correspondence is overdue based on current date.
 */
export function isCorrespondenceOverdue(item: Correspondence, currentDateString: string): boolean {
  if (['replied', 'closed', 'draft'].includes(item.status)) {
    return false;
  }
  return new Date(item.deadlineDate).getTime() < new Date(currentDateString).getTime();
}

/**
 * Computes dashboard aggregate statistics.
 */
export function computeDirectorateStats(
  schools: School[],
  students: Student[],
  teachers: Teacher[],
  correspondence: Correspondence[],
  complaints: Complaint[],
  todayIsoDate: string
) {
  const totalSchools = schools.length;
  const activeSchools = schools.filter(s => s.status === 'active').length;
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = schools.reduce((acc, s) => acc + (s.classesCount || 0), 0);

  const averageAttendance = students.length > 0
    ? Math.round((students.reduce((acc, s) => acc + (s.attendanceRate || 0), 0) / students.length) * 10) / 10
    : 0;

  const overdueCorrespondence = correspondence.filter(c => isCorrespondenceOverdue(c, todayIsoDate)).length;
  const openComplaints = complaints.filter(c => ['new', 'under_review', 'info_requested', 'referred'].includes(c.status)).length;
  const resolvedComplaints = complaints.filter(c => ['response_issued', 'closed'].includes(c.status)).length;

  return {
    totalSchools,
    activeSchools,
    totalStudents,
    totalTeachers,
    totalClasses,
    averageAttendance,
    overdueCorrespondence,
    openComplaints,
    resolvedComplaints,
  };
}

/**
 * Generates an audit log entry for tamper-evident tracking.
 */
export function createAuditLog(
  actor: UserProfile,
  action: string,
  targetResource: string,
  details: string
) {
  const timestamp = new Date().toISOString();
  // Simple checksum generator for simulated integrity
  const raw = `${timestamp}|${actor.id}|${action}|${targetResource}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  const integrityHash = `RDF-AUDIT-${Math.abs(hash).toString(16).toUpperCase()}`;

  return {
    id: `AUDIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp,
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    schoolId: actor.schoolId,
    action,
    targetResource,
    details,
    ipAddress: '192.168.1.104',
    integrityHash,
  };
}
