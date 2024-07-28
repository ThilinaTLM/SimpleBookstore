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

const bookApi = {
  book: {
    getBooks: () => {
      return bookClient.get<StandardResponse<Book[]>>("/api/book", {
        query: {
          title: "The Lord of the Rings"
        }
      });
    }
  }
}

export default bookApi;
