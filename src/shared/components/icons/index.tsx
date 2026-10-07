import {ArrowRight} from "./directional/arrow-right";
import {ChevronLeft} from "./directional/chevron-left";
import {ChevronRight} from "./directional/chevron-right";

export {ArrowRight} from "./directional/arrow-right";

export {ChevronLeft} from "./directional/chevron-left";

export {ChevronRight} from "./directional/chevron-right";

const IconsType = {
  directional: {
    arrowRight: ArrowRight,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
  },
};

interface IconsProps {
  className?: string;
}

export const Icons = ({className}: IconsProps) => {
  return (
    <>
      {Object.entries(IconsType).map(([category, icons]) => (
        <div key={category} className="my-8 flex flex-col gap-2">
          <h3 className="border-b border-black/20 text-base font-medium tracking-wider uppercase">
            {category}
          </h3>
          <div className="flex flex-row gap-4 align-middle">
            {Object.entries(icons).map(([name, Icon]) => (
              <Icon key={name} className={className} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
