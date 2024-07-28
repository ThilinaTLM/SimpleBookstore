import {cn} from "@/lib/tw";
import React from "react";


export type MultiColumnLayoutProps = {
  className?: string;
  children?: React.ReactNode;
}

const MultiColumnLayout: React.FC<MultiColumnLayoutProps> = (props) => {
  return (
    <div className={cn(
      "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-x-4 tw-gap-y-1 tw-mt-4",
      props.className
    )}>
      {props.children}
    </div>
  );
}

export default MultiColumnLayout;
