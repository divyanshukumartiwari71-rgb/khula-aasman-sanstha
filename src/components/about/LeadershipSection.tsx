'use client';

import LeadershipCard from './LeadershipCard';

export default function LeadershipSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-20">
          <p className="text-orange-500 font-semibold uppercase tracking-[0.25em]">
            Meet Our Leadership
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            Our Leadership
          </h2>

          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>

          <p className="mt-6 max-w-3xl mx-auto text-slate-600 text-lg">
            The dedicated leadership team behind Khula Aasman Sanstha,
            committed to creating lasting social impact through education,
            empowerment, and community development.
          </p>
        </div>

        {/* President */}
<LeadershipCard
  name="Roly Singh Raghuvanshi"
  designation="President & Founder"
  description="Roly Singh is the Founder and President of Khula Aasman Sanstha. With a strong vision of creating equal opportunities for every child and empowering women through education and social development, she has led the organization with compassion, dedication, and purpose. Her leadership continues to inspire meaningful change and sustainable community impact across Varanasi."
  image="/images/leadership/founder-president.jpg"
  reverse
/>

{/* Treasurer */}
<LeadershipCard
  name="Diksha Singh Raghuvanshi"
  designation="Treasurer & Co-Founder"
  description="As the Co-Founder and Treasurer of Khula Aasman Sanstha, Diksha Singh oversees financial planning, transparency, and responsible resource management. She plays a vital role in strengthening the organization's programs while ensuring that every initiative is implemented with accountability and long-term sustainability."
  image="/images/leadership/cofounder-treasurer.jpg"
  
/>

{/* Secretary */}
<LeadershipCard
  name="Ankit Chaubey"
  designation="General Secretary"
  description="The General Secretary is responsible for coordinating the organization's daily operations, volunteer engagement, and community outreach activities. By ensuring smooth communication and effective execution of programs, the role contributes significantly to achieving the foundation's mission and expanding its social impact."
  image="/images/team/general-secretary.jpg"
  reverse
/>

{/* Joint Secretary */}
<LeadershipCard
  name="Rajat Mishra"
  designation="Joint Secretary"
  description="Rajat Mishra supports the organization's administrative coordination, volunteer engagement, and program implementation. As Joint Secretary, he works closely with the leadership team to ensure smooth execution of community initiatives and strengthen the foundation's outreach activities."
  image="/images/team/joint-secretary.jpg"
/>

      </div>
    </section>
  );
}