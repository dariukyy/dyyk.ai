import { Separator } from "../ui/separator";

function SeparatorBasedOnScreenSize() {
  return (
    <div>
      <Separator
        orientation="vertical"
        className="h-full hidden md:block w-[1px]"
      />
      <Separator
        orientation="horizontal"
        className="w-full md:hidden h-[1px]"
      />
    </div>
  );
}

export default SeparatorBasedOnScreenSize;
