import {
  Card,
  TextInput,
  Button,
  Group,
  Text,
  NumberInput,
} from "@mantine/core";
import ActionWrapper from "./ActionWrapper";
import { useForm } from "@mantine/form";
import OutputWrapper from "./OutputWrapper";
import { useState } from "react";

interface values {
  full_name: string;
  points: number;
}

export default () => {
  const [outputMessage, changeOutputMessage] = useState("");
  const form = useForm({
    initialValues: {
      full_name: "",
      points: 0,
    },

    validate: {
      full_name: (value) => {
        if (value.trim().length == 0) {
          return "Please enter a name";
        } else {
          return null;
        }
      },
      points: (value) => {
        if (typeof value != "number") {
          return "Please enter a point value";
        } else {
          return null;
        }
      },
    },
  });

  const submitHandler = async (values: values) => {
    const res = await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await res.json();

    changeOutputMessage(data.message);
  };

  return (
    <ActionWrapper>
      <Card radius={"md"} withBorder>
        <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
          <Text weight={"bold"}>Create A User</Text>
          <TextInput
            withAsterisk
            label="Full Name"
            placeholder="Bob Ross"
            {...form.getInputProps("full_name")}
          />
          <NumberInput
            withAsterisk
            label="Points"
            {...form.getInputProps("points")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Create</Button>
          </Group>
        </form>
      </Card>
      <OutputWrapper>{outputMessage}</OutputWrapper>
    </ActionWrapper>
  );
};
