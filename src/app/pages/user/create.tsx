import { UserModel } from "@/app/models/user";
import FormComponent from "@/components/FormComponent";

export default function CreateUserPage() {
  const model = new UserModel();

  return <FormComponent {...{ model }} />;
}
