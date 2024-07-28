import {bookClient} from "@/api/client";
import {Book} from "@/models/book";
import {generateBookPrice} from "@/lib/book";

function getCoverLink(coverId: number, size: "S" | "M" | "L" | "B") {
  return `http://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export async function GET(request: Request) {
  const response = await bookClient.get<{ docs: [] }>("/search.json", {
    query: {
      q: "the lord of the rings",
    },
  });

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
