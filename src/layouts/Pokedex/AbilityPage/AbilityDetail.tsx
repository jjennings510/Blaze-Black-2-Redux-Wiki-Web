import { useState, useEffect } from "react";
import AbilityDetailModel from "../../../models/Ability/AbilityDetailModel";
import { PokemonAbilityTable } from "./components/PokemonAbilityTable";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AbilityDetail = () => {
  // Ability State
  const [ability, setAbility] = useState<AbilityDetailModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const abilityId = +window.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/abilities/${abilityId}`)
      .then((response) => response.json())
      .then((data) => {
        const loadedAbility: AbilityDetailModel = {
          id: data.id,
          identifier: data.identifier,
          name: data.name,
          flavorText: data.flavorText,
          effect: data.effect,
          shortEffect: data.shortEffect,
          generationAdded: data.generationAdded,
        };
        console.log(loadedAbility);
        setAbility(loadedAbility);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setHttpError(httpError);
      });
  }, [abilityId]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-4 d-flex align-items-center">
          <Link to={"/abilities"} className="text-capitalize">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to abilities
          </Link>
        </div>
        <div className="col-8">
          <h1 className="display-3 text-capitalize fw-semibold">
            {ability?.name}
          </h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-6">
          <div className="card">
            <div className="card-header">
              <p className="fst-italic mb-0">
                <span className="text-warning">{ability?.name}</span> is an ability added to Pokemon in Generation{" "}
                {ability?.generationAdded}.
              </p>
            </div>
            <div className="card-body">
              <h2 className="card-title">Effect</h2>
              {ability?.effect
                .replaceAll("\n", "  ")
                .split("  ")
                .map((x, index) => (
                  <p key={index}>{x}</p>
                ))}
              <h2>Flavor Text</h2>
              <p>{ability?.flavorText}</p>
            </div>
          </div>
        </div>
        <div className="col-6">
          <h2>Obtainable by</h2>
          <PokemonAbilityTable abilityId={abilityId} />
        </div>
      </div>
    </div>
  );
};
