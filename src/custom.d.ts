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

declare module "@heroicons/react/*" {
  import type { DefineComponent } from "react";
  export const BellIcon: DefineComponent<{}, {}, any>;
  export const HashtagIcon: DefineComponent<{}, {}, any>;
  export const BookmarkIcon: DefineComponent<{}, {}, any>;
  export const EnvelopeIcon: DefineComponent<{}, {}, any>;
  export const UserIcon: DefineComponent<{}, {}, any>;
  export const HomeIcon: DefineComponent<{}, {}, any>;
  export const EllipsisHorizontalIcon: DefineComponent<{}, {}, any>;
  export const ClipboardDocumentCheckIcon: DefineComponent<{}, {}, any>;
  export const ArrowLeftOnRectangleIcon: DefineComponent<{}, {}, any>;
}
