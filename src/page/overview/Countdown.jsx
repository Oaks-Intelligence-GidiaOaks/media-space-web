import { useState, useEffect } from "react";

export const CountdownBanner = ({ trialEndDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(trialEndDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [trialEndDate]);

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white h-16 w-full flex items-center justify-center shadow-lg mb-5 rounded-lg">
      {timeLeft.days !== undefined ? (
        <span className="font-semibold text-lg">
          {`Trial ends in ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
        </span>
      ) : (
        <span className="font-semibold text-lg">Trial has ended</span>
      )}
    </div>
  );
};
