import type {
  AppointmentData,
  FamilyMember,
  Book,
  QuestionAnswer,
} from "../types";
import {
  BookBlue,
  BookGreen,
  BookOrange,
  BookYellow,
  BookPink,
} from "../assets/icons/home";

export const sampleAppointments: AppointmentData = {
  "2025-09-05": [{ id: 1, title: "프로젝트 마감", color: "#FFBCDB" }],
  "2025-09-06": [
    {
      id: 2,
      title: "엄마와의 데이트",
      details: "2025-09-06 11:00, 서울대공원",
      attendees: "마마 외 1인",
      color: "#FFE691",
      message:"어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구",
    },
    {
      id: 3,
      title: "우리가족 여름휴가^^",
      details: "2025-09-06 09-08, 제주도",
      attendees: "파파 외 3인",
      color: "#FFBCDB",
    },
    {
      id: 4,
      title: "심야영화보자 ㅎ",
      details: "2025-09-06 21:00, CGV 강남점",
      attendees: "구름이 외 1인",
      color: "#93BFFF",
    },
  ],
  "2025-09-09": [{ id: 5, title: "친구와 저녁 약속", color: "#93BFFF" }],
};

export const familyMembers: FamilyMember[] = [
  { id: 1, name: "구름이" },
  { id: 2, name: "마마" },
  { id: 3, name: "파파" },
  { id: 4, name: "동생" },
];

export const familyBooks: Book[] = [
  { id: 1, ownerName: "구름이", icon: BookPink },
  { id: 2, ownerName: "마마", icon: BookBlue },
  { id: 3, ownerName: "파파", icon: BookGreen },
  { id: 4, ownerName: "동생", icon: BookOrange },
  { id: 5, ownerName: "가족", icon: BookYellow },
  { id: 6, ownerName: "모두", icon: BookPink },
];

export const questionAnswers: QuestionAnswer[] = [
  {
    id: 1,
    author: "엄마",
    timestamp: "2025-08-28 14:56",
    answer: "알아서 잘 딱 깔끔하고 센스있게?",
    isMine: false,
  },
  {
    id: 2,
    author: "파파",
    timestamp: "2025-08-28 15:02",
    answer: "그런 신조어는 잘 모르겠다만...",
    isMine: false,
  },
  {
    id: 3,
    author: "구름이",
    timestamp: "2025-08-28 18:30",
    answer: "알아서 잘! 딱! 깔끔하고 센스있게!",
    isMine: true,
  },
];
