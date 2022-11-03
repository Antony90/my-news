import { Card, Grid, Group, ThemeIcon, Title } from "@mantine/core";
import { IconNews } from "@tabler/icons";
import Chart from "../Chart";

const AnalyticsPage = () => {
  return (
    <Grid>
      <Chart height={420} width={500} chartId="6362adf6-680d-428e-8fc5-9be133f827d0" />
      <Chart height={420} width={500} chartId="635de3ab-8f1f-45e3-8428-05b934b9895b" />
      <Chart height={420} width={500} chartId="636303ce-fb36-4a0f-80f7-8ea226f58558" />
      <Card shadow="lg" radius="lg" p="xl" m="sm" withBorder>
        <Group>
          <ThemeIcon variant="default" size="xl">
            <IconNews size={30} />
          </ThemeIcon>
          <Title order={2}>
            {(459024).toLocaleString()} articles analyzed.
          </Title>
        </Group>
      </Card>
      <Card shadow="lg" radius="lg" p="xl" m="sm" withBorder>
        <Group>
          <ThemeIcon variant="default" size="xl">
            <IconNews size={30} />
          </ThemeIcon>
          <Title order={3}>
            {-0.643} average sentiment score
          </Title>
        </Group>
      </Card>
    </Grid>
  )
};

export default AnalyticsPage;
