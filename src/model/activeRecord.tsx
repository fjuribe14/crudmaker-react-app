/* eslint-disable @typescript-eslint/no-explicit-any */
import useAxios from "@/hooks/useAxios";
import { Attribute, Input, TableAction } from "../types";
import axios, { AxiosHeaders, Method } from "axios";
import { toast } from "sonner";

export class ActiveRecord {
  /** General */
  public name: string = "";
  public description: string = "";

  /** Settings API REST */
  public endpointRest: string = "";
  public endpointRestType: "API" | "AUTH" = "API";
  public loading: boolean = false;
  public method: Method = "GET";
  public params: any = {};
  public headers: AxiosHeaders = new AxiosHeaders();

  /** Attributes */
  public items: any[] = [];
  public primaryKey: string = "id";
  public attributes: Attribute[] = [];
  public tableActions: TableAction[] = [
    {
      name: "create",
      label: "Create",
      icon: "plus",
      link: () => `/${this.name.toLocaleLowerCase()}/create`,
      action: null,
    },
    {
      name: "view",
      label: "View",
      icon: "eye",
      link: (item: any) => `/${this.name.toLocaleLowerCase()}/view/${item[this.primaryKey]}`,
      action: null,
    },
    {
      name: "edit",
      label: "Edit",
      icon: "edit",
      link: (item: any) => `/${this.name.toLocaleLowerCase()}/edit/${item[this.primaryKey]}`,
      action: null,
    },
    {
      name: "delete",
      label: "Delete",
      icon: "delete",
      action: (item: any) => {
        this.delete({ item });
      },
    },
  ];

  /** Contructor */
  constructor() {
    this.baseEndpointRest = this.endpointRestType;
  }

  /** Getters */
  get useAxios() {
    return useAxios;
  }

  get formValues() {
    const values: any = {};

    for (const attr of this.attributes) {
      attr.input && (values[attr.input.name] = attr.input.value);
    }

    return values;
  }

  get formInputs(): (Input | undefined)[] {
    return this.attributes
      .filter((attribute) => attribute.input)
      .map((attribute) => attribute.input);
  }

  get formInputsValidations(): any {
    const values: any = {};

    for (const attr of this.attributes) {
      attr.input && (values[attr.input.name] = attr.input.validation);
    }

    return values;
  }

  /** Setters */
  set baseEndpointRest(endpointRestType: string) {
    switch (endpointRestType) {
      case "API":
        axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
        break;

      default:
        axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
        break;
    }
  }

  set formValues(values: any) {
    for (const attr of this.attributes) {
      attr.input && (attr.input.value = values[attr.input.name]);
    }
  }

  /** Methods */
  getActionByName(name: string) {
    return this.tableActions.find((item) => item.name === name);
  }

  findById({
    id,
    _then,
    _catch,
    _finally,
  }: {
    id: any;
    _then?: CallableFunction;
    _catch?: CallableFunction;
    _finally?: CallableFunction;
  }) {
    axios
      .get(`${this.endpointRest}/${id}`)
      .then((res) => {
        this.formValues = res.data;
        _then && _then(res.data);
      })
      .catch((err) => {
        _catch && _catch(err);
        toast("Something went wrong.", { closeButton: true, icon: "❌" });
      })
      .finally(() => _finally && _finally());
  }

  create({
    item,
    _then,
    _catch,
    _finally,
  }: {
    item: any;
    _then?: CallableFunction;
    _catch?: CallableFunction;
    _finally?: CallableFunction;
  }) {
    axios
      .post(`${this.endpointRest}`, item)
      .then((res) => {
        _then && _then(res.data);
        toast("Has been created successfully.", { closeButton: true, icon: "✅" });
        window.history.back();
      })
      .catch((err) => {
        _catch && _catch(err);
        toast("Something went wrong.", { closeButton: true, icon: "❌" });
      })
      .finally(() => _finally && _finally());
  }

  update({
    item,
    _then,
    _catch,
    _finally,
  }: {
    item: any;
    _then?: CallableFunction;
    _catch?: CallableFunction;
    _finally?: CallableFunction;
  }) {
    axios
      .put(`${this.endpointRest}/${item[this.primaryKey]}`, item)
      .then((res) => {
        _then && _then(res.data);
        toast(`#${item[this.primaryKey]} has been updated successfully.`, {
          closeButton: true,
          icon: "✅",
        });

        window.history.back();
      })
      .catch((err) => {
        _catch && _catch(err);
        toast("Something went wrong.", { closeButton: true, icon: "❌" });
      })
      .finally(() => _finally && _finally());
  }

  delete({
    item,
    _then,
    _catch,
    _finally,
  }: {
    item: any;
    _then?: CallableFunction;
    _catch?: CallableFunction;
    _finally?: CallableFunction;
  }) {
    axios
      .delete(`${this.endpointRest}/${item[this.primaryKey]}`)
      .then((res) => {
        _then && _then(res.data);
        toast(`#${item[this.primaryKey]} has been deleted successfully.`, {
          closeButton: true,
          icon: "✅",
        });
      })
      .catch((err) => {
        _catch && _catch(err);
        toast("Something went wrong.", { closeButton: true, icon: "❌" });
      })
      .finally(() => _finally && _finally());
  }
}
