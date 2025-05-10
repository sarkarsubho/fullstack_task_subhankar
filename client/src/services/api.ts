import { API } from "../const/api";

export const fetchAllTasks = async (): Promise<string[]> => {
  const res = await fetch(`${API.baseUrl}/fetchAllTasks`);
  const data = await res.json();
  return data.tasks || [];
};
