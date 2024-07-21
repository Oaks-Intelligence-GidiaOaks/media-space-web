import * as images from "../../../../assets";

const WhoisKommunitaFor = () => {
  return (
    <section className="my-24 w-full px-5 md:px-20">
      <p className="mx-auto bg-[#F7F7F8] text-sm w-[8.8rem] text-center rounded-md text-[#757682]">
        Built for you
      </p>
      <h2 className="text-[calc(2rem+10px)] mb-11 font-[600] text-center text-[#1D1D20] ">
        Who is Kommunita for?
      </h2>

      <div className="flex justify-between gap-10 flex-wrap">
        {whoiskommunitafor.map((item) => (
          <div key={item.id} className="w-[23.31rem] ">
            <div className="w-[5rem] h-[5rem] rounded-full bg-[#11AA27] ">
              <img src={item.image} alt={item.title} />
            </div>
            <h3 className="text-[calc(1rem+4px)] font-semibold ">
              {item.title}
            </h3>
            <p className="text-[1rem] ">{item.sub_title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoisKommunitaFor;

const whoiskommunitafor = [
  {
    id: 1,
    image: images.Businesses_and_Organizations,
    title: "Businesses and Organizations",
    sub_title:
      "Improve brand loyalty and build a strong community around products/services.",
  },
  {
    id: 2,
    image: images.wkf2,
    title: "Community Managers/Event Organizers",
    sub_title: "Plan, promote and manage events with ease.",
  },
  {
    id: 3,
    image: images.wkf3,
    title: "Marketing Professionals",
    sub_title:
      "Reach your ideal audience and gather valuable user behaviors that aids advertising.",
  },
  {
    id: 4,
    image: images.Businesses_and_Organizations,
    title: "Content Creators and Influencers",
    sub_title:
      "Build a supportive and interactive community that increases trust.",
  },
  {
    id: 5,
    image: images.Businesses_and_Organizations,
    title: "Educational Institutions and Tutors",
    sub_title:
      "Create interactive learning communities and virtual classrooms while managing student interactions.",
  },
  {
    id: 6,
    image: images.Businesses_and_Organizations,
    title: "Freelancers and consultants",
    sub_title:
      "Showcase their expertise, engage with clients, and build a network of professional contacts.",
  },
];
