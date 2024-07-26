import ResourceGrid from "./ResourceGrid";

const GetStarted = () => {
  return (
    <>
      <div className="flex flex-col pt-10 items-center justify-center">
        <h1 className="text-[2rem] leading-[4.5rem] font-semibold font-inter">
          Get Started
        </h1>
        <p className="text-[1rem] px-5 md:px-20">
          Get access to our pool of resources to get started on Kommunita.
        </p>
      </div>
      <ResourceGrid />
    </>
  );
};

export default GetStarted;
