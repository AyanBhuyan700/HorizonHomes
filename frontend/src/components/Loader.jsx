import React from "react";

const Loader = ({ text = "Curating properties..." }) => {
  return (
    <div className="loader-container py-12">
      <div className="luxury-spinner"></div>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 animate-pulse mt-2">{text}</p>
    </div>
  );
};

export default Loader;