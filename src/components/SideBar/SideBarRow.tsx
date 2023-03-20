import React, { SVGProps } from "react";

// interface Props {
//   Icon: (
//     props: SVGProps<SVGSVGElement> & {
//       title?: string | undefined;
//       titleId?: string | undefined;
//     }
//   ) => JSX.Element;
//   title: string;
// }
interface SidebarRowProps {
  // Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | JSX.Element;
  Icon?: any;
  title: string;
  // onClick: () => void;
}
const SideBarRow: React.FC<SidebarRowProps> = ({ Icon, title }) => {
  return (
    // px : padding
    // max-w-fit ~~ inlineBlock
    <div className="cursor-default	 flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full  hover:bg-gray-100 transition-all duration-200 group">
      <Icon className="h-7 w-7" />
      <p className="hidden group-hover:text-twitter md:inline-flex text-base lg:text-xl ">
        {title}
      </p>
    </div>
  );
};
export default SideBarRow;
