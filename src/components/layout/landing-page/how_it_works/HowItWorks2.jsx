import * as images from "../../../../assets";
import "./how_it_work_mobile.css";

const HowItWorks2 = () => {
  return (
    <section className="my-24 w-full px-5 md:px-20">
      <p className="mx-auto bg-[#F7F7F8] text-sm w-[8.8rem] text-center rounded-md text-[#757682]">
        Built for you
      </p>
      <h2 className="text-[calc(2rem+10px)] mb-11 font-[600] text-center text-[#1D1D20] ">
        How Kommunita works
      </h2>

      {/* 01 */}

      <div className="bg-gradient-custom py-16 mb-16 rounded-xl xl:flex justify-between gap-5 items-center relative">
        <div className="rounded pt-10 pl-10 w-full xl:w-[45%] flex flex-col md:flex-row xl:flex-col justify-between gap-10 h-full">
          <div className="flex-grow">
            <h4 className="text-[2rem] font-semibold text-[#2D2B2B]">
              Account Management
            </h4>
            <p className="text-[1rem] text-[#5E5E6B]">
              Create your account and set up your community <br /> profile with
              comprehensive control and security.
            </p>
          </div>
          <div className="w-full h-full mt-auto">
            <h1 className="text-[12.5rem] text-[#EBEBEB] leading-[14.5rem] font-bold">
              01
            </h1>
          </div>
        </div>
        <div className=" rounded pt-10 pl-5 w-full xl:w-[55%] flex flex-col">
          <div className="w-full h-[80%] mt-auto">
            <img
              src={images.Account_Management}
              className="w-full h-full object-cover"
              alt="Sentiment Analysis"
            />
          </div>
        </div>
        <div className="hidden xl:block absolute w-[30rem] right-[3rem] bottom-0 mt-auto">
          <img
            src={images.how_it_work_mobile}
            className="w-full h-full object-cover"
            alt="Sentiment Analysis"
          />
        </div>
      </div>

        {/* 02 */}
      <div className="bg-gradient-custom2 pt-10 mb-16 rounded-xl block xl:flex justify-between gap-32 items-center ">
        <div className=" rounded pl-5 flex-1 flex flex-col relative">
          <div className="md:w-[23rem] xl:w-[30rem] h-[80%] mt-auto">
            <img
              src={images.Engage_Community}
              className="w-full h-full object-cover"
              alt="Sentiment Analysis"
            />
          </div>
          <div className="md:w-[23rem] absolute xl:w-[25rem] left-56 bottom-0 mt-auto">
            <img
              src={images.Engage_Community2}
              className="w-full h-full object-cover"
              alt="Sentiment Analysis"
            />
          </div>
        </div>
        <div className="rounded pt-10 pl-10 pr-20 flex-1 flex flex-col md:flex-row xl:flex-col justify-between gap-10 h-full">
          <div className="flex-grow flex flex-col xl:pl-24 justify-end">
            <h4 className="text-[2rem] font-semibold text-[#2D2B2B]">
              Engage Your Community
            </h4>
            <div className="text-[1rem] text-[#5E5E6B]">
              <ul className="">
                <li className="py-2 text-[1rem]">
                  - Host live discussions, and virtual events with <br />{" "}
                  seamless audio and video room integration.
                </li>
                <li className="py-2 text-[1rem]">
                  - Get direct access to brands.
                </li>
                <li className="py-2 text-[1rem]">
                  - Share various types of content and run surveys <br /> to
                  gather feedback.
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex xl:justify-end h-full mt-auto xl:pr-10">
            <h1 className="text-[12.5rem] text-[#EBEBEB] leading-[14.5rem] font-bold">
              02
            </h1>
          </div>
        </div>
      </div>

      {/* 03 */}

      <div className="bg-gradient-custom3 py-16 mb-16  rounded-xl xl:flex justify-between gap-5 items-center relative">
        <div className="rounded pt-10 pl-10 w-full xl:w-[45%] flex flex-col md:flex-row xl:flex-col justify-between gap-10 h-full">
          <div className="flex-grow">
            <h4 className="text-[2rem] font-semibold text-[#2D2B2B]">
              Increase Productivity
            </h4>
            <div className="text-[1rem] text-[#5E5E6B]">
              <ul>
                <li>
                  - Structure communications by assigning <br /> specific roles
                  and permissions to community <br /> members.
                </li>
                <li>
                  - Maintain a cohesive workflow by connecting <br /> with your
                  existing CRM and email marketing tool.
                </li>
                <li>
                  - Reach and attract your ideal audience with <br /> precise
                  targeting options for advertisements <br /> within and outside
                  the community.
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-full mt-auto">
            <h1 className="text-[12.5rem] text-[#EBEBEB] leading-[14.5rem] font-bold">
              03
            </h1>
          </div>
        </div>
        <div className=" rounded pt-10 pl-5 w-full xl:w-[55%] flex flex-col">
          <div className="w-full h-[80%] mt-auto">
            <img
              src={images.Increase_productivity}
              className="w-full h-full object-cover"
              alt="Sentiment Analysis"
            />
          </div>
        </div>
      </div>

        {/* 04 */}
        <div className="bg-gradient-custom4 pt-10 mb-16 rounded-xl block xl:flex justify-between gap-32 items-center ">
        <div className=" rounded pl-5 flex-1 flex flex-col relative">
          <div className="md:w-[23rem] xl:w-[48.5rem] h-[80%] mt-auto">
            <img
              src={images.Analyze_and_Improve}
              className="w-full h-full object-cover"
              alt="Sentiment Analysis"
            />
          </div>
        </div>
        <div className="rounded pt-10 flex-1 flex flex-col md:flex-row xl:flex-col justify-between gap-5 h-full">
          <div className="flex-grow flex flex-col justify-end">
            <h4 className="text-[2rem] font-semibold text-[#2D2B2B]">
            Analyze and Improve
            </h4>
            <p className="text-[1rem] text-[#5E5E6B]">
            Monitor and analyze community engagement, <br /> growth, and overall performance.
            </p>
          </div>
          <div className="w-full flex xl:justify-end h-full mt-auto xl:pr-10">
            <h1 className="text-[12.5rem] text-[#EBEBEB] leading-[14.5rem] font-bold">
              04
            </h1>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HowItWorks2;
