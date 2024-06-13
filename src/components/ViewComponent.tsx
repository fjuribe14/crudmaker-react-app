/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActiveRecord } from "@/model/activeRecord";
import { Label } from "./ui/label";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface Props {
  id: any;
  model: ActiveRecord;
}

export default function ViewComponent({ id, model }: Props) {
  model.params = { id };

  const { data, loading, error } = model.useAxios({ model });

  const Loading = () => (
    <div className="grid gap-4">
      <Skeleton className="h-4 w-16 rounded-md"></Skeleton>
      <Skeleton className="h-4 w-full rounded-md"></Skeleton>
      <Skeleton className="h-4 w-full rounded-md"></Skeleton>
    </div>
  );

  return (
    <div className="container flex flex-col gap-8 mx-auto py-4">
      <div className=" flex items-center gap-4">
        <Button variant={"default"} size={"icon"}>
          <ArrowLeftIcon className="w-6 h-6" onClick={() => window.history.back()} />
        </Button>

        <h1 className="text-2xl  font-semibold">
          View {data[0] && `#${data[0][model.primaryKey]}`}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {model.attributes.map((attribute) => (
          <div key={attribute.name} className="lg:col-span-6">
            {loading && <Loading />}
            {error && <p>{error}</p>}
            {data[0] && (
              <>
                <Label>{attribute.label}</Label>
                <p className="text-lg font-medium text-gray-900">
                  {attribute.getter ? attribute.getter(data[0]) : data[0][attribute.name]}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
