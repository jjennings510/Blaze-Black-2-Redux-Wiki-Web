import { useState, useEffect, useRef } from "react";
import MoveDetailModel from "../../../models/Move/MoveDetailModel";
import { RenderCategory } from "../../Utils/RenderCategory";
import { TypeCard } from "../PokemonPage/components/TypeCard";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import MoveDetailPokemonModel from "../../../models/Move/MoveDetailPokemonModel";
import { PokemonForMoveTable } from "./components/PokemonForMoveTable";
import Masonry from "react-masonry-css";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import React from "react";

export const MoveDetail = () => {
  // Move Detail
  const [move, setMove] = useState<MoveDetailModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const moveId = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/moves/get/details?moveId=${moveId}`)
      .then((response) => response.json())
      .then((data) => {
        setMove(data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setHttpError(error.message);
        setIsLoading(false);
      });
  }, []);

  const formatEffectText = (effect: string) => {
    return move?.effect
      .replaceAll("$effect_chance", `${move.effectChance}`)
      .replaceAll("\n", "  ")
      .split("  ")
      .map((x, index) => <p key={index}>{x}</p>);
  };

  const renderPokemonTables = () => {
    const methods = ["level-up", "machine", "tutor", "egg", "form-change"];
    const tables = methods.map((x, index) =>
      PokemonForMoveTable({ moveId: moveId, method: x }, index)
    );

    return tables.filter((t) => t);
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-2 d-flex align-items-center">
          <Link to={"/moves"} className="text-capitalize">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to moves
          </Link>
        </div>
        <div className="col-8">
          <h1 className="display-3 text-capitalize text-center mb-4">
            {move?.name}
          </h1>
        </div>
        <div className="col-2"></div>
        <hr />
      </div>
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <p className="fst-italic mb-0">
                <span className="text-warning">{move?.name}</span> is a{" "}
                {move?.category} move added to Pokemon in Generation{" "}
                {move?.generationAdded}.
              </p>
            </div>
            <div className="card-body">
              <h2 className="mb-3">Effect</h2>
              {move?.effect && formatEffectText(move?.effect)}
              <h2 className="my-3">Flavor Text</h2>
              <p>{move?.flavorText}</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Move Details</h4>
            </div>
            <div className="card-body">
              <hr className="mb-0" />
              <table className="table">
                <tbody>
                  <tr>
                    <td>Power</td>
                    <td>{move?.power === 0 ? "-" : move?.power}</td>
                  </tr>
                  <tr>
                    <td>Accuracy</td>
                    <td>{move?.accuracy === 0 ? "-" : move?.accuracy}</td>
                  </tr>
                  <tr>
                    <td>PP</td>
                    <td>{move?.pp}</td>
                  </tr>
                  <tr>
                    <td>Effect Chance</td>
                    <td>
                      {move?.effectChance !== 0
                        ? `${move?.effectChance}%`
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>{move?.type && <TypeCard type={move?.type} />}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>
                      {move?.category && (
                        <RenderCategory category={move?.category} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Priority</td>
                    <td>
                      {move?.priority && move?.priority > 0
                        ? `+${move?.priority}`
                        : move?.priority === 0
                        ? "0"
                        : move?.priority}
                    </td>
                  </tr>
                  <tr>
                    <td>Machine</td>
                    <td>{move?.machine !== null ? move?.machine : "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Masonry className="row justify-content-center" columnClassName="col-6">
        {renderPokemonTables()}
      </Masonry>
    </div>
  );
};
