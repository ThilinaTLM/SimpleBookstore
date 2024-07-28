import React from "react";


export type LabeledProps = {
  label: string;
  children: React.ReactNode;
};

const FancyLabelWrap: React.FC<LabeledProps> = ({ label, children }) => {
  return (
    <div className="tw-border-l-2 tw-pl-2">
      <label className="tw-text-sm tw-font-bold tw-text-gray-400">{label}</label>
      {children}
    </div>
  );
}

export default FancyLabelWrap;
