// This is a file to mimic the BE and what might come from it.

import { Institution, Submission } from "../entityTypes";
import submissions from "./submissions.json";
import institutions from "./institutions.json";

export const getSubmissions = (): Submission[] => submissions;

export const getInstitutions = (): Institution[] => institutions;

export const getSubjects = (): string[] => {
  let subjects: string[] = [];
  submissions.forEach((sub) => {
    sub.subjects.forEach((submissionSubject) => {
      if (!subjects.includes(submissionSubject.name)) {
        subjects.push(submissionSubject.name);
      }
    });
  });
  return subjects;
};
