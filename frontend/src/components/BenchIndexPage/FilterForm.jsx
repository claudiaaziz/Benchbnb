import { Input } from "../formElements";

const FilterForm = ({ minSeating, onMinSeatingChange, maxSeating, onMaxSeatingChange }) => {
  return (
    <div className="filter-form">
      <Input
        label="Minimum Seats:"
        type="number"
        value={minSeating}
        onChange={onMinSeatingChange}
        /> 
      <Input
        label="Maximum Seats:"
        type="number"
        value={maxSeating}
        onChange={onMaxSeatingChange}
      /> 
    </div>
  )
}

export default FilterForm

