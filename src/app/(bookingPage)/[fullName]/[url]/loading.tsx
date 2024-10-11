import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-start md:flex md:justify-center md:items-center gap-5 p-8">
      <Skeleton className="w-[5rem] h-[5rem] rounded-full" />
      <Skeleton className="w-1/2 h-[3rem] md:h-8" />
      <Skeleton className="w-full h-[4rem] md:h-8" />
      <Skeleton className="w-full h-[16rem] md:w-full" />
    </div>
  );
}

export default Loading;
