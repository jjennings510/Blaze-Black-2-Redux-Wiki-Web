import { useEffect, useState } from "react";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TypeCard } from "../../PokemonPage/components/TypeCard";
import PokemonRowModel from "../../../../models/Pokemon/PokemonRowModel";

export const PokemonAbilityTable: React.FC<{
  abilityId: number;
  mobile?: boolean;
}> = (props) => {
  const [pokemon, setPokemon] = useState<PokemonRowModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API}/pokemon/get/for/ability?abilityId=${props.abilityId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const loadedPokemon: PokemonRowModel[] = [];
        for (var row of data) {
          loadedPokemon.push({
            sprite: row.sprite,
            name: row.pokemonName,
            formName: row.formName,
            number: row.number,
            types: row.types,
            abilities: row.abilities,
          });
        }
        setPokemon(loadedPokemon);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setHttpError(httpError);
      });
  }, [props.abilityId]);

  const formatFormName = (pokemon: any) => {
    if (pokemon.formName === pokemon.name) {
      return;
    } else {
      const formattedName = pokemon.name
        ?.substring(pokemon.name.indexOf("-") + 1)
        .replaceAll("-", " ");
      return <p className="fst-italic">{formattedName}</p>;
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  return (
    <div>
      {props.mobile ? (
        <>
          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>Pokemon</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.map((p, index) => (
                <tr key={index}>
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
                  <td className="text-capitalize">
                    <Link to={`/pokemon/${p?.number}`} className="">
                      {p?.name}
                    </Link>
                    {p.formName &&
                      p.formName !== null &&
                      formatFormName(p.formName)}
                  </td>
                  <td>
                    {p?.types.map((type, index) => (
                      <TypeCard type={type} key={index} size="small" />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>Pokemon</th>
                <th>Type</th>
                <th>Other Abilities</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.map((p, index) => (
                <tr key={index}>
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
                  <td className="text-capitalize">
                    <Link to={`/pokemon/${p?.number}`} className="">
                      {p?.name}
                    </Link>
                    {p.formName &&
                      p.formName !== null &&
                      formatFormName(p.formName)}
                  </td>
                  <td>
                    {p?.types.map((type, index) => (
                      <TypeCard type={type} key={index} />
                    ))}
                  </td>
                  <td>
                    <ol className="my-0 ps-3">
                      {p?.abilities.map((ability, index) => (
                        <li key={index}>
                          <OverlayTrigger
                            delay={{ show: 350, hide: 400 }}
                            overlay={
                              <Tooltip className="tooltip-right">
                                {ability.shortEffect}
                              </Tooltip>
                            }
                            placement="right"
                          >
                            <Link
                              to={`/abilities/${ability.id}`}
                              reloadDocument
                            >
                              {ability.name}
                            </Link>
                          </OverlayTrigger>
                          {ability.hiddenAbility && (
                            <span className="fst-italic text-body-secondary">
                              {" "}
                              (Hidden ability)
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
