/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import { ActiveRecord } from "@/model/activeRecord";
import { PlusIcon } from "@radix-ui/react-icons";

interface Props {
  data: any[];
  loading: boolean;
  error: any;
  model: ActiveRecord;
}

export default function TableComponent({ model, data, loading, error }: Props) {
  const navigate = useNavigate();

  useEffect(() => {}, [model, data]);

  const Loading = () => (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell className="flex items-center gap-4">
            <Skeleton className="h-8 w-16 rounded-md" />
          </TableCell>
          {model.attributes.map((attribute) => (
            <TableCell
              key={attribute.name}
              className={cn("whitespace-nowrap", attribute.type === "number" && "text-right")}>
              <Skeleton className="h-4 w-auto" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  const Error = () => <p>{error}</p>;

  const Rows = () => (
    <>
      {data?.map((item, i) => (
        <TableRow key={i}>
          <TableCell className="flex items-center gap-4">
            {model.tableActions
              .filter((action) => !["create", "delete"].includes(action.name))
              .map((action) => (
                <Button
                  size={"sm"}
                  key={action.name}
                  variant={"outline"}
                  onClick={() =>
                    action.link
                      ? navigate(action.link(item), { state: { item } })
                      : action.action!(item)
                  }>
                  {action.name}
                </Button>
              ))}

            {model.tableActions
              .filter((action) => action.name === "delete")
              .map((action, i) => (
                <AlertDialog key={i}>
                  <AlertDialogTrigger asChild>
                    <Button size={"sm"} key={action.name} variant={"outline"}>
                      {action.label}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => action.action!(item)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
          </TableCell>
          {model.attributes.map((attribute) => (
            <TableCell
              key={attribute.name}
              className={cn("whitespace-nowrap", attribute.type === "number" && "text-right")}>
              {attribute.getter ? attribute.getter(item) : item[attribute.name]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  const Headers = () => (
    <>
      <TableHead>Acciones</TableHead>
      {model.attributes.map((attribute, i) => (
        <TableHead key={i}>{attribute.label}</TableHead>
      ))}
    </>
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">{model.name}</h1>
        <Button
          className="ml-auto"
          onClick={() => navigate(model.getActionByName("create")!.link!())}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>
      <Table>
        <TableCaption>{model.name}</TableCaption>
        <TableHeader>
          <TableRow>
            <Headers />
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && <Loading />}
          {error && <Error />}
          {data && <Rows />}
        </TableBody>
      </Table>
    </>
  );
}
