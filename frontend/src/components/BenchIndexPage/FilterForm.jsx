import { Input } from "../Forms";

const FilterForm = ({ minSeating, setMinSeating, maxSeating, setMaxSeating }) => {
  return (
    <div className="filter-form">
      <Input
        label="Minimum Seats:"
        type="number"
        value={minSeating}
        onChange={(e) => setMinSeating(e.target.value)}
      /> 
      <Input
        label="Maximum Seats:"
        type="number"
        value={maxSeating}
        onChange={(e) => setMaxSeating(e.target.value)}
      /> 
    </div>
  )
}

export default FilterForm

