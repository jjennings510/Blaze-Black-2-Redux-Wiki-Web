import { useState, useEffect } from "react";
import SpriteModel from "../../../models/SpriteModel";
import { BaseStatsTable } from "./components/BaseStatsTable";
import { TypeChart } from "./components/TypeChart";
import BaseStatsModel from "../../../models/Pokemon/BaseStatsModel";
import PokemonDetailModel from "../../../models/Pokemon/PokemonDetailModel";
import { MoveTable } from "./components/MoveTable";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { TypeCard } from "./components/TypeCard";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AbilityModel from "../../../models/Ability/AbilityModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import PokemonModel from "../../../models/Pokemon/PokemonModel";
import PokemonSpeciesModel from "../../../models/Pokemon/PokemonSpeciesModel";
import { Search } from "../../NavbarAndFooter/components/Search";

export const PokemonDetail = () => {
  // Pokemon State
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpeciesModel>();
  const [previousPokemonName, setPreviousPokemonName] = useState("");
  const [nextPokemonName, setNextPokemonName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Sprites state
  const [sprite, setSprite] = useState<SpriteModel>();
  const [areSpritesLoading, setAreSpritesLoading] = useState(true);

  // Pokemon Varieties
  const [pokemon, setPokemon] = useState<PokemonModel[]>([]);
  const [isPokemonLoading, setIsPokemonLoading] = useState(true);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonModel>();

  // Base Stats state
  const [baseStats, setBaseStats] = useState<BaseStatsModel>();
  const [areBaseStatsLoading, setAreBaseStatsLoading] = useState(true);

  // Ability + Typing
  const [abilities, setAbilities] = useState<AbilityModel[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const [speciesId, setspeciesId] = useState(
    +window.location.pathname.split("/")[2]
  );

  const { pathname } = useLocation();

  // Get species id on pathname change
  useEffect(() => {
    setspeciesId(+pathname.split("/")[2]);
  }, [pathname]);

  // Get pokemon sepcies
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/pokemonSpecies/${speciesId}`)
      .then((response) => response.json())
      .then((data) => {
        const loadedPokemonSpecies: PokemonSpeciesModel = {
          id: data.id,
          name: data.name,
          number: data.number,
          hasGenderDifferences: data.hasGenderDifferences,
          genus: data.genus,
          isMythical: data.isMythical,
          isLegendary: data.isLegendary,
        };
        setPokemonSpecies(loadedPokemonSpecies);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setHttpError(err.message);
      });
  }, [speciesId]);

  // Get varieties of species
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API}/pokemon/search/findBySpeciesId?speciesId=${speciesId}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        const data = responseData._embedded.pokemon;
        const loadedPokemon: PokemonModel[] = [];
        for (const key in data) {
          loadedPokemon.push({
            id: data[key].id,
            name: data[key].name,
            formName: data[key].formName,
            number: data[key].number,
          });
          setPokemon(loadedPokemon);
          setCurrentPokemon(loadedPokemon[0]);
          setIsPokemonLoading(false);
        }
      })
      .catch((error: any) => {
        setIsPokemonLoading(false);
        setHttpError(error.message);
      });
  }, [speciesId]);

  // Get pokemon details
  useEffect(() => {
    if (!isPokemonLoading) {
      fetch(
        `${process.env.REACT_APP_API}/pokemon/get/details?pokemonId=${currentPokemon?.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          const loadedDetails: PokemonDetailModel = {
            pokemon: data.pokemon,
            types: data.types,
          };
          setPreviousPokemonName(data.previousPokemonName);
          setNextPokemonName(data.nextPokemonName);
          setTypes(loadedDetails.types);
          setAreSpritesLoading(false);
        })
        .catch((error: any) => {
          setAreSpritesLoading(false);
          setHttpError(error.message);
        });
    }
  }, [currentPokemon]);

  // Get base stats
  useEffect(() => {
    if (!isPokemonLoading) {
      fetch(`${process.env.REACT_APP_API}/baseStats/${currentPokemon?.id}`)
        .then((response) => response.json())
        .then((data) => {
          const loadedDetails: BaseStatsModel = data;
          setBaseStats(loadedDetails);
        })
        .catch((error: any) => {
          setAreBaseStatsLoading(false);
          setHttpError(error.message);
        });
    }
  }, [currentPokemon]);

  // Get abilities
  useEffect(() => {
    if (!isPokemonLoading) {
      fetch(
        `${process.env.REACT_APP_API}/abilities/get/for/pokemonId?pokemonId=${currentPokemon?.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          const loadedDetails: AbilityModel[] = data;
          setAbilities(loadedDetails);
        })
        .catch((error: any) => {
          setAreSpritesLoading(false);
          setHttpError(error.message);
        });
    }
  }, [currentPokemon]);

  // Get artwork
  useEffect(() => {
    if (!isPokemonLoading) {
      fetch(
        `${process.env.REACT_APP_API}/sprites/search/findFirstByPokemonIdAndSpriteType?pokemonId=${currentPokemon?.id}&spriteType=artwork`
      )
        .then((response) => response.json())
        .then((data) => {
          const loadedSprite: SpriteModel = data;
          setSprite(loadedSprite);
        })
        .catch((error: any) => {
          setAreSpritesLoading(false);
          setHttpError(error.message);
        });
    }
  }, [currentPokemon]);

  if (isLoading || isPokemonLoading || areSpritesLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return <div>{httpError}</div>;
  }

  const handleTabChange = (index: number) => {
    setCurrentPokemon(pokemon[index]);
  };

  return (
    <div>
      {/* Desktop */}
      <div className="container d-none d-lg-block">
        {/* Top row - Names + navigation */}
        <div className="row mt-4">
          <Link to={`/pokemon`} className="text-capitalize">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Pokedex
          </Link>
          <div className="col-2 d-flex align-items-center">
            {speciesId && speciesId > 1 && (
              <Link
                to={`/pokemon/${speciesId - 1}`}
                onClick={() => setspeciesId(speciesId - 1)}
                className="text-capitalize"
              >
                <FontAwesomeIcon icon={faArrowLeft} />{" "}
                {pokemonSpecies &&
                  (pokemonSpecies?.number - 1)
                    ?.toString()
                    .padStart(3, "0")}{" "}
                - {previousPokemonName}
              </Link>
            )}
          </div>
          <div className="col-8">
            <h1 className="display-3 text-capitalize text-center fw-semibold">
              {currentPokemon?.name}
            </h1>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-end">
            {pokemonSpecies && pokemonSpecies?.number < 649 && (
              <Link
                to={`/pokemon/${speciesId + 1}`}
                onClick={() => setspeciesId(speciesId + 1)}
                className="text-capitalize"
              >
                {pokemonSpecies &&
                  (pokemonSpecies?.number + 1)
                    ?.toString()
                    .padStart(3, "0")}{" "}
                - {nextPokemonName} <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            )}
          </div>
        </div>
        <div>
          <ul className="nav nav-tabs fw-semibold">
            {pokemon.map((p, index) => (
              <li className="nav-item" key={p.id}>
                <a
                  href="#"
                  aria-current="page"
                  className={
                    "nav-link text-capitalize " +
                    (p === currentPokemon ? "active" : "")
                  }
                  id={`${p.formName}`}
                  data-bs-toggle="tab"
                  onClick={() => handleTabChange(index)}
                >
                  {p.formName}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="row mt-4">
          <div className="col-4">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center mb-0">Pokedex Data</h2>
              </div>
              <div className="card-body">
                <table className="table fw-semibold align-middle">
                  <tbody>
                    <tr>
                      <td className="col-4">Number</td>
                      <td>
                        {(pokemonSpecies && pokemonSpecies?.number)
                          ?.toString()
                          .padStart(3, "0")}
                      </td>
                    </tr>
                    <tr>
                      <td className="col-4">Type</td>
                      <td>
                        <div className="d-flex">
                          {types.map((type, index) => (
                            <TypeCard type={type} key={index} />
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-4">Abililties</td>
                      <td>
                        <ol className="ps-3">
                          {abilities.map((ability, index) => (
                            <li key={index}>
                              <OverlayTrigger
                                delay={{ show: 350, hide: 400 }}
                                overlay={
                                  <Tooltip className="tooltip-left">
                                    {ability.shortEffect}
                                  </Tooltip>
                                }
                                placement="left"
                              >
                                <Link to={`/abilities/${ability.id}`}>
                                  {ability.name}
                                </Link>
                              </OverlayTrigger>
                              {ability.hiddenAbility && (
                                <span className="fst-italic fw-normal text-body-secondary">
                                  {" "}
                                  (Hidden ability)
                                </span>
                              )}
                            </li>
                          ))}
                        </ol>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-4">Genus</td>
                      <td>{pokemonSpecies?.genus}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="text-center">
              {sprite?.image ? (
                <img
                  src={`data:image/png;base64,${sprite.image}`}
                  alt="Pokemon sprite"
                  className="pokemon-artwork"
                />
              ) : (
                <img
                  src={require("../../Images/Placeholders/0.png")}
                  alt="Pokemon Sprite"
                  className="pokemon-sprite"
                />
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-8">
            <h2 className="text-center mb-3">Base Stats</h2>
            <hr className="mb-0" />
            {baseStats ? (
              <BaseStatsTable baseStats={baseStats} />
            ) : (
              <>
                <p>Looks like we couldnt find any stats!</p>
              </>
            )}
          </div>
          <div className="col-4">
            <h2 className="text-center mb-3">Defensive Type Chart</h2>
            <TypeChart types={types} abilities={abilities} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-6">
            <h2 className="text-center mb-3">Level Up Moveset</h2>
            <hr className="mb-0" />
            {currentPokemon?.id && (
              <MoveTable pokemonId={currentPokemon?.id} method="level-up" />
            )}
          </div>
          <div className="col-6">
            <h2 className="text-center mb-3">TM and Move Tutor Moveset</h2>
            <hr className="mb-0" />
            {currentPokemon?.id && (
              <MoveTable pokemonId={currentPokemon?.id} method="machine" />
            )}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="d-lg-none">
        <div className="container">
          <div className="row mt-4">
            <div className="col-6 d-flex justify-content-start">
              {speciesId && speciesId > 1 && (
                <Link
                  to={`/pokemon/${+speciesId - 1}`}
                  onClick={() => setspeciesId(speciesId - 1)}
                  className="text-capitalize"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />{" "}
                  {pokemonSpecies &&
                    (pokemonSpecies?.number - 1)
                      ?.toString()
                      .padStart(3, "0")}{" "}
                  - {previousPokemonName}
                </Link>
              )}
            </div>
            <div className="col-6 d-flex justify-content-end">
              {pokemonSpecies && pokemonSpecies?.number < 649 && (
                <Link
                  to={`/pokemon/${speciesId + 1}`}
                  onClick={() => setspeciesId(speciesId + 1)}
                  className="text-capitalize"
                >
                  {pokemonSpecies &&
                    (pokemonSpecies?.number + 1)
                      ?.toString()
                      .padStart(3, "0")}{" "}
                  - {nextPokemonName} <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              )}
            </div>
          </div>
          <div>
            <ul className="nav nav-tabs fw-semibold mt-4">
              {pokemon.map((p, index) => (
                <li className="nav-item" key={p.id}>
                  <a
                    href="#"
                    aria-current="page"
                    className={
                      "nav-link text-capitalize " +
                      (p === currentPokemon ? "active" : "")
                    }
                    id={`${p.formName}`}
                    data-bs-toggle="tab"
                    onClick={() => handleTabChange(index)}
                  >
                    {p.formName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            {sprite?.image ? (
              <img
                src={`data:image/png;base64,${sprite.image}`}
                alt="Pokemon sprite"
                className="card-img-top"
              />
            ) : (
              <img
                src={require("../../Images/Placeholders/0.png")}
                alt="Pokemon Sprite"
                className=""
              />
            )}
          </div>
          <div className="card mt-3">
            <div className="card-header">
              <h2 className="card-title text-center text-capitalize">
                {pokemonSpecies?.name}
              </h2>
            </div>
            <div className="card-body">
              <table className="table fw-semibold align-middle">
                <tbody>
                  <tr>
                    <td className="col-4">Number</td>
                    <td>
                      {(pokemonSpecies && pokemonSpecies?.number)
                        ?.toString()
                        .padStart(3, "0")}
                    </td>
                  </tr>
                  <tr>
                    <td className="col-4">Type</td>
                    <td>
                      <div className="d-flex">
                        {types.map((type, index) => (
                          <TypeCard type={type} key={index} />
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="col-4">Abililties</td>
                    <td>
                      <ol className="ps-3">
                        {abilities.map((ability, index) => (
                          <li key={index}>
                            <OverlayTrigger
                              delay={{ show: 350, hide: 400 }}
                              overlay={
                                <Tooltip className="tooltip-left">
                                  {ability.shortEffect}
                                </Tooltip>
                              }
                              placement="left"
                            >
                              <Link to={`/abilities/${ability.id}`}>
                                {ability.name}
                              </Link>
                            </OverlayTrigger>
                            {ability.hiddenAbility && (
                              <span className="fst-italic fw-normal text-body-secondary">
                                {" "}
                                (Hidden ability)
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </td>
                  </tr>
                  <tr>
                    <td className="col-4">Genus</td>
                    <td>{pokemonSpecies?.genus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h2 className="text-center my-3">Base Stats</h2>
          <hr className="mb-0" />
          {baseStats ? (
            <BaseStatsTable baseStats={baseStats} />
          ) : (
            <>
              <p>Looks like we couldnt find any stats!</p>
            </>
          )}

          <div className="my-3">
            <h2 className="text-center mb-3">Defensive Type Chart</h2>
            <TypeChart types={types} abilities={abilities} />
          </div>
          <div className="my-3">
            <h2 className="text-center mb-3">Level Up Moveset</h2>
            <hr className="mb-0" />
            {currentPokemon?.id && (
              <MoveTable
                pokemonId={currentPokemon?.id}
                method="level-up"
                mobile
              />
            )}
          </div>
          <div className="my-3">
            <h2 className="text-center mb-3">TM and Move Tutor Moveset</h2>
            <hr className="mb-0" />
            {currentPokemon?.id && (
              <MoveTable
                pokemonId={currentPokemon?.id}
                method="machine"
                mobile
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
