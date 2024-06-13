/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodType } from "zod";

export type Attribute = {
  name: string;
  label: string;
  type: Type;
  creatable?: boolean;
  listable?: boolean;
  getter?: CallableFunction;
  class?: string;
  value?: any;
  input?: Input;
};

export type Input = {
  name: string;
  label: string;
  value?: any;
  type: Type;
  placeholder?: string;
  description?: string;
  class?: string;
  disabled?: boolean;
  readonly?: boolean;
  change?: CallableFunction;
  validation?: ZodType;
};

export type Type = "string" | "number" | "boolean" | "array" | "object";

export type TableAction = {
  name: string;
  label: string;
  icon: string;
  link?: CallableFunction | null;
  action?: CallableFunction | null;
};
