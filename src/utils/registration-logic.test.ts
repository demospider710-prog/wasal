import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEgyptianPhone,
  validateEgyptianNationalId,
  validateStaffCode,
  validateStudentCode,
  validateRegistrationPayload,
  createSchoolAdditionRequest,
  checkAccountStatus
} from './registration-logic';

test('validateEgyptianPhone: validates valid and invalid Egyptian phone numbers', () => {
  // Valid Vodafone, Orange, Etisalat, WE
  assert.equal(validateEgyptianPhone('01012345678').valid, true);
  assert.equal(validateEgyptianPhone('01198765432').valid, true);
  assert.equal(validateEgyptianPhone('01234567890').valid, true);
  assert.equal(validateEgyptianPhone('01555554444').valid, true);

  // Invalid: wrong length, wrong prefix, letters
  assert.equal(validateEgyptianPhone('01312345678').valid, false);
  assert.equal(validateEgyptianPhone('0101234567').valid, false); // 10 digits
  assert.equal(validateEgyptianPhone('010123456789').valid, false); // 12 digits
  assert.equal(validateEgyptianPhone('').valid, false);
});

test('validateEgyptianNationalId: checks 14 digits, extracts birthdate and gender', () => {
  // 30104120101234 -> born 2001-04-12, male (digit 12 is 3 -> odd -> male)
  const result1 = validateEgyptianNationalId('30104120101234');
  assert.equal(result1.valid, true);
  assert.equal(result1.birthDate, '2001-04-12');
  assert.equal(result1.gender, 'ذكر');

  // 29809150101242 -> born 1998-09-15, female (digit 12 is 4 -> even -> female)
  const result2 = validateEgyptianNationalId('29809150101242');
  assert.equal(result2.valid, true);
  assert.equal(result2.birthDate, '1998-09-15');
  assert.equal(result2.gender, 'أنثى');

  // Invalid length or century
  assert.equal(validateEgyptianNationalId('19809150101242').valid, false); // century 1 invalid
  assert.equal(validateEgyptianNationalId('12345').valid, false);
});

test('validateStaffCode and validateStudentCode: checks boundaries', () => {
  assert.equal(validateStaffCode('T-10294').valid, true);
  assert.equal(validateStaffCode('').valid, false);

  assert.equal(validateStudentCode('987654321').valid, true);
  assert.equal(validateStudentCode('12').valid, false);
});

test('validateRegistrationPayload: rejects missing mandatory fields for teacher', () => {
  const invalidTeacherPayload: any = {
    category: 'teacher_staff',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    schoolId: 'sch-01',
    fullName: 'أحمد', // Not 3 words
    mobile: '01012345678',
    username: 'ahmed',
    // Missing staffCode, jobTitle, specialization
  };

  const validation = validateRegistrationPayload(invalidTeacherPayload);
  assert.equal(validation.valid, false);
  assert.ok(validation.errors.some(e => e.includes('ثلاثياً أو رباعياً')));
  assert.ok(validation.errors.some(e => e.includes('الكود الوظيفي')));
});

test('createSchoolAdditionRequest: creates compliant audit request with tracking code', () => {
  const req = createSchoolAdditionRequest({
    schoolName: 'مدرسة النهضة الحديثة التجريبية',
    governorateId: 'cairo',
    governorateName: 'القاهرة',
    directorateId: 'cairo_shubra',
    directorateName: 'إدارة شبرا التعليمية',
    stage: 'secondary',
    stageNameAr: 'المرحلة الثانوية',
    educationType: 'تجريبي لغات رسمية',
    address: 'شارع الترعة البولاقية، شبرا',
    requesterName: 'محمد فهمي حسنين',
    requesterPhone: '01099887766',
    requesterRole: 'مدير مدرسة تحت التأسيس'
  });

  assert.ok(req.trackingNumber.startsWith('RDF-REQ-'));
  assert.equal(req.status, 'pending_audit');
  assert.equal(req.schoolName, 'مدرسة النهضة الحديثة التجريبية');
});

test('checkAccountStatus: accurately identifies registered teacher and reports accreditation', () => {
  const sampleTeachers = [
    {
      internalCode: 'T-1001',
      name: 'أحمد فؤاد إبراهيم',
      schoolName: 'مدرسة روض الفرج الثانوية بنين',
      subject: 'اللغة العربية',
      phone: '01012345678',
      hireDate: '2020-09-01'
    }
  ];

  const result = checkAccountStatus([], sampleTeachers, [], 'T-1001');
  assert.equal(result.found, true);
  assert.equal(result.userName, 'أحمد فؤاد إبراهيم');
  assert.equal(result.status, 'active_accredited');
  assert.ok(result.certificateRef?.includes('T-1001'));
});
