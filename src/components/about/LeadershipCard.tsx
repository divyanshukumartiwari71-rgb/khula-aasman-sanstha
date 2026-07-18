'use client';

import Image from 'next/image';

interface LeadershipCardProps {
  name: string;
  designation: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export default function LeadershipCard({
  name,
  designation,
  description,
  image,
  reverse = false,
}: LeadershipCardProps) {
  return (
    <section className="w-full py-12">
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          reverse ? 'lg:grid-flow-col-dense' : ''
        }`}
      >
        {/* Text */}
        <div
          className={`space-y-5 ${
            reverse ? 'lg:col-start-2' : ''
          }`}
        >
          <p className="text-xl font-semibold text-orange-600 mb-4">
  {designation}
</p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            {name}
          </h2>

          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>

          <p className="text-slate-600 text-lg leading-8">
            {description}
          </p>
        </div>          

        {/* Image */}
        <div
          className={`flex ${
            reverse ? 'lg:justify-start' : 'lg:justify-end'
          } justify-center`}
        >
          <div className="relative w-full max-w-md h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-2"
          />
          </div>
        </div>
      </div>
    </section>
  );
}