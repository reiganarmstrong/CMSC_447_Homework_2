import Head from "next/head";
import Create from "../components/Create";
import Read from "../components/Read";
import Delete from "../components/Delete";
import ActionWrapper from "@/components/ActionWrapper";
import { Button } from "@mantine/core";

const reset_db = async () => {
  await fetch("/api/reset", {
    method: "PUT",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.message);
    });
};

export default function Home() {
  return (
    <>
      <Head>
        <title>CMSC 447 Homework 2</title>
        <meta name="description" content="Basic app to test CRUD" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ActionWrapper>
        <Button color="red" onClick={reset_db}>
          Reset Database to Default Values
        </Button>
      </ActionWrapper>
      <Create />
      <Read />
      <Delete />
    </>
  );
}
