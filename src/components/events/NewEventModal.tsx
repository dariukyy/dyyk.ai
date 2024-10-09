"use client";

import NewEventComponent from "@/components/events/NewEventComponent";
import Modal from "../modal";
import { Button } from "../ui/button";

function NewEventModal() {
  return (
    <div>
      <Modal
        title="Add new appointment type"
        description="Create new appointment type that allows people to book you!"
        trigger={<Button>Create New Event</Button>}
      >
        <NewEventComponent />
      </Modal>
    </div>
  );
}

export default NewEventModal;
