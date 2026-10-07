"use client";

import {Controller, useForm} from "react-hook-form";
import {standardSchemaResolver} from "@hookform/resolvers/standard-schema";
import {z} from "zod";

import {Input} from "@/shared/components/input/input";
import {toast} from "@/shared/components/toast/toast";

import {Button} from "../button/button";
import {Field, FieldError, FieldGroup, FieldLabel} from "../field/field";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name title must be at most 32 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export function Form({label, placeholder}: {label: string; placeholder: string}) {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    toast.add({
      type: "success",
      title: "You submitted",
      //   timeout: 1000,
    });
  }

  return (
    <>
      <form
        id="form-rhf-demo"
        onSubmit={(event) => {
          void form.handleSubmit(onSubmit)(event);
        }}
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="title"
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>{label}</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="form-rhf-input-title"
                  placeholder={placeholder}
                  type="text"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button className="mt-4" form="form-rhf-demo" type="submit">
        Submit
      </Button>
    </>
  );
}
