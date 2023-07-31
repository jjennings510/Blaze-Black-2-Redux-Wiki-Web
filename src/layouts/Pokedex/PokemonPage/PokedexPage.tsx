import { useState, useEffect } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { orderedTypes } from "../../../Utils/TypeChart";
import PokemonRowModel from "../../../models/PokemonRowModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { PokemonRow } from "./components/PokemonRow";
import { Pagination } from "../../Utils/Pagination";

export const PokedexPage = () => {
  // Pokemon state
  const [pokemon, setPokemon] = useState<PokemonRowModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [totalAmountOfPokemon, setTotalAmountOfPokemon] = useState(0);
  const [pokemonPerPage, setPokemonPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Search state
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [typeSelection, setTypeSelection] = useState("Type");

  useEffect(() => {
    const baseUrl: string = `${process.env.REACT_APP_API}/pokemonSpecies/get/pokedex`;
    let url: string = "";

    if (searchUrl === "") {
      url = `${baseUrl}?page=${currentPage - 1}&size=${pokemonPerPage}`;
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
        const loadedPokemon: PokemonRowModel[] = [];

        for (var pokemon of data.content) {
          loadedPokemon.push({
            sprite: pokemon.sprite,
            name: pokemon.pokemonName,
            formName: pokemon.formName,
            number: pokemon.number,
            types: pokemon.types,
            abilities: pokemon.abilities,
            baseStats: pokemon.baseStats,
          });
        }
        setTotalAmountOfPokemon(data.totalElements);
        setTotalPages(data.totalPages);
        setPokemon(loadedPokemon);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, [currentPage, searchUrl]);

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setTypeSelection("Type");
      setSearchUrl("");
    } else {
      setSearchUrl(`?query=${search}&page=<pageNumber>&size=${pokemonPerPage}`);
    }
  };

  const handleTypeChange = (value: string) => {
    setCurrentPage(1);
    if (orderedTypes.find((type) => type.name === value.toLowerCase())) {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      setTypeSelection(capitalized);
      setSearchUrl(`?query=${value}&page=<pageNumber>&size=${pokemonPerPage}`);
    } else {
      setTypeSelection("Type");
      setSearch(`?page=<pageNumber>&size=${pokemonPerPage}`);
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

  const lastIndex: number = currentPage * pokemonPerPage;
  const firstIndex: number = lastIndex - pokemonPerPage;
  let lastItem =
    pokemonPerPage * currentPage <= totalAmountOfPokemon
      ? pokemonPerPage * currentPage
      : totalAmountOfPokemon;

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
          <h1 className="mt-4 text-center secondary-color-">Pokedex Search</h1>
          <div>
            <div className="row mt-5 justify-content-end">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <p className="align-middle mb-0">
                    Viewing {firstIndex + 1} - {lastItem} of{" "}
                    {totalAmountOfPokemon} Pokemon:
                  </p>
                </div>
                <div className="col-6">
                  <div className="d-flex">
                    <input
                      type="search"
                      className="form-control me-2"
                      placeholder="Search pokemon, ability, or type"
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
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-lg-12 col-auto">
                <table className="table table-responsive table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th scope="col">Pokemon</th>
                      <th scope="col">Number</th>
                      <th scope="col">Type</th>
                      <th scope="col">Abilities</th>
                      <th scope="col">Stats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pokemon.map((p) => (
                      <PokemonRow
                        pokemon={p}
                        key={p.number}
                        mobile={false}
                        baseStats={true}
                      />
                    ))}
                  </tbody>
                </table>
                {pokemon.length === 0 && (
                  <>
                    <p className="text-center">
                      Uh oh! It looks like we couldn't find what you were
                      looking for. Try searching again!
                    </p>
                  </>
                )}
              </div>
            </div>
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
      {/* Mobile view */}
      <div className="d-lg-none">
        <div className="container">
          <h1 className="text-center">Pokedex Search</h1>
        </div>
      </div>
    </div>
  );
};
