import {cva} from "class-variance-authority";

const commonClassnames = ["font-primary"];

export const textVariants = cva(commonClassnames, {
  variants: {
    variant: {
      "body.1": "leading-6.4 lg:leading-6.4 text-3.5 lg:text-4",
      "body.2": "text-4 lg:text-4 leading-6 font-bold uppercase lg:leading-6",
      "body.3": "text-3.5 lg:text-3.5 leading-5.5 lg:leading-5.5",
    },
  },
  defaultVariants: {
    variant: "body.1",
  },
});
