import { logo } from "../../../../assets";
import search from "../../../../assets/titlebar/search.svg";
import notification from "../../../../assets/titlebar/notification.svg";
import placeholder from "../../../../assets/titlebar/placeholder.svg";
import chevron from "../../../../assets/titlebar/chevron.svg";

const TitleBar = () => {
  return (
    <div className="h-10 mb-4 flex justify-between pt-4 w-full pr-10 sticky top-0 bg-white">
      <div className="flex gap-1 flex-nowrap items-center">
        <img src={logo} />
        <p className="text-xl font-pt-serif">Kommunita</p>
      </div>
      <div className="flex gap-4 items-center">
        <button
          aria-label="Search"
          className="hover:bg-primary-gray rounded p-[2px]"
        >
          <img src={search} className="w-[22px]" />
        </button>
        <button
          aria-label="Notifications"
          className="relative hover:bg-primary-gray rounded p-1"
        >
          <img src={notification} className="w-4" />
          <div className="w-1 h-1 rounded-full absolute bg-red-500 top-[2px] right-[2px]" />
        </button>
        <button
          aria-label="Profile"
          className="flex flex-nowrap gap-2 items-center hover:bg-primary-gray rounded p-1"
        >
          <img src={placeholder} className="w-6 rounded-full" />
          <p className="font-inter">Yarri Sandra</p>
          <img className="w-3" src={chevron} />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
