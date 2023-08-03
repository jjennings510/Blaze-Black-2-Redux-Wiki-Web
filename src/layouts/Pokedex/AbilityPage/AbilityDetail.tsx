import { useState, useEffect } from "react";
import AbilityDetailModel from "../../../models/Ability/AbilityDetailModel";
import { PokemonAbilityTable } from "./components/PokemonAbilityTable";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const AbilityDetail = () => {
  // Ability State
  const [ability, setAbility] = useState<AbilityDetailModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [abilityId, setAbilityId] = useState(
    +window.location.pathname.split("/")[2]
  );

  const { pathname } = useLocation();

  // Get species id on pathname change
  useEffect(() => {
    setAbilityId(+pathname.split("/")[2]);
  }, [pathname]);

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
    <div>
      {/* Desktop view */}
      <div className="d-none d-lg-block">
        <div className="container">
          <div className="row mt-4">
            <div className="col-4 d-flex align-items-center">
              <Link to={"/abilities"} className="text-capitalize">
                <FontAwesomeIcon icon={faArrowLeft} /> Back to abilities
              </Link>
            </div>
            <div className="col-8">
              <h1 className="display-3 text-capitalize fw-semibold mb-4">
                {ability?.name}
              </h1>
            </div>
            <hr />
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <p className="fst-italic mb-0">
                    <span className="text-warning">{ability?.name}</span> is an
                    ability added to Pokemon in Generation{" "}
                    {ability?.generationAdded}.
                  </p>
                </div>
                <div className="card-body">
                  <h2 className="card-title">Effect</h2>
                  {ability?.effect && (
                    <ReactMarkdown
                      children={ability?.effect}
                      remarkPlugins={[remarkGfm]}
                    />
                  )}
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
      </div>
      {/* Mobile view */}
      <div className="d-lg-none">
        <div className="container">
          <div className="col-6 d-flex align-items-center mt-4">
            <Link to={"/abilities"} className="text-capitalize">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to abilities
            </Link>
          </div>

          <h1 className="display-3 text-capitalize text-center fw-semibold my-4">
            {ability?.name}
          </h1>
          <hr />
          <div className="card">
            <div className="card-header">
              <p className="fst-italic mb-0">
                <span className="text-warning">{ability?.name}</span> is an
                ability added to Pokemon in Generation{" "}
                {ability?.generationAdded}.
              </p>
            </div>
            <div className="card-body">
              <h2 className="card-title">Effect</h2>
              {ability?.effect && (
                    <ReactMarkdown
                      children={ability?.effect}
                      remarkPlugins={[remarkGfm]}
                    />
                  )}
              <h2>Flavor Text</h2>
              <p>{ability?.flavorText}</p>
            </div>
          </div>
          <h2 className="text-center mt-4">Obtainable by</h2>
          <PokemonAbilityTable abilityId={abilityId} mobile />
        </div>
      </div>
    </div>
  );
};
