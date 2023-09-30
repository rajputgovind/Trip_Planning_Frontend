const mois = [
  "كانون الثاني",
  "شباط",
  "آذار",
  "نيسان",
  "أيار",
  "حزيران",
  "تموز",
  "آب",
  "أيلول",
  "تشرين الأول",
  "تشرين الثاني",
  "كانون الأول",
];

export default function frenchTodayDate(date) {
  let today = new Date(date);

  let year = today.getFullYear();
  let dayNumber = today.getDate();
  let month = mois[today.getMonth()];
  let weekday = today.toLocaleDateString("ar-SA", { weekday: "long" });

  let newDate = `${dayNumber} ${month}`;

  return newDate;
}
