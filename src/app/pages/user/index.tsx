/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserModel } from "@/app/models/user";
import TableComponent from "@/components/TableComponent";

export default function IndexUserPage() {
  const model = new UserModel();
  const { data, loading, error } = model.useAxios({ model });

  return (
    <div className="container flex flex-col gap-4 mx-auto py-4">
      <TableComponent {...{ model, data, loading, error }} />
    </div>
  );
}
