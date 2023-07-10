// This is a file to mimic the BE and what might come from it.

import {
  InstitutionHistoryRecord,
  RankedInstitutionHistory,
  RatedInstitutionHistory,
  Rating,
  Submission,
} from "../entityTypes";
import submissions from "./submissions.json";
import institutions from "./institutions.json";

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

export const getFullInstitutionHistory = (): InstitutionHistoryRecord => {
  let institutionHistory: InstitutionHistoryRecord = {};

  institutions.forEach((institution) => {
    institutionHistory[institution.id] = { ...institution, history: [] as Submission[] };
  });

  submissions.forEach((submission) => {
    const institutionId = submission.institution_id;
    const oldHistory = institutionHistory[institutionId];

    institutionHistory[institutionId] = {
      ...oldHistory,
      history: [...oldHistory.history, submission],
    };
  });

  return institutionHistory;
};

export const getSubjectRankedInstitutions = (chosenSubject: string): RankedInstitutionHistory[] => {
  const fullHistory = getFullInstitutionHistory();
  const fullHistoryList = Object.values(fullHistory);

  // Filter institutions that have never had that subject
  const filteredHistoryList = fullHistoryList.filter((institution) => {
    return institution.history.some((historyPoint) =>
      historyPoint.subjects.find((sub) => sub.name === chosenSubject)
    );
  });

  const filteredHistoryListWithLatestRating: RatedInstitutionHistory[] = filteredHistoryList.map(
    (institution) => {
      const latestRating: Rating | undefined = institution.history.reduce<Rating | undefined>(
        (acc, cur) => {
          const subject = cur.subjects.find((sub) => sub.name === chosenSubject);
          if (!subject) return acc;

          const subjectRanking: Rating = {
            ratingValue: subject.student_rating,
            yearRated: cur.year,
          };

          if (!cur) return acc;
          if ((!!acc && cur.year > acc.yearRated) || (!acc && !!cur)) {
            return subjectRanking;
          }
          return acc;
        },
        undefined
      );

      // TODO REMOVE - emptyRating Technically should never reach this.
      return {
        ...institution,
        rating: latestRating ?? emptyRating,
      };
    }
  );

  const rankedHistory: RankedInstitutionHistory[] = filteredHistoryListWithLatestRating
    .sort((a, b) => b.rating.ratingValue - a.rating.ratingValue)
    .map((item, index) => ({ ...item, rankPosition: index + 1 }));

  return rankedHistory;
};

const emptyRating = {
  ratingValue: 0,
  yearRated: 0,
};
