import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MoveDetailPokemonModel from "../../../../models/Move/MoveDetailPokemonModel";
import { TypeCard } from "../../PokemonPage/components/TypeCard";
import { Pagination } from "../../../Utils/Pagination";

export const PokemonForMoveTable: React.FC<{
  moveId: string;
  method: string;
}> = (props) => {
  // Pokemon State
  const [pokemon, setPokemon] = useState<MoveDetailPokemonModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [totalAmountOfPokemon, setTotalAmountOfPokemon] = useState(0);
  const [pokemonPerPage, setPokemonPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Search state
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    const baseUrl: string = `${process.env.REACT_APP_API}/pokemon/get/for/move?moveId=${props.moveId}&method=${props.method}`;
    let url: string = "";

    if (searchUrl === "") {
      url = `${baseUrl}&page=${currentPage - 1}&size=${pokemonPerPage}`;
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
        const loadedPokemon: MoveDetailPokemonModel[] = [];
        for (var pokemon of data.content) {
          loadedPokemon.push(pokemon);
        }
        setPokemon(loadedPokemon);
        setTotalAmountOfPokemon(data.totalElements);
        setTotalPages(data.totalPages);
        console.log(loadedPokemon);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setHttpError(error.message);
        setIsLoading(false);
      });
  }, [currentPage, searchUrl]);

  const formatFormName = (pokemon: MoveDetailPokemonModel) => {
    if (pokemon.formName === pokemon.name) {
      return;
    } else {
      const formattedName = pokemon.formName
        ?.substring(pokemon.formName.indexOf("-") + 1)
        .replaceAll("-", " ");
      return <p className="fst-italic">{formattedName}</p>;
    }
  };

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(`&query=${search}&page=<pageNumber>&size=${pokemonPerPage}`);
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (pokemon.length === 0) return null;

  return (
    <>
      {pokemon.length > 0 ? (
        <div className="">
          <h2 className="text-center my-3">
            Learnable Through{" "}
            {props.method === "level-up"
              ? "Leveling"
              : props.method === "machine"
              ? "TM"
              : props.method === "tutor"
              ? "Move Tutor"
              : props.method === "egg"
              ? "Breeding"
              : ""}
          </h2>
          <div className="row justify-content-end">
            <div className="col-8 justify-content-end">
              <div className="d-flex">
                <input
                  type="search"
                  className="form-control me-2"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="btn main-color text-white me-2"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
                <button
                  className="btn btn-secondary text-white me-2"
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
                <th></th>
                <th>Pokemon</th>
                <th>
                  {props.method === "level-up"
                    ? "Level"
                    : props.method === "machine"
                    ? "Machine"
                    : props.method}
                </th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.map((p, index) => (
                <tr className="text-capitalize" key={index}>
                  <td>
                    {p?.sprite?.image ? (
                      <img
                        src={`data:image/png;base64,${p?.sprite?.image}`}
                        alt="Pokemon sprite"
                        className="pokemon-row-sprite img-fluid rounded-start"
                      />
                    ) : (
                      <img
                        src={require("../../../Images/Placeholders/0.png")}
                        alt="Pokemon Sprite"
                        className="pokemon-row-sprite"
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/pokemon/${p?.number}`} className="">
                      {p?.name}
                    </Link>
                    {p.formName && formatFormName(p)}
                  </td>
                  <td>
                    {props.method === "level-up"
                      ? p.level
                      : props.method === "machine"
                      ? p.machine
                      : props.method}
                  </td>
                  <td className="">
                    {p.types.map((type, index) => (
                      <TypeCard type={type} key={index} />
                    ))}
                  </td>
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
      ) : null}
    </>
  );
};
