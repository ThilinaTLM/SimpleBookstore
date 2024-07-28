import * as crypto from 'crypto';

/**
 * Generates a consistent hypothetical price for a book based on its title and author.
 * @param bookTitle - The title of the book.
 * @param authorName - The name of the author.
 * @param minPrice - The minimum price (default is 5.0).
 * @param maxPrice - The maximum price (default is 50.0).
 * @returns A hypothetical price for the book.
 */
export function generateBookPrice(bookTitle: string, authorName: string, minPrice: number = 5.0, maxPrice: number = 50.0): number {
  // Create a unique string using the book's title and author's name
  const uniqueString = `${bookTitle}-${authorName}`;

  // Generate a hash of the unique string
  const hash = crypto.createHash('md5').update(uniqueString).digest('hex');

  // Convert the hash to a float value
  const hashInt = parseInt(hash, 16);
  return minPrice + (hashInt % (Math.floor(maxPrice * 100) - Math.floor(minPrice * 100))) / 100.0;
}
