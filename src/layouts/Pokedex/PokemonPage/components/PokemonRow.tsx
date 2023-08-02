import { Link } from "react-router-dom";
import { TypeCard } from "./TypeCard";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PokemonRowModel from "../../../../models/Pokemon/PokemonRowModel";

export const PokemonRow: React.FC<{
  pokemon: PokemonRowModel;
  abilities?: boolean;
  baseStats?: boolean;
  formName?: boolean;
  mobile?: boolean;
}> = (props, key) => {
  const formatFormName = (name?: string) => {
    if (name === props.pokemon.name) {
      return
    } else {
      const formattedName = name?.substring(name.indexOf("-") + 1).replaceAll("-", " ")
      return <p className="fst-italic">{formattedName}</p>
    }
  }

  return (
    <tr className="align-middle">
      {props.mobile ? (
        <>
          <td>
            {props.pokemon?.sprite.image ? (
              <img
                src={`data:image/png;base64,${props.pokemon?.sprite.image}`}
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
          <td className="text-capitalize">{props.pokemon?.name}</td>
          <td>{props.pokemon?.number.toString().padStart(3, "0")}</td>
          <td>{props.pokemon?.types.join(" / ")}</td>
        </>
      ) : (
        <>
          <td>
            {props.pokemon?.sprite?.image ? (
              <img
                src={`data:image/png;base64,${props.pokemon?.sprite?.image}`}
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
            <Link to={`/pokemon/${props.pokemon?.number}`} className="">
              {props.pokemon?.name}
            </Link>
            {props.formName && props.pokemon.formName !== null && (
              formatFormName(props.pokemon.formName)
            )}
          </td>
          <td>{props.pokemon?.number.toString().padStart(3, "0")}</td>
          <td>
            {props.pokemon?.types.map((type, index) => (
              <TypeCard type={type} key={index} />
            ))}
          </td>
          <td>
            <ol className="my-0 ps-3">
              {props.pokemon?.abilities.map((ability, index) => (
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
                    <Link to={`/abilities/${ability.id}`} reloadDocument>
                      {ability.name}
                    </Link>
                  </OverlayTrigger>
                  {ability.hiddenAbility && (
                    <span className="fst-italic text-body-secondary"> (Hidden ability)</span>
                  )}
                </li>
              ))}
            </ol>
          </td>
          <td className="text-center">
            {props.baseStats && (
              <table className="table my-0 table-borderless table-sm">
                <tbody>
                  <tr
                    style={{ fontSize: ".75rem" }}
                  >
                    <td className="text-body-secondary">HP</td>
                    <td className="text-body-secondary">Atk</td>
                    <td className="text-body-secondary">Def</td>
                    <td className="text-body-secondary">SpA</td>
                    <td className="text-body-secondary">SpD</td>
                    <td className="text-body-secondary">Spe</td>
                    <td className="text-body-secondary" colSpan={2}>BST</td>
                  </tr>
                  <tr>
                    <td>{props.pokemon?.baseStats?.hp}</td>
                    <td>{props.pokemon?.baseStats?.attack}</td>
                    <td>{props.pokemon?.baseStats?.defense}</td>
                    <td>{props.pokemon?.baseStats?.specialAttack}</td>
                    <td>{props.pokemon?.baseStats?.defense}</td>
                    <td>{props.pokemon?.baseStats?.speed}</td>
                    <td>{props.pokemon?.baseStats?.bst}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </td>
        </>
      )}
    </tr>
  );
};
