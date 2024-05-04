import { IAPIData } from "../helpers/types";
import { payloadObject } from "../helpers/utils";
import axiosClient from "./axiosClient";

export const fetchJobInfo = async (payload: typeof payloadObject): Promise<IAPIData> => {
  try {
    const response = await axiosClient.post("getSampleJdJSON", payload);
    return response.data
  }
  catch (error) {
    console.error(error)
    throw error
  }
}