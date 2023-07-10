export type Institution = {
  name: string;
  address: string;
  country: string;
  region: string;
  id: string;
};

export type Subject = {
  name: String;
  academic_papers: number;
  students_total: number;
  student_rating: number;
};

export type Submission = {
  id: string;
  institution_id: string;
  year: number;
  students_total: number;
  undergraduates_total: number;
  postgraduates_total: number;
  staff_total: number;
  academic_papers: number;
  institution_income: number;
  subjects: Subject[];
};

export type InstitutionHistoryRecord = Record<string, InstitutionHistory>;

export type InstitutionHistory = Institution & {
  history: Submission[];
};

export type Rating = {
  ratingValue: number;
  yearRated: number;
};

export type RatedInstitutionHistory = InstitutionHistory & {
  rating: Rating;
};

export type RankedInstitutionHistory = RatedInstitutionHistory & {
  rankPosition: number;
};
