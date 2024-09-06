"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

type Props = {
  id: string;
  helpDeskQuestion: string;
  helpDeskAnswer: string;
  onUpdateQuestion: (id: string, question: string, answer: string) => void;
};

function EditHelpDeskQuestion({
  id,
  helpDeskQuestion,
  helpDeskAnswer,
  onUpdateQuestion,
}: Props) {
  const [question, setQuestion] = useState(helpDeskQuestion);
  const [answer, setAnswer] = useState(helpDeskAnswer);
  console.log(id, question, answer);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onUpdateQuestion(id, question, answer);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Label htmlFor="answer">Answer</Label>
        <Input
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <Button
          className="bg-orange hover:bg-orange/70 transition duration-150 ease-in-out text-white font-semibold"
          type="submit"
          disabled={helpDeskQuestion === question && helpDeskAnswer === answer}
        >
          Edit
        </Button>
      </form>
    </div>
  );
}

export default EditHelpDeskQuestion;
