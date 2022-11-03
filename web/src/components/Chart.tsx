import React, { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { Card, useMantineColorScheme } from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";


interface MongoDashboardProps {
  height: number;
  width: number;
  chartId: string;
}
const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-project-0-mlqlp",
});

const Chart: React.FC<MongoDashboardProps> = ({ chartId, height, width }) => {
  const [rendered, setRendered] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  const [chart] = useState(
    sdk.createChart({
      chartId,
      width,
      height,
      theme: colorScheme,
      background: "transparent"
    })
  )
  const chartDiv = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (chartDiv.current !== null) {
      chart.render(chartDiv.current)
      .then(() => setRendered(true));
      // HACK: fixes MongoDB chart putting
      // white background on white text in dark mode
      chartDiv.current.style.colorScheme = "auto";
    }
  }, [chart]);
  
  useEffect(() => {
    if (rendered)
      chart.setTheme(colorScheme);
  }, [colorScheme])

  return (<Card shadow="lg" radius="lg" p="xs" m="sm" withBorder>
      <span ref={chartDiv} className="chart"/>
    </Card>)
};

export default Chart;
