# Simple Online Bookstore

This is a simple online bookstore application that allows users to view a list of books, add books to a shopping cart, and checkout.
Open Library API is used to fetch the list of books. Prices are generated randomly for each book using a hash function to make it consistent for each book.

## Pre-requisites
- Node.js 20.x.x (LTS)
- npm 10.x.x
- Docker (optional)
- Docker Compose (optional)

## How to start (using Docker)
1. Clone the repository.
    ```bash
    # https
    git clone https://github.com/ThilinaTLM/SimpleBookstore.git
    
    # ssh
    git clone git@github.com:ThilinaTLM/SimpleBookstore.git 
    ```
   
2. Change directory to the project root.
    ```bash
    cd SimpleBookstore
    ```
   
3. Run the following command to start the application.
    ```bash
    docker-compose up --build -d
    ```
   
4. Open the browser and navigate to `http://localhost:3000`.

## How to start (in development mode)

1. Clone the repository.
    ```bash
    # https
    git clone https://github.com/ThilinaTLM/SimpleBookstore.git
    
    # ssh
    git clone git@github.com:ThilinaTLM/SimpleBookstore.git 
    ```

2. Change directory to the project root.
    ```bash
    cd SimpleBookstore
    ```

3. Install dependencies.
    ```bash
    npm install
    ```
   
4. Create a `.env` file in the project root and add the following environment variables.
    ```bash
    OPEN_LIBRARY_API_URL=https://openlibrary.org
    ```

5. Start the application.
    ```bash
    npm run dev
    ```
   
6. Open the browser and navigate to `http://localhost:3000`.
