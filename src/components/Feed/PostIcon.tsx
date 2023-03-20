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
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: number | string;
}
const PostIcon: React.FC<SidebarRowProps> = ({ Icon, title }) => {
  return (
    // px : padding
    // max-w-fit ~~ inlineBlock
    <div className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full  hover:bg-gray-100 transition-all duration-200 group">
      <Icon className="h-6 w-6" />
      <p className=" group-hover:text-twitter  text-base ">{title}</p>
    </div>
  );
};
export default PostIcon;
