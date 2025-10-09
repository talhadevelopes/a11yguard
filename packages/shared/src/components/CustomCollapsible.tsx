import React, { useState } from "react";

interface CustomCollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const CustomCollapsible: React.FC<CustomCollapsibleProps> = ({
  open: controlledOpen,
  onOpenChange,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(controlledOpen ?? false);

  const handleToggle = () => {
    const newOpen = controlledOpen !== undefined ? !controlledOpen : !isOpen;
    console.log(`CustomCollapsible: handleToggle, newOpen=${newOpen}`);
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  return (
    <div className={`custom-collapsible ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen: controlledOpen !== undefined ? controlledOpen : isOpen,
            onToggle: handleToggle,
          } as any);
        }
        return child;
      })}
    </div>
  );
};

interface CustomCollapsibleTriggerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  asChild?: boolean;
}

export const CustomCollapsibleTrigger: React.FC<CustomCollapsibleTriggerProps> = ({
  children,
  isOpen,
  onToggle,
  className,
  asChild,
}) => {
  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<any>;
    return React.cloneElement(childElement, {
      onClick: onToggle,
      "aria-expanded": isOpen,
      className: `${childElement.props.className || ""} ${className || ""}`,
    });
  }

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={onToggle}
      className={`flex items-center ${className || ""}`}
    >
      {children}
    </button>
  );
};

interface CustomCollapsibleContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}

export const CustomCollapsibleContent: React.FC<CustomCollapsibleContentProps> = ({
  children,
  isOpen,
  className,
}) => {
  if (!isOpen) return null;
  return (
    <div className={`custom-collapsible-content ${className || ""}`} role="region">
      {children}
    </div>
  );
};