export const generateDummyData = () => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const data = months.map((month) => ({
    date: month,
    totalUsers: getRandomInt(50, 200),
    inactiveUsers: getRandomInt(10, 30), // Adjusted range
    activeUsers: getRandomInt(30, 150), // Adjusted range
  }));

  return data;
};
