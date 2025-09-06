// 캘린더 일정 아이템 타입
export interface Appointment {
  id: number;
  title: string;
  details?: string;
  attendees?: string;
  color: string;
  message?: string;
}

// 캘린더 전체 데이터 타입 (날짜를 key로 가짐)
export interface AppointmentData {
  [date: string]: Appointment[];
}

// 가족 구성원 타입
export interface FamilyMember {
  id: number;
  name: string;
  profileImageUrl?: string; // 프로필 이미지 URL 추가
}

// 가족 책장 아이템 타입
export interface Book {
  id: number;
  ownerName: string;
  icon: string; // 책 아이콘 이미지 경로
}

// 질문 답변 타입
export interface QuestionAnswer {
  id: number; // answerId
  author: string; // nickname
  authorImageUrl?: string; // profileImageUrl (필요시 추가)
  timestamp: string; // createdAt
  answer: string; // content
  isMine?: boolean; // 본인 답변 여부
}
