"use client";

import type {VariantProps} from "class-variance-authority";
import type {ComponentProps} from "react";

import {Slot} from "@radix-ui/react-slot";

import {Spinner} from "@/shared/components/spinner/spinner";
import {cn} from "@/shared/lib/utils";
import {buttonVariants} from "@/shared/styles/components/button";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = ComponentProps<"button"> &
  ButtonVariants & {
    asChild?: boolean;
  };

export function Button({
  children,
  className,
  variant,
  size,
  disabled,
  loading,
  active,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      aria-busy={loading ?? undefined}
      className={cn(buttonVariants({variant, size, loading, active}), className)}
      disabled={loading ? true : disabled}
      {...props}
    >
      {loading ? <Spinner className="size-5" /> : children}
    </Comp>
  );
}
