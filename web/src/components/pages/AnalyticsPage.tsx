import { Group, Stack } from "@mantine/core";
import React from "react";
import Chart from "../Chart";

const AnalyticsPage = () => {
  return (
    <Group position="center">
      <Chart height={450} width={600} chartId="6362adf6-680d-428e-8fc5-9be133f827d0" />
      <Chart height={450} width={600} chartId="635de3ab-8f1f-45e3-8428-05b934b9895b" />
    </Group>
  );
};

export default AnalyticsPage;
