import moment from "moment";

const diffDay = (activeForm: string, activeUntil: string) => {
  const date1 = moment(activeForm);
  const date2 = moment(activeUntil);

  const diffDays = date2.diff(date1, "days");

  return `${diffDays}일 남았어요`;
};

export { diffDay };
