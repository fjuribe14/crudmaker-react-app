import { useParams } from "react-router-dom";
import { UserModel } from "@/app/models/user";
import ViewComponent from "@/components/ViewComponent";

export default function ViewUserId() {
  const model = new UserModel();
  const { id } = useParams();

  return <ViewComponent {...{ model, id }} />;
}
