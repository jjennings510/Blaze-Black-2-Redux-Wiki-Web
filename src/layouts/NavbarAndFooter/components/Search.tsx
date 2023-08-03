import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GlobalSearchModel from "../../../models/GlobalSearchModel";

export const Search = () => {
  const [items, setItems] = useState<GlobalSearchModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/search/get?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        const loadedPokemon: GlobalSearchModel[] = data;
        setItems(loadedPokemon);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, [query]);

  const idItems = items.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const handleOnSearch = (query: string, results: any) => {
    setQuery(query);
  };

  const handleOnSelect = (result: GlobalSearchModel) => {
    switch (result.descriptor) {
      case "Pokemon":
        navigate(`/pokemon/${result.entityId}`, {
          state: { speciesId: result.entityId },
        });
        break;
      case "Move":
        navigate(`/moves/${result.entityId}`);
        break;
      case "Ability":
        navigate(`/abilities/${result.entityId}`);
        break;
      default:
    }
  };

  const handleOnHover = (result: GlobalSearchModel) => {};

  const formatResult = (item: GlobalSearchModel) => {
    return (
      <>
        <span className="text-capitalize">
          {item.name}{" "}
          <span className="text-muted fst-italic">{item.descriptor}</span>
        </span>
      </>
    );
  };

  return (
    <div className="search">
      <ReactSearchAutocomplete
        items={idItems}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        onHover={handleOnHover}
        formatResult={formatResult}
        placeholder="Search"
        styling={{
          // border: "1px solid darkgreen",
          borderRadius: "5px",
          boxShadow: "rgba(202, 170, 0, .75) 0px 0px 6px 3px",
          hoverBackgroundColor: "rgba(20, 22, 25, 0.8)",
          iconColor: "rgb(202, 170, 0)",
          lineColor: "rgb(202, 170, 0)",
          placeholderColor: "rgb(209, 212, 214)",
          zIndex: 5,
        }}
      />
    </div>
  );
};
