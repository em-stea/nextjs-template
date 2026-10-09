import {cva} from "class-variance-authority";

const commonClassnames = ["font-primary"];

export const headingVariants = cva(commonClassnames, {
  variants: {
    variant: {
      "title.0": "text-24 lg:text-36 leading-20 font-bold lg:leading-30",
      "title.1": "text-8 lg:text-16 leading-10 font-semibold lg:leading-20",
      "title.1-bold": "text-10 lg:text-12 leading-12 font-bold lg:leading-14",
      "title.2": "text-8 lg:text-8 leading-10 font-bold lg:leading-10",
      "title.3": "text-5 lg:text-5 leading-7 lg:leading-7",
      "title.4": "lg:text-3-5 text-3.5 leading-5 font-bold lg:leading-5",
      "title.5": "text-4 lg:text-4 leading-6 font-medium lg:leading-6",
    },
  },
  defaultVariants: {
    variant: "title.1",
  },
});
