import {VariantProps} from "class-variance-authority";

import {cn} from "@/shared/lib/tw-merge/utils";

import {textVariants} from "./text.styles";

type TextVariants = VariantProps<typeof textVariants>;

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, TextVariants {}

export const Text: React.FC<TextProps> = ({children, variant, color, className, ...props}) => {
  return (
    <p className={cn(textVariants({variant}), color && `text-${color}`, className)} {...props}>
      {children}
    </p>
  );
};
