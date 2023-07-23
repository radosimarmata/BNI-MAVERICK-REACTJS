import React from "react";

export default function Case({ children }) {
  return (
    <div className="grid grid-cols-12 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <section className="col-span-12 sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 ml-3">
        {children}
      </section>
    </div>
  );
}
