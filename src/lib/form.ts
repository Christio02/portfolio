import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextArea from "@/ui/TextArea";
import TextField from "@/ui/TextField";
export const { fieldContext, formContext, useFieldContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: { TextField, TextArea },
	formComponents: {},
});
