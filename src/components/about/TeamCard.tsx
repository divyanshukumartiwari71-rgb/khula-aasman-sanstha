'use client';

interface TeamCardProps {
  name: string;
  designation: string;
  image: string;
  description?: string;
}

export default function TeamCard({
  name,
  designation,
  image,
  description,
}: TeamCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-contain bg-slate-100 p-0.2"
      />

      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-slate-900">
          {name}
        </h3>

        <p className="text-orange-500 font-semibold mt-2">
          {designation}
        </p>

        {description && (
          <p className="text-slate-500 text-sm mt-4 leading-7">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}