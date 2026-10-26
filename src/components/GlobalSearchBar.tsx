import React, { useState, useEffect, useRef } from 'react';
import { useRodFarag } from '../context/RodFaragContext';
import {
  Search,
  X,
  GraduationCap,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Hash
} from 'lucide-react';
import { Student, Teacher, School } from '../types';

interface GlobalSearchBarProps {
  className?: string;
  isMobileModal?: boolean;
  onCloseMobileModal?: () => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  className = '',
  isMobileModal = false,
  onCloseMobileModal
}) => {
  const {
    students,
    teachers,
    schools,
    setActiveSection,
    setSelectedSchoolFilter,
    setSearchQuery: setGlobalSearchQuery,
    addToast
  } = useRodFarag();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'students' | 'teachers' | 'schools'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        if (onCloseMobileModal) onCloseMobileModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseMobileModal]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  // Search Results
  const matchedStudents: Student[] = normalizedQuery
    ? students.filter(s =>
        s.name.toLowerCase().includes(normalizedQuery) ||
        s.internalCode.toLowerCase().includes(normalizedQuery) ||
        s.schoolName.toLowerCase().includes(normalizedQuery) ||
        s.parentName.toLowerCase().includes(normalizedQuery) ||
        s.grade.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedTeachers: Teacher[] = normalizedQuery
    ? teachers.filter(t =>
        t.name.toLowerCase().includes(normalizedQuery) ||
        t.internalCode.toLowerCase().includes(normalizedQuery) ||
        t.subject.toLowerCase().includes(normalizedQuery) ||
        t.schoolName.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedSchools: School[] = normalizedQuery
    ? schools.filter(sc =>
        sc.name.toLowerCase().includes(normalizedQuery) ||
        sc.code.toLowerCase().includes(normalizedQuery) ||
        sc.principalName.toLowerCase().includes(normalizedQuery) ||
        sc.address.toLowerCase().includes(normalizedQuery) ||
        sc.stageNameAr.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const totalResults = matchedStudents.length + matchedTeachers.length + matchedSchools.length;

  const handleSelectStudent = (student: Student) => {
    setGlobalSearchQuery(student.name);
    setActiveSection('students');
    setIsOpen(false);
    if (onCloseMobileModal) onCloseMobileModal();
    addToast(`تم الانتقال لملف الطالب: ${student.name}`, 'info');
  };

  const handleSelectTeacher = (teacher: Teacher) => {
    setGlobalSearchQuery(teacher.name);
    setActiveSection('teachers');
    setIsOpen(false);
    if (onCloseMobileModal) onCloseMobileModal();
    addToast(`تم الانتقال لسجل المعلم: ${teacher.name}`, 'info');
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchoolFilter(school.id);
    setActiveSection('schools');
    setIsOpen(false);
    if (onCloseMobileModal) onCloseMobileModal();
    addToast(`تم الانتقال لبيانات المدرسة: ${school.name}`, 'info');
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-amber-400 absolute right-3 pointer-events-none transition-colors" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="بحث شامل عن طالب، معلم، أو مدرسة..."
          className="w-full bg-slate-800/95 hover:bg-slate-800 border border-slate-700/80 focus:border-amber-500/80 text-slate-100 placeholder-slate-400 text-xs sm:text-sm rounded-xl py-2 pr-9.5 pl-16 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all shadow-inner"
        />

        <div className="absolute left-2 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-md hover:bg-slate-700/60 transition-colors"
              title="مسح البحث"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-slate-400 bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded font-mono font-medium shadow-sm">
              <span className="text-[9px]">⌘</span>K
            </span>
          )}
        </div>
      </div>

      {/* Dropdown Results Box */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full min-w-[320px] sm:min-w-[480px] lg:min-w-[560px] max-w-2xl right-0 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header tabs if query is present */}
          {query.trim().length > 0 ? (
            <>
              {/* Category Filter Tabs */}
              <div className="flex items-center justify-between p-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-1 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab('all')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                      activeTab === 'all'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>الكل</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20">{totalResults}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('students')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                      activeTab === 'students'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>الطلاب</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20">{matchedStudents.length}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('teachers')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                      activeTab === 'teachers'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>المعلمون</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20">{matchedTeachers.length}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('schools')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                      activeTab === 'schools'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>المدارس</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20">{matchedSchools.length}</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-400 font-medium">
                  {totalResults} نتيجة مطابقة
                </span>
              </div>

              {/* Results List */}
              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-800/80 p-2">
                {totalResults === 0 ? (
                  <div className="py-8 text-center text-slate-400">
                    <Search className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold text-slate-300">لم يتم العثور على نتائج تطابق &quot;{query}&quot;</p>
                    <p className="text-xs text-slate-500 mt-1">تأكد من كتابة الاسم أو الكود أو اسم المدرسة بشكل صحيح</p>
                  </div>
                ) : (
                  <>
                    {/* Students Section */}
                    {(activeTab === 'all' || activeTab === 'students') && matchedStudents.length > 0 && (
                      <div className="py-2">
                        <div className="px-3 py-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>الطلاب ({matchedStudents.length})</span>
                        </div>
                        <div className="space-y-1 mt-1">
                          {matchedStudents.slice(0, 6).map((student) => (
                            <button
                              key={student.id}
                              onClick={() => handleSelectStudent(student)}
                              className="w-full text-right p-2.5 rounded-xl hover:bg-slate-800/80 transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                  <GraduationCap className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                                      {student.name}
                                    </span>
                                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                                      {student.internalCode}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                    <span>{student.schoolName}</span>
                                    <span>•</span>
                                    <span>{student.grade} - فصل {student.classroom}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                  حضور {student.attendanceRate}%
                                </span>
                                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-[-2px] transition-all" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Teachers Section */}
                    {(activeTab === 'all' || activeTab === 'teachers') && matchedTeachers.length > 0 && (
                      <div className="py-2">
                        <div className="px-3 py-1 text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>المعلمون ({matchedTeachers.length})</span>
                        </div>
                        <div className="space-y-1 mt-1">
                          {matchedTeachers.slice(0, 5).map((teacher) => (
                            <button
                              key={teacher.id}
                              onClick={() => handleSelectTeacher(teacher)}
                              className="w-full text-right p-2.5 rounded-xl hover:bg-slate-800/80 transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                                  <Users className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                                      {teacher.name}
                                    </span>
                                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                                      {teacher.internalCode}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                    <span className="text-blue-300/90 font-medium">{teacher.subject}</span>
                                    <span>•</span>
                                    <span>{teacher.schoolName}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                                  تقييم {teacher.evaluationScore}%
                                </span>
                                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-[-2px] transition-all" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Schools Section */}
                    {(activeTab === 'all' || activeTab === 'schools') && matchedSchools.length > 0 && (
                      <div className="py-2">
                        <div className="px-3 py-1 text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>المدارس ({matchedSchools.length})</span>
                        </div>
                        <div className="space-y-1 mt-1">
                          {matchedSchools.slice(0, 5).map((school) => (
                            <button
                              key={school.id}
                              onClick={() => handleSelectSchool(school)}
                              className="w-full text-right p-2.5 rounded-xl hover:bg-slate-800/80 transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                                  <Building2 className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                                      {school.name}
                                    </span>
                                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                                      {school.code}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                    <span className="text-emerald-400/90 font-medium">{school.stageNameAr}</span>
                                    <span>•</span>
                                    <span>مدير المدرسة: {school.principalName}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md">
                                  {school.studentsCount} طالب
                                </span>
                                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-[-2px] transition-all" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            /* Quick suggestions when input is empty */
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  اقتراحات بحث سريعة في منظومة روض الفرج
                </span>
                <span className="text-[10px] text-slate-500">انقر للبحث الفوري</span>
              </div>

              {/* Sample Quick Searches */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {schools.slice(0, 4).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setQuery(s.name);
                      inputRef.current?.focus();
                    }}
                    className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-amber-300 px-2.5 py-1.5 rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-3 h-3 text-amber-400" />
                    <span>{s.name}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setQuery('الأول الثانوي');
                    inputRef.current?.focus();
                  }}
                  className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-amber-300 px-2.5 py-1.5 rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-3 h-3 text-blue-400" />
                  <span>طلاب الأول الثانوي</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('اللغة العربية');
                    inputRef.current?.focus();
                  }}
                  className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-amber-300 px-2.5 py-1.5 rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span>معلمو اللغة العربية</span>
                </button>
              </div>

              {/* Quick direct section links */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>تصفح الأقسام مباشرة:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('students');
                      setIsOpen(false);
                      if (onCloseMobileModal) onCloseMobileModal();
                    }}
                    className="text-amber-400 hover:underline"
                  >
                    قائمة الطلاب
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('teachers');
                      setIsOpen(false);
                      if (onCloseMobileModal) onCloseMobileModal();
                    }}
                    className="text-blue-400 hover:underline"
                  >
                    قائمة المعلمين
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('schools');
                      setIsOpen(false);
                      if (onCloseMobileModal) onCloseMobileModal();
                    }}
                    className="text-emerald-400 hover:underline"
                  >
                    الـ 16 مدرسة
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
