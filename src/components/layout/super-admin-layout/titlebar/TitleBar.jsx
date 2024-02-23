import { logo } from "../../../../assets";
import search from "../../../../assets/titlebar/search.svg";
import notification from "../../../../assets/titlebar/notification.svg";
import placeholder from "../../../../assets/titlebar/placeholder.svg";
import chevron from "../../../../assets/titlebar/chevron.svg";
import { useNavigate } from "react-router-dom";

const TitleBar = () => {
  const navigate = useNavigate();

  const navigateToOverview = () => {
    navigate("/dashboard/overview");
  };

  return (
    <div className="h-10 mb-4 flex justify-between pt-4 w-full pl-1 sm:pl-0 pr-2 sticky top-0 bg-white">
      <div
        className="flex gap-1 flex-nowrap items-center w-fit cursor-pointer"
        onClick={navigateToOverview}
      >
        <img src={logo} className="w-6" />
        <p className="text-base sm:text-xl font-pt-serif">Kommunita</p>
      </div>
      <div className="flex gap-2 sm:gap-4 items-center">
        <button
          aria-label="Search"
          className="hover:bg-primary-gray rounded p-[2px]"
        >
          <img src={search} className="w-[18px] sm:w-[22px]" />
        </button>
        <button
          aria-label="Notifications"
          className="relative hover:bg-primary-gray rounded p-1"
        >
          <img src={notification} className="w-[14px] sm:w-4" />
          <div className="w-1 h-1 rounded-full absolute bg-red-500 top-[2px] right-[2px]" />
        </button>
        <button
          aria-label="Profile"
          className="flex flex-nowrap gap-2 items-center hover:bg-primary-gray rounded p-1"
        >
          <img src={placeholder} className="w-[18px] sm:w-6 rounded-full" />
          <p className="font-inter hidden sm:block">Yarri Sandra</p>
          <img className="w-3" src={chevron} />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
