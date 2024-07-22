import * as images from "../../../../assets";

const FeatureCards = () => {
  return (
    <div className="my-24 w-full px-5 md:px-20">
      <p className="mx-auto bg-[#F7F7F8] text-sm w-[8.8rem] text-center rounded-md text-[#757682]">
        Built for you
      </p>
      <h2 className="text-[calc(2rem+2px)] font-[600] text-center text-[#1D1D20] ">
        Kommunita features
      </h2>
      <div className="flex flex-col gap-y-5 pt-10">
        <div className="flex justify-between gap-5 items-center">
          <div className="border rounded pt-10 pl-5 w-[45%] h-[28rem] flex flex-col">
            <div className="flex-grow">
              <h4 className="text-[calc(1rem+3px)] font-semibold text-[#2D2B2B]">
                Targeted Advertising
              </h4>
              <p className="text-sm text-[#5E5E6B]">
                Unlimited Advertising for the price of one License
              </p>
            </div>
            <div className="w-full h-[80%] mt-auto">
              <img
                src={images.target_advert}
                className="w-full h-full object-cover"
                alt="target advert"
              />
            </div>
          </div>
          <div className="border rounded pt-10 pl-5 w-[55%] h-[28rem] flex flex-col">
            <div className="flex-grow">
              <h4 className="text-[calc(1rem+3px)] font-semibold text-[#2D2B2B]">
                Sentiment Analysis
              </h4>
              <p className="text-sm text-[#5E5E6B]">
                Real-time data on user behaviour, expectation and satisfaction
              </p>
            </div>
            <div className="w-full h-[80%] mt-auto">
              <img
                src={images.Sentiment_Analysis}
                className="w-full h-full object-cover"
                alt="Sentiment Analysis"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-x-5 items-center">
          <div className="border rounded pb-10 pl-5 w-[55%] h-[28rem] md:flex  md:flex-col-reverse">
            <div className="flex-grow pt-10">
              <h4 className="text-[calc(1rem+3px)] font-semibold text-[#2D2B2B]">
              Surveys and Polls
              </h4>
              <p className="text-sm text-[#5E5E6B]">
              Direct input on user interaction and needs
              </p>
            </div>
            <div className="w-full h-[75%] mt-auto">
              <img
                src={images.Surveys_and_Polls}
                className="w-full h-full object-contain"
                alt="target advert"
              />
            </div>
          </div>
          <div className="border rounded pb-10 pl-5 w-[45%] h-[28rem] flex flex-col-reverse">
            <div className="flex-grow pt-10">
              <h4 className="text-[calc(1rem+3px)] font-semibold text-[#2D2B2B]">
              Performance and Analytics
              </h4>
              <p className="text-sm text-[#5E5E6B]">
              Comprehensive metrics on community growth and engagement
              </p>
            </div>
            <div className="w-full h-[80%] mt-auto">
              <img
                src={images.Performance_and_Analytics}
                className="w-full h-full object-cover"
                alt="Sentiment Analysis"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
