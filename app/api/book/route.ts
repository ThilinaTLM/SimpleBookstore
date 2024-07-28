import openLibApi from "@/api/openLibClient";
import {Book} from "@/models/book";
import {generateBookPrice} from "@/lib/book";
import {NextRequest} from "next/server";

function getCoverLink(coverId: number, size: "S" | "M" | "L" | "B") {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const response = await openLibApi.book.getByQuery(title || "");

  if (!response.ok) {
    return Response.json(
      {
        error: "Failed to fetch books",
      },
      {
        status: response.status,
      }
    );
  }

  const books: Book[] = response.body.docs.map((book: any) => ({
    olid: book.key ? book.key.split('/').pop() : "Unknown",
    title: book.title,
    type: book.type,
    firstPublishedDate: book.first_publish_year ? book.first_publish_year.toString() : "Unknown",
    authors: book.author_name ? book.author_name : [],
    coverLink: book.cover_i ? getCoverLink(book.cover_i, "L") : "",
    languages: book.language ? book.language : [],
    price: generateBookPrice(book.title, JSON.stringify(book.author_name)),
  }));

  return Response.json({
    data: books,
  });
}
