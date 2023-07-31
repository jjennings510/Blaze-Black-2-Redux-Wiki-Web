import { useState, useEffect } from "react";
import AbilityModel from "../../../models/Ability/AbilityModel";
import AbilityDetailModel from "../../../models/Ability/AbilityDetailModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { Link } from "react-router-dom";

export const AbilityDexPage = () => {
  const [abilities, setAbilities] = useState<AbilityDetailModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [totalAmountofAbilities, setTotalAmountofAbilities] = useState(0);
  const [abilitiesPerPage, setAbilitiesPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Search state
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [typeSelection, setTypeSelection] = useState("Type");

  useEffect(() => {
    const baseUrl: string = `${process.env.REACT_APP_API}/abilities`;
    let url: string = "";

    if (searchUrl === "") {
      url = `${baseUrl}/search/findAllByOrderByName?page=${
        currentPage - 1
      }&size=${abilitiesPerPage}`;
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
        const loadedAbilities: AbilityDetailModel[] = [];
        for (var ability of data._embedded.abilities) {
          loadedAbilities.push(ability);
        }
        setAbilities(loadedAbilities);
        setTotalAmountofAbilities(data.page.totalElements);
        setTotalPages(data.page.totalPages);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setHttpError(httpError);
      });
  }, [currentPage, searchUrl]);

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setTypeSelection("Type");
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByNameContainingOrderByName?name=${search}&page=<pageNumber>&size=${abilitiesPerPage}`
      );
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
  };

  const lastIndex: number = currentPage * abilitiesPerPage;
  const firstIndex: number = lastIndex - abilitiesPerPage;
  let lastItem =
    abilitiesPerPage * currentPage <= totalAmountofAbilities
      ? abilitiesPerPage * currentPage
      : totalAmountofAbilities;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  return (
    <div className="d-none d-lg-block">
      <div className="container">
        <h1 className="mt-4 text-center">Ability Search</h1>
        <div className="row mt-5">
          <div className="col-8 d-flex align-items-center">
            {totalAmountofAbilities > 0 && (
              <p className="align-middle mb-0">
                Viewing {firstIndex + 1} - {lastItem} of{" "}
                {totalAmountofAbilities} Abilities:
              </p>
            )}
          </div>
          <div className="col-4">
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
                className="btn main-color text-white me-2"
                onClick={() => searchHandleChange()}
              >
                Search
              </button>
              <button
                className="btn btn-danger text-white me-2"
                onClick={() => handleReset()}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            {abilities.map((ability) => (
              <tr key={ability.id}>
                <td>
                  <Link to={`/abilities/${ability.id}`}>{ability.name}</Link>
                </td>
                <td>{ability.shortEffect}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {abilities.length === 0 && (
          <>
            <p className="text-center">
              Uh oh! It looks like we couldn't find what you were looking for.
              Try searching again!
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
  );
};
