import React from 'react';

const tutorials = [
  {
    id: 1,
    title: "How to Sign up on Kommunita",
    description: "Learn how to sign up on Kommunita",
  },
  {
    id: 2,
    title: "How to Sign up on Kommunita",
    description: "Learn how to sign up on Kommunita",
  },
  {
    id: 3,
    title: "How to Sign up on Kommunita",
    description: "Learn how to sign up on Kommunita",
  },
  {
    id: 4,
    title: "How to Sign up on Kommunita",
    description: "Learn how to sign up on Kommunita",
  },
  {
    id: 5,
    title: "How to Sign up on Kommunita",
    description: "Learn how to sign up on Kommunita",
  },
  {
    id: 6,
    title: "How to Sign up on Kommunita",
    description: "Learn how to sign up on Kommunita",
  },

];

const TutorialsGrid = () => {
  return (
    <div className="mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-[12rem] bg-[#D9D9D9] ">
              <div className=" absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 11V7l5 3-5 3z" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{tutorial.title}</h3>
              <p className="text-gray-600">{tutorial.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsGrid;
