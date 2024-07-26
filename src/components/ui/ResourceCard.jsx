import { useNavigate, useParams } from "react-router-dom";

export const ResourceCard = ({ title, description, id }) => {
    const navigate = useNavigate()
    return (
    <div className="border py-5 px-4 rounded-lg shadow-md cursor-pointer" onClick={() => navigate('/support/get-started/' + id)}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <span className="text-green-600 flex items-center">
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
      </span>
    </div>
    )
};