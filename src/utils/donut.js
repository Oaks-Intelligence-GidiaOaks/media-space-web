export const generateDonutData = () => {
  const dummyData = [
    { label: "New", value: getRandomInt(20, 200) },
    { label: "Returning", value: getRandomInt(30, 100) },
    { label: "Inactive", value: getRandomInt(20, 50) },
  ];

  return dummyData;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
