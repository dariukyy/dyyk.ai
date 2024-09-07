"use client";

import Accordion from "@/components/accordian";
import { Loader } from "@/components/loader";
import Section from "@/components/section-label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useHelpDesk } from "@/hooks/settings/use-settings";
import FormGenerator from "../form-generator";
import { useState } from "react";
import Modal from "@/components/modal";

function HelpDesk({ id }: { id: string }) {
  const [openEditModal, setIsOpenEditModal] = useState(false);
  const {
    register,
    onSubmitQuestion,
    onUpdateQuestion,
    errors,
    isQuestions,
    loading,
    deleteQuestion,
  } = useHelpDesk(id);

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[-1px]">
        <CardTitle>Help Desk</CardTitle>
        <form className="flex flex-col gap-6 mt-10" onSubmit={onSubmitQuestion}>
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Add a question that you believe is frequently asked by your users."
            />
            <FormGenerator
              inputType="input"
              register={register}
              errors={errors}
              name="question"
              type="text"
              placeholder="Type your question"
              form="help-desk-form"
            />
          </div>
          <div className="flex flex-col gap-3">
            <FormGenerator
              inputType="textarea"
              lines={5}
              register={register}
              name="answer"
              errors={errors}
              form="help-desk-form"
              type="text"
              placeholder="Type your answer"
            />
          </div>
          <Button className="bg-orange hover:bg-orange/70 transition duration-150 ease-in-out text-white font-semibold">
            Create Question
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question) => (
              <Accordion
                onUpdateQuestion={onUpdateQuestion}
                setIsOpenEditModal={setIsOpenEditModal}
                deleteQuestion={() => deleteQuestion(id, question.id)}
                key={question.id}
                trigger={question.question}
                content={question.answer}
                id={question.id}
              />
            ))
          ) : (
            <CardDescription>No Questions to show</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  );
}

export default HelpDesk;
