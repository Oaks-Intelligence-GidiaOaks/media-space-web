export const generateSubscriptionData = () => {
  const dummyData = [
    { label: "Paid", value: getRandomInt(20, 200) },
    { label: "Trial", value: getRandomInt(30, 50) },
  ];

  return dummyData;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
