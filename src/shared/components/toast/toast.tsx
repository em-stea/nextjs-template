"use client";

import * as React from "react";
import {Toast as ToastPrimitive} from "@base-ui/react/toast";
import {
  XIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

import {Button} from "@/shared/components/button/button";
import {cn} from "@/shared/lib/tw-merge/utils";
import {
  toastActionVariants,
  toastCloseVariants,
  toastContentVariants,
  toastDescriptionVariants,
  toastIconVariants,
  toastTitleVariants,
  toastVariants,
  toastViewportVariants,
} from "./toast.styles";

const toast = ToastPrimitive.createToastManager();

function ToastProvider({...props}: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({...props}: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

function ToastViewport({className, ...props}: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      className={cn(toastViewportVariants(), className)}
      data-slot="toast-viewport"
      {...props}
    />
  );
}

function Toast({className, ...props}: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root className={cn(toastVariants(), className)} data-slot="toast" {...props} />
  );
}

function ToastContent({className, ...props}: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      className={cn(toastContentVariants(), className)}
      data-slot="toast-content"
      {...props}
    />
  );
}

function ToastTitle({className, ...props}: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      className={cn(toastTitleVariants(), className)}
      data-slot="toast-title"
      {...props}
    />
  );
}

function ToastDescription({className, ...props}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      className={cn(toastDescriptionVariants(), className)}
      data-slot="toast-description"
      {...props}
    />
  );
}

function ToastAction({
  className,
  render = <Button size="sm" variant="ghost-outline" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      className={cn(toastActionVariants(), className)}
      data-slot="toast-action"
      render={render}
      {...props}
    />
  );
}

function ToastClose({
  className,
  children,
  render = <Button size="xs" variant="ghost" />,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      aria-label="Close toast"
      className={cn(toastCloseVariants(), className)}
      data-slot="toast-close"
      render={render}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" className="size-4 text-gray-800" />}
    </ToastPrimitive.Close>
  );
}

function ToastIcon({type}: {type: string | undefined}) {
  let icon: React.ReactNode = null;

  if (type === "success") {
    icon = <CircleCheckIcon aria-hidden="true" className="size-5 text-green-700" />;
  }

  if (type === "info") {
    icon = <InfoIcon aria-hidden="true" />;
  }

  if (type === "warning") {
    icon = <TriangleAlertIcon aria-hidden="true" />;
  }

  if (type === "error") {
    icon = <OctagonXIcon aria-hidden="true" className="text-destructive" />;
  }

  if (type === "loading") {
    icon = <Loader2Icon aria-hidden="true" className="animate-spin" />;
  }

  if (!icon) {
    return null;
  }

  return (
    <span className={toastIconVariants()} data-slot="toast-icon">
      {icon}
    </span>
  );
}

function ToastList() {
  const {toasts} = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ));
}

function Toaster({children, toastManager = toast, ...props}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
};
