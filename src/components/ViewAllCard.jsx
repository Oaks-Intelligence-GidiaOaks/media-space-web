import { Link } from "react-router-dom";
import { ORGANIZATIONS_TABLE } from "../routes/CONSTANT";

const ViewAllCard = () => {
  return (
    <div className=" w-full pl-4 max-w-[159.45px] bg-white border border-gray-400 shadow-md rounded-lg">
      <div className="relative flex items-center justify-center">
        <div>
          <div className=" absolute bg-[#979797] h-10 w-10 rounded-full top-20 left-0 hover:scale-125 transition-all transform duration-300"></div>
          <div className=" absolute bg-[#979797] h-10 w-10 rounded-full top-20 left-7 hover:scale-125 transition-all transform duration-300"></div>
          <div className=" absolute bg-[#979797] h-10 w-10 rounded-full top-20 left-14 hover:scale-125 transition-all transform duration-300"></div>
          <div className=" absolute bg-[#979797] h-10 w-10 rounded-full top-20 left-20 hover:scale-125 transition-all transform duration-300"></div>

          <div className="absolute top-32 left-0 flex justify-start">
            <h1 className="font-inter text-[24px] font-medium">5k+ more...</h1>{" "}
          </div>

          <div className="absolute top-48  left-7 flex justify-start">
            <Link
              to={ORGANIZATIONS_TABLE}
              className=" font-inter text-base font-medium"
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCard;
