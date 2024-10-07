// import { SubmitButton } from "@/app/components/SubmitButton";
// import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// import { updateAvailabilityAction } from "@/app/actions";
import {
  onGetUserAvailability,
  onUpdateUserAvalability,
} from "@/actions/availability";
import { SubmitButton } from "@/components/submit-button";
import { times } from "@/constants/times";
import { currentUser } from "@clerk/nextjs";

const AvailabilityPage = async () => {
  const user = await currentUser();
  const availability = await onGetUserAvailability(user?.id as string);

  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this section you can manage your availability.
        </CardDescription>
      </CardHeader>
      <form action={onUpdateUserAvalability}>
        <CardContent className="flex flex-col gap-y-3">
          {availability!.map((item, index) => (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 px-4 py-4 rounded-md md:grid-cols-3 items-center gap-4 ${
                index % 2 === 0 ? "bg-gray-50" : ""
              }`}
              key={item.id}
            >
              <input type="hidden" name={`id-${item.id}`} value={item.id} />
              <div className="flex items-center gap-x-3">
                <Switch
                  name={`isActive-${item.id}`}
                  defaultChecked={item.isActive}
                />
                <p>{item.day}</p>
              </div>
              <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="To Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <SubmitButton
            className="px-6 py-2 mt-3 rounded-lg"
            text="Save Changes"
          />
        </CardFooter>
      </form>
    </Card>
  );
};

export default AvailabilityPage;
