import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { OptionTypeBase, ValueType, OptionsType } from "react-select";
import { useQuery } from "urql";
import { actions } from "../Features/Metrics/reducer";

const query =`
    query {
        getMetrics
    }
`;


interface Option extends OptionTypeBase {
    label: string;
    value: string;
}

export default () => {
    const [result] = useQuery({
        query
    })
    const dispatch = useDispatch();
    const [options, setOptions] = useState<OptionsType<Option>>([]);
    const { data, error } = result;

    const onChange = (selected: ValueType<Option, boolean>, action: any) => {
        const selectedMetrics = selected ? selected.map((item: Option) => item.value): [];
        dispatch(actions.metricsSelected({ selected: selectedMetrics, newMetric: action.option && action.option.label }));
    };

    useEffect(() => {
        if (error) {
          return;
        }
        if (!data) return;
        const { getMetrics } = data;
        setOptions(getMetrics.map((option: string) => ({ label: option, value: option })))
    }, [dispatch, data, error]);
    return {
        options,
        onChange
    }
}