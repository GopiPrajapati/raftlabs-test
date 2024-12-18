import axios from "axios";
import { Platform } from "react-native";

// export const Base_URL =
// Platform.OS == "ios" ? "http://localhost:3000/" : "http://10.0.2.2:3000/";

export const Base_URL =
  "https://raw.githubusercontent.com/GopiPrajapati/raftlabs-test/refs/heads/main/db.json";

const httpClient = axios.create({ baseURL: "http://localhost:3000/" });

// get api call
export async function GET(relativeUrl, data) {
  let url = Base_URL + relativeUrl;
  console.log("\n\n url:: ", url);

  try {
    const res = await httpClient({
      method: "GET",
      url,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("err", error);
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
}

export async function GET2(relativeUrl, data) {
  let url = relativeUrl;
  console.log("\n\n url:: ", url);

  try {
    const res = await httpClient({
      method: "GET",
      url,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("err", error);
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
}
