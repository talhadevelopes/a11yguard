import React, { useState } from "react";

interface TabsProps {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

export function CustomTabs({ defaultValue = "", children, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`flex flex-col ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function CustomTabsList({ children, className = "" }: TabsListProps) {
  return (
    <div className={`flex items-center gap-1 p-1 bg-muted rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export function CustomTabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
        context.activeTab === value
          ? "bg-background text-foreground shadow"
          : "text-muted-foreground hover:text-foreground"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function CustomTabsContent({ value, children, className = "" }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }

  return context.activeTab === value ? (
    <div className={`mt-2 ${className}`}>
      {children}
    </div>
  ) : null;
}