

import { createContext } from "react";

const authContext = createContext({
  showCamera: false,
  setShowCamera: (show:boolean) => {}
});

export default authContext;