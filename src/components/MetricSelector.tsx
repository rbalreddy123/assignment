import React from 'react';
import Select from 'react-select';
import { useSelect } from '../hooks';

const MetricSelector: React.FC = () => {
    const {
        options,
        onChange
    } = useSelect()
    return <Select
        name='metricSelect'
        options={options}
        isMulti
        closeMenuOnSelect={false}
        onChange={onChange}
    />
}

export default MetricSelector;