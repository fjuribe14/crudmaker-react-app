/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { ActiveRecord } from "@/model/activeRecord";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  id?: any;
  model: ActiveRecord;
}

export default function FormComponent({ id, model }: Props) {
  const formSchema = z.object(model.formInputsValidations);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: model.formValues,
  });

  useEffect(() => {
    if (id) {
      return () => {
        model.findById({
          id,
          _then: () => {
            Object.entries(model.formValues).forEach(([key, value]) => form.setValue(key, value));
          },
        });
      };
    }
  }, [form, id, model]);

  const onSubmit = (data: any) => {
    if (id) {
      data[model.primaryKey] = id;
      return model.update({ item: data });
    }

    return model.create({ item: data });
  };

  return (
    <div className="container grid gap-4 mx-auto py-8">
      <h2 className="text-2xl font-semibold">Form</h2>

      {Object.keys(model.formValues).length > 0 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {model.formInputs.map((input, i) => (
              <FormField
                key={i}
                control={form.control}
                name={`${input?.name}`}
                disabled={input?.disabled}
                render={({ field }) => (
                  <FormItem className={input?.class || "col-span-6"}>
                    <FormLabel>{input?.label}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={input?.placeholder}
                        onChange={(e) => {
                          field.onChange(e);
                          input?.change && input.change(e.target.value);
                        }}
                      />
                    </FormControl>
                    {input?.description && <FormDescription>{input?.description}</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="col-span-full">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
