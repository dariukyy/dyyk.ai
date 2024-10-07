import {
  onChatBotImageUpdate,
  onCreateFilterQuestions,
  onCreateHelpDeskQuestion,
  onCreateNewDomainProduct,
  onDeleteHelDeskQuestion,
  onDeleteUserDomain,
  onGetAllFilterQuestions,
  onGetAllHelpDeskQuestions,
  onUpdateDomain,
  onUpdateHelpDeskQuestion,
  onUpdatePassword,
  onUpdateWelcomeMessage,
} from "@/actions/settings";
import toast from "react-hot-toast";
import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth.scema";
import {
  AddProductProps,
  AddProductSchema,
  DomainSettingsProps,
  DomainSettingsSchema,
  FilterQuestionsProps,
  FilterQuestionsSchema,
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadClient } from "@uploadcare/upload-client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

export const useThemeMode = () => {
  const { setTheme, theme } = useTheme();

  return { theme, setTheme };
};

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdatePassword(values.password);
      if (updated) {
        reset();
        setLoading(false);
        toast.success(updated.message);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onChangePassword,
    loading,
  };
};

export const useSettings = (id: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onUpdateSettings = handleSubmit(async (values) => {
    setLoading(true);
    if (values.domain) {
      const domain = await onUpdateDomain(id, values.domain);
      if (domain) {
        toast.success(domain.message);
      }
    }
    if (values.image[0]) {
      const uploaded = await upload.uploadFile(values.image[0]);
      const image = await onChatBotImageUpdate(id, uploaded.uuid);
      if (image) {
        image.status == 200
          ? toast.success(image.message)
          : toast.error(image.message);

        setLoading(false);
      }
    }
    if (values.welcomeMessage) {
      const message = await onUpdateWelcomeMessage(values.welcomeMessage, id);
      if (message) {
        toast.success(message.message);
      }
    }
    reset();
    router.refresh();
    setLoading(false);
  });

  const onDeleteDomain = async () => {
    setDeleting(true);
    const deleted = await onDeleteUserDomain(id);
    if (deleted) {
      toast.success(deleted.message);
    }
    setDeleting(false);
    router.refresh();
  };

  return {
    register,
    onUpdateSettings,
    errors,
    onDeleteDomain,
    deleting,
    loading,
  };
};

export const useHelpDesk = (id: string) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema),
  });
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestions, setIsQuestions] = useState<
    { id: string; question: string; answer: string }[]
  >([]);

  const onSubmitQuestion = handleSubmit(async (values) => {
    setLoading(true);
    const question = await onCreateHelpDeskQuestion(
      id,
      values.question,
      values.answer
    );
    if (question) {
      setIsQuestions(question.questions!);
      question.status == 200
        ? toast.success(question.message)
        : toast.error(question.message);

      setLoading(false);
      reset();
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const questions = await onGetAllHelpDeskQuestions(id);
    if (questions) {
      setIsQuestions(questions.questions);

      setLoading(false);
    }
  };

  const onUpdateQuestion = async (
    id: string,
    question: string,
    answer: string
  ) => {
    setLoading(true);
    const updatedQuestion = await onUpdateHelpDeskQuestion(
      id,
      question,
      answer
    );
    if (updatedQuestion) {
      setIsQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === id
            ? {
                ...q,
                question: updatedQuestion.question,
                answer: updatedQuestion.answer,
              }
            : q
        )
      );

      updatedQuestion.status == 200
        ? toast.success(updatedQuestion.message)
        : toast.error(updatedQuestion.message);
    }
    setLoading(false);
  };

  const deleteQuestion = async (id: string, questionId: string) => {
    setLoading(true);
    const deletedQuestion = await onDeleteHelDeskQuestion(id, questionId);

    if (deletedQuestion) {
      setIsQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionId)
      );

      toast.success(deletedQuestion.message);

      router.refresh();
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    register,
    onSubmitQuestion,
    errors,
    isQuestions,
    loading,
    deleteQuestion,
    onUpdateQuestion,
  };
};
export const useFilterQuestions = (id: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FilterQuestionsProps>({
    resolver: zodResolver(FilterQuestionsSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestions, setIsQuestions] = useState<
    { id: string; question: string }[]
  >([]);

  const onAddFilterQuestions = handleSubmit(async (values) => {
    setLoading(true);
    const questions = await onCreateFilterQuestions(id, values.question);
    if (questions) {
      setIsQuestions(questions.questions!);
      questions.status == 200
        ? toast.success(questions.message)
        : toast.error(questions.message);

      reset();
      setLoading(false);
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const questions = await onGetAllFilterQuestions(id);
    if (questions) {
      setIsQuestions(questions.questions);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    loading,
    onAddFilterQuestions,
    register,
    errors,
    isQuestions,
  };
};

export const useProducts = (domainId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<AddProductProps>({
    resolver: zodResolver(AddProductSchema),
  });

  const onCreateNewProduct = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const uploaded = await upload.uploadFile(values.image[0]);
      const product = await onCreateNewDomainProduct(
        domainId,
        values.name,
        uploaded.uuid,
        values.price
      );
      if (product) {
        reset();
        toast.success(product.message);

        setLoading(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return { onCreateNewProduct, register, errors, loading };
};
