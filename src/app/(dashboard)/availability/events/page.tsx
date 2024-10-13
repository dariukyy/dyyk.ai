import {
  onDeleteEventType,
  onGetAllUserEvents,
} from "@/actions/appointment/events";
import { CopyLinkMenuItem } from "@/components/events/CopyLinkMenuItem";
import EditEventModal from "@/components/events/EditEventModal";
import { EmptyState } from "@/components/events/EmptyState";
import { MenuActiveSwitcher } from "@/components/events/EventTypeSwitcher";
import NewEventModal from "@/components/events/NewEventModal";
import DeleteModalComponent from "@/components/modal/deleteModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { hexToRgba } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { ExternalLink, Pen, Settings, Users2 } from "lucide-react";
import Link from "next/link";

async function Events() {
  const user = await currentUser();

  const events = await onGetAllUserEvents(user?.id as string);

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="sm:grid gap-1 hidden">
          <h1 className="font-heading text-3xl md:text-4xl">Event Types</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your event types.
          </p>
        </div>

        <NewEventModal />
      </div>
      {events?.EventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below."
          buttonText="Add Event Type"
          href="/availability/events/new-event"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events?.EventType.map((item) => (
            <div
              className={`overflow-hidden bg-card shadow flex flex-col justify-between rounded-lg border-t-8 relative`}
              style={{
                borderColor: hexToRgba(item.themeColor, 0.7),
              }}
              key={item.id}
            >
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-20" align="end">
                    <DropdownMenuLabel>Event</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href={`/${events.fullname}/${item.url}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </Link>
                      </DropdownMenuItem>
                      <CopyLinkMenuItem
                        meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${events.fullname}/${item.url}`}
                      />
                      <DropdownMenuItem asChild>
                        <EditEventModal
                          themeColor={item.themeColor}
                          dropdown={true}
                          id={item.id}
                          title={item.title}
                          description={item.description}
                          duration={item.duration}
                          callProvider={item.videoCallSoftware!}
                          url={item.url}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <DeleteModalComponent
                        action={onDeleteEventType}
                        value={item.id}
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium truncate ">
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd>
                        <div className="text-lg font-medium">{item.title}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-muted px-5 py-3 flex justify-between items-center">
                <MenuActiveSwitcher
                  initialChecked={item.active}
                  eventTypeId={item.id}
                />
                <EditEventModal
                  themeColor={item.themeColor}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  duration={item.duration}
                  callProvider={item.videoCallSoftware!}
                  url={item.url}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Events;
