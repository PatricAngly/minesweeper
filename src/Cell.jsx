import "./Board.css";
function CellComponent(props) {
  function cellClick() {
    // Send back the index of clicked cell through props
    props.onClick(props.cell.index);
  }

  let cellContent = ""; // Show empty cell
  if (props.cell.visible) {
    if (props.cell.hasMine) {
      cellContent = "💣"; // show mine if click cell has mine
    } else if (props.cell.numberOfNeighbouringMines === 0) {
      cellContent = "0"; // Show 0 if cell has no neighbours
    } else {
      cellContent = props.cell.numberOfNeighbouringMines; // Show the amount of neighbours that cell has
    }
  }

  return (
    <div className="cell" onClick={cellClick}>
      <div className="content">{cellContent}</div>
    </div>
  );
}
export default CellComponent;
