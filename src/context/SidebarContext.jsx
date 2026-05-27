import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};
