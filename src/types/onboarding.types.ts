export const STEP = {
  START: 0,
  USER_INFO: 1,
  TERMS_CONDITIONS: 2,
  CREATE_COMPLETE: 3,
  JOIN_QUESTION: 4,
  JOIN_PENDING: 5,
} as const;

export const TYPE = {
  CREATE: "CREATE",
  JOIN: "JOIN",
} as const;

export type StepValue = (typeof STEP)[keyof typeof STEP];
export type TypeValue = (typeof TYPE)[keyof typeof TYPE];

export interface StepInfo {
  step: StepValue;
  type: TypeValue | "";
}

export interface StepProps {
  goToNextStep: (nextStep: StepValue, type?: TypeValue) => void;
}

export interface Step1Props extends StepProps {
  type: TypeValue;
}
