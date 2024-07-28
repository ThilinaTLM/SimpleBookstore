import {ApiClient} from "@/lib/httpClient/client";

export const bookClient = new ApiClient({
  baseUrl: "https://openlibrary.org",
  globalHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

export const client = new ApiClient({
  baseUrl: "http://localhost:3000",
  globalHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

