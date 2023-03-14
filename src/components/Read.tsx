import {
  Card,
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Flex,
  Text,
  Stack,
  Container,
  NumberInput,
} from "@mantine/core";
import ActionWrapper from "./ActionWrapper";
import { useForm } from "@mantine/form";
import OutputWrapper from "./OutputWrapper";
import { useState } from "react";

interface values {
  full_name: string;
}

export default () => {
  const [outputMessage, changeOutputMessage] = useState("");
  const form = useForm({
    initialValues: {
      full_name: "",
    },

    validate: (value) => ({
      full_name:
        value.full_name.trim().length == 0 ? "Please enter a name" : null,
    }),
  });

  const submitHandler = async (values: values) => {
    const res = await fetch(`/api/searchUser?name=${values.full_name}`, {
      method: "GET",
    });
    const data = await res.json();
    changeOutputMessage(data.message);
    console.log(data);
  };

  return (
    <ActionWrapper>
      <Card radius={"md"} withBorder>
        <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
          <Text weight={"bold"}>Search For A User</Text>
          <TextInput
            withAsterisk
            label="Full Name"
            placeholder="Bob Ross"
            {...form.getInputProps("full_name")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Card>
      <OutputWrapper>{outputMessage}</OutputWrapper>
    </ActionWrapper>
  );
};
