declare module "*.svg" {
  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  // export default content;
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.css" {
  const content: any;
  export default content;
}
