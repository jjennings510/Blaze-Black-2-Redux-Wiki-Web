import { useState, useEffect } from "react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import MoveRowModel from "../../../models/Move/MoveRowModel";
import { Pagination } from "../../Utils/Pagination";
import { Link } from "react-router-dom";
import { RenderCategory } from "../../Utils/RenderCategory";
import { TypeCard } from "../PokemonPage/components/TypeCard";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { orderedTypes } from "../../../Utils/TypeChart";

export const MoveDexPage = () => {
  // Moves state
  const [moves, setMoves] = useState<MoveRowModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [totalAmountOfMoves, setTotalAmountOfMoves] = useState(0);
  const [movesPerPage, setMovePerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Search state
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [typeSelection, setTypeSelection] = useState("Type");

  useEffect(() => {
    const baseUrl: string = `${process.env.REACT_APP_API}/moves/get/all`;
    let url: string = "";

    if (searchUrl === "") {
      url = `${baseUrl}?page=${currentPage - 1}&size=${movesPerPage}`;
    } else {
      let searchWithPage = searchUrl.replace(
        "<pageNumber>",
        `${currentPage - 1}`
      );
      url = baseUrl + searchWithPage;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const loadedMoves: MoveRowModel[] = [];
        for (var move of data.content) {
          loadedMoves.push(move);
        }
        setMoves(loadedMoves);
        setTotalAmountOfMoves(data.totalElements);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setHttpError(error.message);
        setIsLoading(false);
      });
  }, [currentPage, searchUrl]);

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setTypeSelection("Type");
      setSearchUrl("");
    } else {
      setSearchUrl(`?query=${search}&page=<pageNumber>&size=${movesPerPage}`);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      searchHandleChange();
    }
  };

  const handleReset = () => {
    setSearch("");
    setSearchUrl("");
    setTypeSelection("Type");
  };

  const handleTypeChange = (value: string) => {
    setCurrentPage(1);
    if (orderedTypes.find((type) => type.name === value.toLowerCase())) {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      setTypeSelection(capitalized);
      setSearchUrl(`?type=${value}&page=<pageNumber>&size=${movesPerPage}`);
    } else {
      setTypeSelection("Type");
      setSearch(`?page=<pageNumber>&size=${movesPerPage}`);
    }
  };

  const lastIndex: number = currentPage * movesPerPage;
  const firstIndex: number = lastIndex - movesPerPage;
  let lastItem =
    movesPerPage * currentPage <= totalAmountOfMoves
      ? movesPerPage * currentPage
      : totalAmountOfMoves;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }
  return (
    <div>
      {/* Desktop view */}
      <div className="d-none d-lg-block">
        <div className="container">
          <h1 className="mt-4 text-center">Move Search</h1>
          <div className="row mt-5">
            <div className="col-6 d-flex align-items-center">
              <p className="align-middle mb-0">
                Viewing {firstIndex + 1} - {lastItem} of {totalAmountOfMoves}{" "}
                moves:
              </p>
            </div>
            <div className="col-6">
              <div className="d-flex">
                <input
                  type="search"
                  className="form-control me-2"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={search}
                />
                <button
                  className="btn btn-primary text-white me-2"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
                <DropdownButton
                  title={typeSelection}
                  variant="secondary"
                  className="me-2"
                >
                  {orderedTypes.map((type, index) => (
                    <DropdownItem
                      className="text-capitalize"
                      key={index}
                      onClick={() => handleTypeChange(type.name)}
                    >
                      {type.name}
                    </DropdownItem>
                  ))}
                </DropdownButton>
                <button
                  className="btn btn-danger text-white me-2"
                  onClick={() => handleReset()}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <table className="table align-middle">
            <thead>
              <tr>
                <td>Name</td>
                <td>Effect</td>
                <td>Type</td>
                <td>Cat.</td>
                <td>Power</td>
                <td>Accuracy</td>
              </tr>
            </thead>
            <tbody>
              {moves.map((move) => (
                <tr key={move.id}>
                  <td>
                    <Link to={`/moves/${move.id}`}>{move.name}</Link>
                  </td>
                  <td>{move.effect}</td>
                  <td>
                    <TypeCard type={move.type} />
                  </td>
                  <td>{<RenderCategory category={move.category} />}</td>
                  <td>{move.power === 0 ? "-" : move.power}</td>
                  <td>{move.accuracy === 0 ? "-" : move.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              numberSiblings={3}
              paginate={paginate}
            />
          )}
        </div>
      </div>
      {/* Mobile view */}
      <div className="d-lg-none">
        <div className="container">
          <h1 className="mt-4 text-center secondary-color-">Move Search</h1>
          <div className="d-flex mt-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search pokemon, ability, or type"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              value={search}
            />
            {searchUrl !== "" && (
              <button
                className="btn btn-danger text-white ms-2"
                onClick={() => handleReset()}
              >
                Reset
              </button>
            )}
          </div>
          <table className="table align-middle">
            <thead>
              <tr>
                <td>Name</td>
                <td>Type</td>
                <td>Cat.</td>
              </tr>
            </thead>
            <tbody>
              {moves.map((move) => (
                <tr key={move.id}>
                  <td>
                    <Link to={`/moves/${move.id}`}>{move.name}</Link>
                  </td>
                  <td>
                    <TypeCard type={move.type} size="small" />
                  </td>
                  <td>{<RenderCategory category={move.category} size="small" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {moves.length === 0 && (
              <>
                <p className="text-center">
                  Uh oh! It looks like we couldn't find what you were looking
                  for. Try searching again!
                </p>
              </>
            )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              numberSiblings={3}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
