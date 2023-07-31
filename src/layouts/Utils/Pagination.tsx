export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  numberSiblings: number;
  paginate: any;
}> = (props) => {
  let startPage: number, endPage: number;

  if (props.totalPages <= props.numberSiblings * 2) {
    startPage = 1;
    endPage = props.totalPages;
  } else {
    if (props.currentPage <= props.numberSiblings + 1) {
      startPage = 1;
      endPage = props.numberSiblings * 2;
    } else if (props.currentPage + props.numberSiblings >= props.totalPages) {
      startPage = props.totalPages - props.numberSiblings - 1;
      endPage = props.totalPages;
    } else {
      startPage = props.currentPage - props.numberSiblings;
      endPage = props.currentPage + props.numberSiblings;
    }
  }

  const pageNumbers = [...Array(endPage + 1 - startPage).keys()].map(
    (i) => startPage + i
  );

  if (props.totalPages < props.numberSiblings * 2) {
    return (
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className={
                "page-link " + (props.currentPage === 1 ? "disabled" : "")
              }
              aria-label="Previous"
              onClick={() => props.paginate(props.currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {pageNumbers.map((number: number) => (
          <li
            key={number}
            onClick={() => props.paginate(number)}
            className={
              "page-item " + (props.currentPage === number ? "active" : "")
            }
          >
            <button className="page-link">{number}</button>
          </li>
        ))}

          <li className="page-item">
            <button
              className={
                "page-link " +
                (props.currentPage === props.totalPages ? "disabled" : "")
              }
              aria-label="Previous"
              onClick={() => props.paginate(props.currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className={
              "page-link " + (props.currentPage === 1 ? "disabled" : "")
            }
            aria-label="Previous"
            onClick={() => props.paginate(props.currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {props.currentPage > props.numberSiblings + 1 && (
          <>
            <li className="page-item" onClick={() => props.paginate(1)}>
              <button className="page-link">1</button>
            </li>
            <li className="page-item">
              <button className="page-link disabled">&#8230;</button>
            </li>
          </>
        )}

        {pageNumbers.map((number: number) => (
          <li
            key={number}
            onClick={() => props.paginate(number)}
            className={
              "page-item " + (props.currentPage === number ? "active" : "")
            }
          >
            <button className="page-link">{number}</button>
          </li>
        ))}
        {props.currentPage < props.totalPages - props.numberSiblings && (
          <>
            <li className="page-item">
              <button className="page-link disabled">&#8230;</button>
            </li>
            <li
              className="page-item"
              onClick={() => props.paginate(props.totalPages)}
            >
              <button className="page-link">{props.totalPages}</button>
            </li>
          </>
        )}

        <li className="page-item">
          <button
            className={
              "page-link " +
              (props.currentPage === props.totalPages ? "disabled" : "")
            }
            aria-label="Previous"
            onClick={() => props.paginate(props.currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
