declare module '@radix-ui/react-tabs' {
  import * as React from 'react';
  
  type TabsProps = {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    dir?: 'ltr' | 'rtl';
    activationMode?: 'automatic' | 'manual';
    children?: React.ReactNode;
  };
  
  type TabsListProps = React.ComponentPropsWithoutRef<'div'>;
  
  type TabsTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    value: string;
  };
  
  type TabsContentProps = React.ComponentPropsWithoutRef<'div'> & {
    value: string;
  };
  
  const Root: React.FC<TabsProps>;
  const List: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
  const Trigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  const Content: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;
  
  export {
    Root,
    List,
    Trigger,
    Content
  };
}

declare module '@radix-ui/react-tooltip' {
  import * as React from 'react';
  
  type TooltipProviderProps = {
    delayDuration?: number;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
    children?: React.ReactNode;
  };
  
  type TooltipProps = {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    delayDuration?: number;
    disableHoverableContent?: boolean;
    children?: React.ReactNode;
  };
  
  type TooltipTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
  };
  
  type TooltipContentProps = React.ComponentPropsWithoutRef<'div'> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    arrowPadding?: number;
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>;
    sticky?: 'partial' | 'always';
    hideWhenDetached?: boolean;
    avoidCollisions?: boolean;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
    forceMount?: boolean;
  };
  
  type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;
  
  const Provider: React.FC<TooltipProviderProps>;
  const Root: React.FC<TooltipProps>;
  const Trigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
  const Content: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;
  
  export {
    Provider,
    Root,
    Trigger,
    Content
  };
} 