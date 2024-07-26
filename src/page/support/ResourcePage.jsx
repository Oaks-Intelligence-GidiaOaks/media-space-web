import React from "react";
import { useParams } from "react-router-dom";
import { resources } from "./resources";

const ResourcePage = () => {
    const { id } = useParams();
    console.log(id)
    const resource = resources.find( (item) => item.id === id );
//     const resource = resources[id]; 
//   console.log(displayItems);
  return (
    <div className="mx-auto px-5 md:px-20 pt-20 pb-32 flex flex-col lg:flex-row gap-10">
      <div className="lg:w-2/3">
        <div>
          <h1 className="text-2xl font-bold mb-4">{resource?.title}</h1>
          {resource?.paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
          <h2 className="text-xl font-semibold mb-4">{resource?.subheading}</h2>
          {resource?.subParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="lg:w-1/3">
        <h3 className="py-2">You might be interested in:</h3>
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">{resource?.title}</h3>
          <p className="text-gray-600 mb-4">{resource?.description}</p>
          <a href={resource?.link} className="text-green-600 flex items-center">
            Read more
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
