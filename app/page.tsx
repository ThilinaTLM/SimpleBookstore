"use client"

import {Container, Grid} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/api/client";
import {Book} from "@/models/book";
import BookCard from "@/components/BookCard";

export default function Home() {

  const {data} = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await client.get<any>("/api/book");
      return response.body["data"] as Book[];
    },
  })

  return (
    <Container>
      <Grid>
        {data && data.map((book, index) => {
          return (
            <Grid.Col span={{base: 12, sm: 6, md: 4}} key={index}>
              <BookCard
                {...book}
              />
            </Grid.Col>
          )
        })}
      </Grid>


    </Container>
  );
}
