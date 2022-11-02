import React, { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { Card, useMantineColorScheme } from "@mantine/core";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-project-0-mlqlp",
});

interface MongoDashboardProps {
  height: number;
  width: number;
  chartId: string;
}

const Chart: React.FC<MongoDashboardProps> = ({ chartId, height, width }) => {
  const { colorScheme } = useMantineColorScheme();
  const [chart] = useState(
    sdk.createChart({
      chartId,
      width,
      height,
      theme: colorScheme,
      background: "transparent"
    })
  );

  const chartDiv = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (chartDiv.current !== null) {
      chart.render(chartDiv.current)
    }
  }, [chart]);

  useEffect(() => {
    chart.setTheme(colorScheme);
  }, [colorScheme])

  return (<Card shadow="lg" radius="lg" p="lg" m="sm" withBorder>
      <span ref={chartDiv} className="chart"/>;
    </Card>)
};

export default Chart;
