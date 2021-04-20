import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubscription } from "urql";
import { actions } from "../Features/Metrics/reducer";
import { IState } from "../store";

interface NewMeasurement {
    newMeasurement: {
        at: string;
        metric: string;
        value: number;
        unit: string;
    }
}

const getLatestValues = (state: IState) => {
    return state.metrics.latestValue;
}

export default (selectedMetrics: string[]) => {
    const latestValue = useSelector(getLatestValues);
    const dispatch = useDispatch();
    const [result] = useSubscription<NewMeasurement>({
        query: `
        subscription {
            newMeasurement {
                at
                metric
                value
                unit
            }
        }`,
        pause: selectedMetrics.length === 0
    })
    const { data } = result;

    useEffect(() => {
        data && dispatch(actions.newMetricValueFetched(data.newMeasurement))
    }, [data, dispatch])
    return latestValue
}
