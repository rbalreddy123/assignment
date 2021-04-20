import React, { useEffect, useState } from 'react';
import { Grid, CardContent, Typography, Card, CardHeader } from '@material-ui/core';
import { useQuery } from 'urql';
import { useLatest } from '../hooks';

interface ILatestValueSectionProps {
    selectedMetrics: string[];
}

interface IValueCardProps {
    metricName: string;
    currentValue: number;
}

const ValueCard: React.FC<IValueCardProps> = ({ metricName, currentValue }) => {
    const [value, setValue] = useState(currentValue);
    const [result] = useQuery({
        query: `query ($metricName: String!) {
            getLastKnownMeasurement(metricName:$metricName){
              metric
              value
              at
              unit
            }
          }`,
        variables: {
            metricName
        }
    });
    const { data } = result;
    useEffect(() => {
        setValue(data ? data.getLastKnownMeasurement.value : 0)
    }, [data])
    return <Grid item md={5} xs={6}>
        <Card elevation={2}>
            <CardHeader title={metricName} />
            <CardContent>
                <Typography variant="h3">
                    {currentValue ? currentValue : value}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
}


const LatestValueSection: React.FC<ILatestValueSectionProps> = ({ selectedMetrics }) => {
    const latestValue = useLatest(selectedMetrics)

    return <>
        {
            selectedMetrics.map((metric) => (
                <ValueCard key={metric}
                    metricName={metric}
                    currentValue={latestValue[metric]}
                />
            ))
        }
    </>
}

export default LatestValueSection