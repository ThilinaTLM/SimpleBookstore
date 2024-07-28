import {ApiClient} from "@/lib/httpClient/client";

const BASE_URL = process.env.OPEN_LIBRARY_API_HOST || "https://openlibrary.org";

export const openLibClient = new ApiClient({
  baseUrl: BASE_URL,
  globalHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

export type BookDocument = {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  [key: string]: any;
}

export type OpenLibraryResponse = {
  docs: BookDocument[];
  numFound: number;
  start: number;
}

const openLibApi = {
  book: {
    getByQuery: (query: string) => {
      return openLibClient.get<OpenLibraryResponse>("/search.json", {
        query: {
          q: query,
        },
      });
    }
  }
}

export default openLibApi;
