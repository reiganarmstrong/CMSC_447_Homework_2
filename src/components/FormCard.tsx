import { PropsOf } from "@emotion/react";
import { Card } from "@mantine/core";
import { NextPage } from "next";
import { PropsWithChildren } from "react";

const FormCard: NextPage<PropsWithChildren> = (props) => {
  return (
    <Card radius={"md"} withBorder>
      {props.children}
    </Card>
  );
};

export default FormCard;
