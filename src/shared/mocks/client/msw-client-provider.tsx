import { PropsWithChildren, useEffect, useState } from "react";
import { mockClient } from "./mock-client";

const MswClientProvider = ({ children }: PropsWithChildren) => {
  const [isMswEnable, setIsMswEnable] = useState(false);

  useEffect(() => {
    const init = async () => {
      await mockClient();
      setIsMswEnable(true);
    };

    if (!isMswEnable) {
      init();
    }
  }, [isMswEnable]);

  return isMswEnable ? children : null;
};

export default MswClientProvider;
