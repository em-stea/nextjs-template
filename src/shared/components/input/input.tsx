import * as React from "react";
import {Input as InputPrimitive} from "@base-ui/react/input";

import {cn} from "@/shared/lib/utils";
import {inputVariants} from "@/shared/styles/components/input";

function Input({className, type, ...props}: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      className={cn(inputVariants(), className)}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export {Input};
