import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { amber, blue, cyan, deepOrange, red, green } from '@material-ui/core/colors';
import { IState } from '../store';
import { makeStyles, Container } from '@material-ui/core';

const unitAdder = (value: number): string => {
  if (value >= 1000) {
    return (value / 1000).toString() + 'K';
  } else {
    return value.toString();
  }
};

const getAxisID = (metric: string) =>
  metric.toLowerCase().endsWith('pressure') ? 1 : metric.toLowerCase().endsWith('temp') ? 2 : 0;

const getMetrics = (state: IState) => {
  const { metrics } = state.metrics;
  return metrics;
};

const COLORS = [amber[600], blue[500], cyan[500], deepOrange[500], red[400], green[500]];

const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    height: '100vh',
  },
  main: {
    padding: theme.spacing(3),
    background: 'white',
  },
}));

interface IChartProps {
  selectedMetrics: string[];
}

const ChartGraph: React.FC<IChartProps> = ({ selectedMetrics }) => {
  const metrics = useSelector(getMetrics);
  const classes = useStyles();
  const data = Object.keys(metrics).map(key => metrics[key]);

  const units = {
    percentage: selectedMetrics.some((m: string) => getAxisID(m) === 0),
    pressure: selectedMetrics.some((m: string) => getAxisID(m) === 1),
    temperature: selectedMetrics.some((m: string) => getAxisID(m) === 2),
  };

  return (
    <Container className={classes.container}>
      <ResponsiveContainer>
        <LineChart width={600} height={600} data={data}>
          {selectedMetrics.length > 0 && <XAxis dataKey="at" interval={150} />}
          {units.percentage && (
            <YAxis
              label={{ value: '%', position: 'insideTopLeft', offset: 0, fill: '#908e8e', dy: 10, dx: 10, angle: -90 }}
              yAxisId={0}
              orientation="left"
              stroke={'#908e95'}
              domain={[0, 100]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              tick={{ fontSize: 11 }}
            />
          )}
          {units.temperature && (
            <YAxis
              label={{
                value: 'F',
                position: 'insideTopLeft',
                offset: 0,
                fill: '#908e8e',
                fontSize: 12,
                dy: 10,
                dx: 10,
                angle: -90,
              }}
              yAxisId={2}
              orientation="left"
              stroke={'#908e8f'}
              tick={{ fontSize: 11 }}
              tickFormatter={unitAdder}
            />
          )}
          {units.pressure && (
            <YAxis
              label={{
                value: 'PSI',
                position: 'insideTopLeft',
                offset: 0,
                fill: '#908e8e',
                fontSize: 12,
                dy: 15,
                dx: 10,
                angle: -90,
              }}
              yAxisId={1}
              orientation="left"
              stroke={'#908e8f'}
              tick={{ fontSize: 11 }}
              tickFormatter={unitAdder}
            />
          )}
          {selectedMetrics.map((metric, index) => {
            return (
              <Line key={metric} yAxisId={getAxisID(metric)} dataKey={metric} stroke={COLORS[index]} dot activeDot />
            );
          })}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default ChartGraph;
