import * as images from "../../../../assets";

const KommunitaIntegration = () => {
  return (
    <section className="my-24 w-full px-5 md:px-20 bg-[#141414] relative">
      {/* <div className="w-[25rem] h-[25rem] bg-gradient-custom5 absolute">

        </div> */}
      <img
        src={images.Glow}
        alt=""
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 "
      />
      <div className="pt-24 z-20">
        <p className="mx-auto bg-[#F7F7F8] text-sm w-[8.8rem] text-center rounded-md text-[#757682]">
          Seamless Integration
        </p>
        <h2 className="text-[3.5rem] mb-11 font-[600] text-center text-[#F7F7F8] ">
          Kommunita Integrations
        </h2>
      </div>

      <div className="mx-auto flex justify-center flex-wrap items-center">
        <div className="mx-auto grid grid-cols-2 items-center relative">
          <div className="flex flex-col justify-center items xl:px-36 py-6 border-b-2 border-b-[#FFFFFF21] border-r-2 border-r-[#15CE12] ">
            <img src={images.messaging} alt="" className="mx-auto" />
            <p className="text-white text-center">Direct Messaging</p>
          </div>
          <div className="flex flex-col justify-center items xl:px-36 py-6 border-b-2 border-b-[#FFFFFF21] ">
            <img src={images.Media} alt="" className="mx-auto" />
            <p className="text-white text-center">Audio and Video Room</p>
          </div>
          <div className="flex flex-col justify-center items xl:px-36 py-6  border-r-2 border-r-[#15CE12]">
            <img src={images.calender} alt="" className="mx-auto" />
            <p className="text-white text-center">Event Management</p>
          </div>
          <div className="flex flex-col justify-center items xl:px-36 py-6  ">
            <img src={images.messaging} alt="" className="mx-auto" />
            <p className="text-white text-center">
              API integration for CRM, email marketing tools
            </p>
            <small className="text-white text-center">(Coming soon)</small>
          </div>
          <div className="w-[8.92rem] h-[8.92rem] bg-[#FFFFFF21] rounded-full absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
          {/* <div className=""> */}
          <img
            src={images.favicon_2}
            alt=""
            className="w-[4rem] absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
          />
          {/* </div> */}
        </div>

        <div className="flex flex-col pb-24 justify-center items-center pt-10">
          <div className="relative">
          <img src={images.messages_1} alt="" className="w-full" />
          <img src={images.messages} alt="" className="absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-white text-center">
            Unified social media management Tool
          </p>
          <small className="text-white text-center">(Coming soon)</small>
        </div>
      </div>
    </section>
  );
};

export default KommunitaIntegration;
