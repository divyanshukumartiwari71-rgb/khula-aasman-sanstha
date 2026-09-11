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
    <div className="group bg-white/95 rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row min-h-[280px]">
        
        {/* Photo */}
        <div className="relative sm:w-[48%] shrink-0 bg-slate-100">
          <div className="absolute left-0 top-5 bottom-5 w-1.5 bg-orange-500 rounded-r-full" />

          <img
            src={image}
            alt={name}
            className="w-full h-64 sm:h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center p-6 sm:p-7">
          <h3 className="text-xl lg:text-2xl font-bold text-slate-900">
            {name}
          </h3>

          <p className="text-orange-500 font-semibold mt-2">
            {designation}
          </p>

          <div className="w-12 h-1 bg-orange-500 rounded-full mt-4 mb-4" />

          {description && (
            <p className="text-slate-600 text-sm lg:text-base leading-6">
              {description}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}