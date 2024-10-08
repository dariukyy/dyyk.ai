"use client";

import { Pen } from "lucide-react";
import Modal from "../modal";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { EditEventComponent } from "./EditEventComponent";

type EditEventModalProps = {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
  dropdown?: boolean;
};

function EditEventModal({
  id,
  title,
  url,
  description,
  duration,
  callProvider,
  dropdown,
}: EditEventModalProps) {
  return (
    <Modal
      title={`Edit "${title}" Appointment Type`}
      description="Modify the details of your appointment type to ensure it meets your scheduling needs!"
      trigger={
        dropdown ? (
          <Button className="w-full" variant="ghost">
            <Pen className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </Button>
        ) : (
          <Button>Edit Event</Button>
        )
      }
    >
      <EditEventComponent
        id={id}
        title={title}
        url={url}
        description={description}
        duration={duration}
        callProvider={callProvider}
      />
    </Modal>
  );
}

export default EditEventModal;
