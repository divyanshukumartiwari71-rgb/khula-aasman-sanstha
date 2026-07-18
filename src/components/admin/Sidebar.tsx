'use client';

import React from 'react';

export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-6">
      {children}
    </aside>
  );
}