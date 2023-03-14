import { Card, Text } from "@mantine/core";
import { NextPage } from "next";
import { PropsWithChildren } from "react";

const OutputWrapper: NextPage<PropsWithChildren> = (props) => {
  return (
    <Card radius="md" miw={"14.6rem"} mih={"14.6rem"} withBorder>
      <Text weight={"bold"}>Output</Text>
      {props.children}
    </Card>
  );
};

export default OutputWrapper;
