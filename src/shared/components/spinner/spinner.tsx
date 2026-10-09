import type {ComponentProps} from "react";

import {Loader2Icon} from "lucide-react";

import {cn} from "@/shared/lib/tw-merge/utils";

export function Spinner({className, ...props}: ComponentProps<"svg">) {
  return (
    <Loader2Icon
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      data-slot="spinner"
      role="status"
      {...props}
    />
  );
}
