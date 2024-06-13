/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { Attribute } from "../../types";
import { ActiveRecord } from "../../model/activeRecord";

export class UserModel extends ActiveRecord {
  public name: string = "Users";
  public endpointRest = "users";
  public primaryKey: string = "id";

  public attributes: Attribute[] = [
    {
      name: "id",
      label: "ID",
      type: "string",
    },
    {
      name: "name",
      label: "Name",
      type: "string",
      input: {
        label: "Name",
        name: "name",
        type: "string",
        description: "Here is a description",
        validation: z.string().default(""),
      },
    },
    {
      name: "username",
      label: "Username",
      type: "string",
      input: {
        label: "Username",
        name: "username",
        type: "string",
        description: "Here is a description",
        validation: z.string().default(""),
      },
    },
    {
      name: "email",
      label: "Email",
      type: "string",
      input: {
        name: "email",
        label: "Email",
        type: "string",
        description: "Here is a description",
        validation: z.string().email().default(""),
      },
    },
    {
      name: "phone",
      label: "Phone",
      type: "string",
    },
    {
      name: "city",
      label: "City",
      type: "string",
      getter: (user: UserResponse) => user.address?.city,
    },
  ];
}

export type UserResponse = {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
};

export type Address = {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: Geo;
};

export type Geo = {
  lat?: string;
  lng?: string;
};

export type Company = {
  name?: string;
  catchPhrase?: string;
  bs?: string;
};
