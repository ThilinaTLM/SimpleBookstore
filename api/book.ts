import {ApiClient} from "@/lib/httpClient/client";
import {Book} from "@/models/book";

export const bookClient = new ApiClient({
  baseUrl: "http://localhost:3000",
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
