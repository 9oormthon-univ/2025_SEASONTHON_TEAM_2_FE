import moment from "moment";

const diffDay = (activeUntil: string) => {
  const date1 = moment(new Date());
  const date2 = moment(activeUntil);

  const diffDays = date2.diff(date1, "days");

  return `${diffDays + 1}일 남았어요`;
};

export { diffDay };
