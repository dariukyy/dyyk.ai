import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from "@/components/ui/accordion";
import { useHelpDesk } from "@/hooks/settings/use-settings";
import { CircleX, EditIcon } from "lucide-react";
import Modal from "../modal";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { FieldValues, UseFormRegister } from "react-hook-form";
import EditHelpDeskQuestion from "../forms/settings/edit-help-desk-question";

type Props = {
  id: string;
  trigger: string;
  content: string;
  deleteQuestion: () => void;
  setIsOpenEditModal: (value: boolean) => void;
  onUpdateQuestion: (id: string, question: string, answer: string) => void;
};

const Accordion = ({
  id,
  content,
  trigger,
  deleteQuestion,
  setIsOpenEditModal,

  onUpdateQuestion,
}: Props) => {
  return (
    <div className="flex gap-2 justify-between items-center">
      <ShadcnAccordion className="flex-1" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      </ShadcnAccordion>
      <div className="flex gap-2 items-center justify-center">
        <Modal
          title="Edit question"
          description=" "
          trigger={
            <EditIcon
              onClick={() => setIsOpenEditModal(true)}
              className="w-6 h-6 text-blue-500 cursor-pointer"
            />
          }
        >
          <EditHelpDeskQuestion
            id={id}
            helpDeskQuestion={trigger}
            helpDeskAnswer={content}
            onUpdateQuestion={onUpdateQuestion}
          />
        </Modal>

        <Modal
          title={`Delete question: ${trigger}`}
          description="Are you sure you want to delete this permanently? This action cannot be undone."
          trigger={<CircleX className="w-6 h-6 text-red-500 cursor-pointer" />}
        >
          <div className="flex gap-3 justify-end items-center">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={deleteQuestion} variant="destructive">
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Accordion;
