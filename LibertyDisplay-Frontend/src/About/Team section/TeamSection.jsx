import React from "react";

const teamMembers = [
  {
    name: "Walter White",
    title: "Chief Executive Officer",
    desc: "Aliquam iure quaerat voluptatem praesentium possimus unde laudantium vel dolorum distinctio dire flow",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Jhonson",
    title: "Product Manager",
    desc: "Labore ipsam sit consequatur exercitationem rerum laboriosam laudantium aut quod dolores exercitationem ut",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "William Anderson",
    title: "CTO",
    desc: "Illum minima ea autem doloremque ipsum quidem quas aspernatur modi ut praesentium vel tque sed facilis at qui",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Amanda Jepson",
    title: "Accountant",
    desc: "Quisquam facilis cum velit laborum corrupti fugit explicabo. Nemo enim ipsam voluptatem",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "David Brown",
    title: "Developer",
    desc: "Tempora voluptas vero explicabo vel eum fugiat sit ab alias, quam voluptatem perferendis.",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Lisa Hunter",
    title: "Designer",
    desc: "Est et expedita aliquid placeat. Quia fugiat sit in iste officiis commodi quidem hic quas.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const TeamSection = () => (
  <section className="w-full py-16 flex flex-col items-center bg-white">
    <div className="max-w-6xl w-full mx-auto px-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="w-14 h-1 bg-[#2a337b] rounded"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700">Team</h2>
          <span className="w-14 h-1 bg-[#2a337b] rounded"></span>
        </div>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mt-10">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center px-4"
          >
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white bg-gray-100 flex items-center justify-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xl font-bold text-gray-700">{member.name}</div>
            <div className="text-base italic text-gray-500 mb-2">
              {member.title}
            </div>
            <div className="text-gray-600">{member.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
