import {ApiClient} from "@/lib/httpClient/client";
import {Book} from "@/models/book";

const isServer = typeof window === "undefined";
const BASE_URL = isServer ? process.env.API_BASE_URL : window.location.origin;

export const bookClient = new ApiClient({
  baseUrl: BASE_URL || "http://localhost:3000",
  globalHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

export type StandardResponse<T> = {
  data: T;
}

export type BookQuery = {
  title?: string
}

const bookApi = {
  book: {
    getBooks: (query?: BookQuery) => {
      return bookClient.get<StandardResponse<Book[]>>("/api/book", {
        query
      });
    },
    checkout: () => {
      return bookClient.post<StandardResponse<any>>("/api/checkout");
    }
  }
}

export default bookApi;
