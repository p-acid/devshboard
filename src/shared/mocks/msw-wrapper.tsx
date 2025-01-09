import { PropsWithChildren, useEffect, useState } from "react";
import { mockBrowser } from "./mock-browser";

type MswWrapperProps = PropsWithChildren;

const MswWrapper = ({ children }: MswWrapperProps) => {
  const [isMswEnable, setIsMswEnable] = useState(false);

  useEffect(() => {
    const init = async () => {
      await mockBrowser();
      setIsMswEnable(true);
    };

    if (!isMswEnable) {
      init();
    }
  }, [isMswEnable]);

  return isMswEnable ? children : null;
};

export default MswWrapper;
