import {type ClassValue, clsx} from "clsx";
import {extendTailwindMerge} from "tailwind-merge";

import generatedConfig from "./generated-config.json";

const twMerge = extendTailwindMerge({
  extend: {
    theme: generatedConfig,
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
