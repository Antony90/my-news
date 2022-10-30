import { createRealmContext } from "@realm/react";
import { Task } from "./Article";

export const TaskRealmContext = createRealmContext({
  schema: [Task],
});
