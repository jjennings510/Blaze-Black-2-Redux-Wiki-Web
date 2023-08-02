import { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { TypeCard } from "./TypeCard";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import { RenderCategory } from "../../../Utils/RenderCategory";
import { Link } from "react-router-dom";
import PokemonMoveModel from "../../../../models/Pokemon/PokemonMoveModel";

export const MoveTable: React.FC<{
  pokemonId: number;
  method: string;
  mobile?: boolean;
}> = (props) => {
  const [moves, setMoves] = useState<PokemonMoveModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    if (props.method === "level-up") {
      fetch(
        `${process.env.REACT_APP_API}/moves/get/levelUp?pokemonId=${props.pokemonId}`
      )
        .then((response) => response.json())
        .then((data) => {
          const loadedMoves: PokemonMoveModel[] = [];

          for (var move of data) {
            loadedMoves.push(move);
          }

          setMoves(loadedMoves);
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
    }
  }, [props.pokemonId]);
  useEffect(() => {
    if (props.method === "machine") {
      fetch(
        `${process.env.REACT_APP_API}/moves/get/machines?pokemonId=${props.pokemonId}`
      )
        .then((response) => response.json())
        .then((data) => {
          const loadedMoves: PokemonMoveModel[] = [];

          for (var move of data) {
            loadedMoves.push(move);
          }
          setMoves(loadedMoves);
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
    }
  }, [props.pokemonId]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  const renderHeading = (method: string) => {
    if (method === "level-up") {
      return "Lvl";
    } else if (method === "machine") {
      return "Method";
    }
  };

  return (
    <>
      {props.mobile ? (
        <>
          <table className="table align-middle table-responsive">
            <thead>
              <tr>
                <th>{renderHeading(props.method)}</th>
                <th>Move</th>
                <th>Type</th>
                <th>Cat.</th>
              </tr>
            </thead>
            <tbody className="table-group-divider fw-semibold">
              {moves.map((move, index) => (
                <tr key={index}>
                  <td>
                    {props.method === "level-up"
                      ? move.level
                      : move.machine === null
                      ? "Move Tutor"
                      : move.machine}
                  </td>
                  <td>
                    <OverlayTrigger
                      delay={{ show: 350, hide: 400 }}
                      overlay={
                        <Tooltip className="tooltip">
                          {move.description}
                        </Tooltip>
                      }
                    >
                      <Link to={`/moves/${move.id}`}>{move.move}</Link>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <TypeCard type={move.type} size="small"></TypeCard>
                  </td>
                  <td>{<RenderCategory category={move.category} size="small"/>}</td>
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
                <th>{renderHeading(props.method)}</th>
                <th>Move</th>
                <th>Type</th>
                <th>Cat.</th>
                <th>Power</th>
                <th>Acc.</th>
              </tr>
            </thead>
            <tbody className="table-group-divider fw-semibold">
              {moves.map((move, index) => (
                <tr key={index}>
                  <td>
                    {props.method === "level-up"
                      ? move.level
                      : move.machine === null
                      ? "Move Tutor"
                      : move.machine}
                  </td>
                  <td>
                    <OverlayTrigger
                      delay={{ show: 350, hide: 400 }}
                      overlay={
                        <Tooltip className="tooltip">
                          {move.description}
                        </Tooltip>
                      }
                    >
                      <Link to={`/moves/${move.id}`}>{move.move}</Link>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <TypeCard type={move.type}></TypeCard>
                  </td>
                  <td>{<RenderCategory category={move.category} />}</td>
                  <td>{move.power === 0 ? "-" : move.power}</td>
                  <td>{move.accuracy === 0 ? "-" : move.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
