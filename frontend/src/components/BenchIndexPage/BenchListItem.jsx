import { useHistory } from "react-router-dom";

const BenchListItem = ({ bench, highlightedBench, setHighlightedBench }) => {
  const history = useHistory()
  
  return (
    <div onClick={() => history.push(`benches/${bench.id}`)}
    className={`bench-list-item ${highlightedBench === bench.id && 'bench-list-item-highlighted'}`}
    onMouseEnter={() => setHighlightedBench(bench.id)}
    onMouseLeave={() => setHighlightedBench(null)}
    >
      <h2>{bench.title}</h2>
      <p>${bench.price}</p>
    </div>
  )
}

export default BenchListItem