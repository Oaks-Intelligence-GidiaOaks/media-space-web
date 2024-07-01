// Function to generate a random integer between min (inclusive) and max (inclusive)
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random data for a specified number of days
const generateRandomData = (startDate, endDate, minVal, maxVal) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const positive = getRandomInt(minVal, maxVal);
    const negative = getRandomInt(minVal, maxVal);
    const neutral = getRandomInt(minVal, maxVal);

    data.push({
      date: currentDate.toISOString().slice(0, 10),
      positive,
      negative,
      neutral,
    });

    currentDate.setDate(currentDate.getDate() + 5); // Increment by 1 days
  }

  return data;
};

// Replace the existing data with randomly generated data
const startDate = "2023-01-01";
const endDate = "2024-07-5";
const minVal = 5; // Minimum value for sentiment counts
const maxVal = 15; // Maximum value for sentiment counts

const data = generateRandomData(startDate, endDate, minVal, maxVal);
console.log(data);

export default data;
