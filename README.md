## Create React App Visualization

This assessment was bespoke handcrafted for Ruthvik.

Read more about this assessment [here](https://react.eogresources.com)

### Challenges

One challenge I have faced is to format the data from the graphql api to pass to the components. I have spent most time figuring it out and I have done it through a saga: `convert` whose otput is combined in the `mergeData` saga.

### Hooks

I have created 2 custom hooks: `useLatest`, `useSelect`

- **useLatest**: Fetches the latest value and update the store, returns the current latest value for each metric.
- **useSelect**: Handles the select component state and changes. It dispatches the required actions whenever user selects a metric from the dropdown and updates the redux state accordingly

### Libraries

[recharts](https://github.com/recharts/recharts) - for Charts
[react-select](https://github.com/JedWatson/react-select) - for the Select component.