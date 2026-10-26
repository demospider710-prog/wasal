import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canAccessSchool,
  canViewStudent,
  canPublishAssessment,
  validateDisciplineSanction,
  isCorrespondenceOverdue,
  createAuditLog
} from './rod-farag-logic';
import { UserProfile, Student, Assessment, DisciplineIncident, Correspondence } from '../types';

const directorateAdmin: UserProfile = {
  id: 'u-admin-1',
  name: 'أحمد محمود',
  email: 'admin@rodelgard.edu.eg',
  role: 'directorate_admin'
};

const schoolPrincipal: UserProfile = {
  id: 'u-prin-1',
  name: 'د. مجدي صادق',
  email: 'principal1@rodelgard.edu.eg',
  role: 'school_principal',
  schoolId: 'sch-01'
};

const parentUser: UserProfile = {
  id: 'u-parent-1',
  name: 'محمد عبد الله',
  email: 'parent1@gmail.com',
  role: 'parent',
  linkedStudentIds: ['stu-101']
};

const studentUser: UserProfile = {
  id: 'u-stu-1',
  name: 'كريم محمد عبد الله',
  email: 'karim@rodelgard.edu.eg',
  role: 'student',
  schoolId: 'sch-01',
  studentId: 'stu-101'
};

const studentRecord: Student = {
  id: 'stu-101',
  internalCode: 'RDF-STU-001',
  name: 'كريم محمد عبد الله',
  schoolId: 'sch-01',
  schoolName: 'مدرسة روض الفرج الثانوية بنين',
  grade: 'الصف الأول الثانوي',
  classroom: '1/2',
  parentId: 'u-parent-1',
  parentName: 'محمد عبد الله',
  parentPhone: '01012345678',
  attendanceRate: 97,
  generalAverage: 91,
  status: 'enrolled',
  birthDate: '2010-04-12',
  emergencyContact: '01012345678',
  achievementsCount: 2
};

const otherStudentRecord: Student = {
  ...studentRecord,
  id: 'stu-999',
  name: 'طالب آخر من مدرسة أخرى',
  schoolId: 'sch-02'
};

test('canAccessSchool: directorate admin has universal access', () => {
  assert.equal(canAccessSchool(directorateAdmin, 'sch-01'), true);
  assert.equal(canAccessSchool(directorateAdmin, 'sch-16'), true);
});

test('canAccessSchool: school principal is scoped to assigned school', () => {
  assert.equal(canAccessSchool(schoolPrincipal, 'sch-01'), true);
  assert.equal(canAccessSchool(schoolPrincipal, 'sch-02'), false);
});

test('canViewStudent: parent can only view their linked child', () => {
  assert.equal(canViewStudent(parentUser, studentRecord), true);
  assert.equal(canViewStudent(parentUser, otherStudentRecord), false);
});

test('canViewStudent: student can only view their own profile', () => {
  assert.equal(canViewStudent(studentUser, studentRecord), true);
  assert.equal(canViewStudent(studentUser, otherStudentRecord), false);
});

test('canPublishAssessment: blocks unapproved assessments from publication', () => {
  const unapproved: Assessment = {
    id: 'asm-1',
    title: 'اختبار شهر أكتوبر - لغة عربية',
    subject: 'اللغة العربية',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج',
    grade: 'الأول الثانوي',
    classroom: '1/2',
    date: '2026-10-20',
    maxScore: 30,
    status: 'under_review',
    studentScores: []
  };

  const publishResult = canPublishAssessment(schoolPrincipal, unapproved);
  assert.equal(publishResult.allowed, false);

  const approved: Assessment = {
    ...unapproved,
    status: 'approved',
    approvedBy: 'مدير المدرسة د. مجدي صادق'
  };
  const approvedPublishResult = canPublishAssessment(schoolPrincipal, approved);
  assert.equal(approvedPublishResult.allowed, true);
});

test('validateDisciplineSanction: prevents immediate penalty without due process inquiry', () => {
  const incident: DisciplineIncident = {
    id: 'inc-1',
    incidentNumber: 'RDF-INC-2026-004',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج',
    date: '2026-10-25',
    incidentType: 'behavioral',
    descriptionSummary: 'مشادة كلامية في فناء المدرسة',
    partiesInvolvedMasked: ['طالب أ.م (الصف الأول)', 'طالب ع.س (الصف الأول)'],
    evidenceDocuments: [],
    reviewingOfficer: 'الأخصائي الاجتماعي',
    hearingStatus: 'scheduled',
    status: 'new_report',
    isAppealable: true
  };

  const result = validateDisciplineSanction(incident, 'إنذار بالفصل 3 أيام', schoolPrincipal);
  assert.equal(result.valid, false);
});

test('isCorrespondenceOverdue: accurately detects past deadlines', () => {
  const overdueItem: Correspondence = {
    id: 'c-1',
    referenceNumber: 'RDF-OUT-2026-102',
    outwardNumber: '445/2026',
    date: '2026-10-01',
    subject: 'مطلوب إحصائية العجز والزيادة',
    content: 'يرجى موافاة الإدارة بالإحصاء في موعد أقصاه 10 أكتوبر',
    sender: 'إدارة التعليم العام بروض الفرج',
    recipients: ['جميع المدارس الـ16'],
    confidentiality: 'normal',
    deadlineDate: '2026-10-10',
    status: 'in_progress',
    attachments: [],
    auditTrail: []
  };

  assert.equal(isCorrespondenceOverdue(overdueItem, '2026-10-26'), true);
  assert.equal(isCorrespondenceOverdue(overdueItem, '2026-10-05'), false);
});

test('createAuditLog: generates compliant tamper-evident record', () => {
  const audit = createAuditLog(
    directorateAdmin,
    'اعتماد نتيجة تقييم شهر أكتوبر',
    'Assessment/asm-1',
    'تم اعتماد وتوثيق النتيجة رسمياً لمدرسة روض الفرج'
  );

  assert.ok(audit.id.startsWith('AUDIT-'));
  assert.equal(audit.actorName, 'أحمد محمود');
  assert.ok(audit.integrityHash.startsWith('RDF-AUDIT-'));
});
