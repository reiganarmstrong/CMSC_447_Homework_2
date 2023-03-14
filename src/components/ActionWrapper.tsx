import { Card, Flex } from "@mantine/core";
import { NextPage } from "next";
import { PropsWithChildren } from "react";

const actionWrapper: NextPage<PropsWithChildren> = (props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" m={15} withBorder>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {props.children}
      </Flex>
    </Card>
  );
};

export default actionWrapper;
