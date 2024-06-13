import { UserModel } from "@/app/models/user";
import { useParams } from "react-router-dom";
import FormComponent from "@/components/FormComponent";

export default function UserEditPage() {
  const model = new UserModel();
  const { id } = useParams();

  return <FormComponent {...{ id, model }} />;
}
