import { Button, ButtonGroup } from "react-bootstrap";
import {
  calculateTypeEffectiveness,
  orderedTypes,
} from "../../../../Utils/TypeChart";
import * as React from "react";
import { useState, useEffect } from "react";
import AbilityModel from "../../../../models/Ability/AbilityModel";

export const TypeChart: React.FC<{
  types: string[];
  abilities: AbilityModel[];
}> = (props) => {
  const [currentAbility, setcurrentAbility] = useState(props.abilities[0]);
  const [areAbilitiesLoading, setAreAbilitiesLoading] = useState(true);

  useEffect(() => {
    if (props.abilities[0] !== null) {
      setAreAbilitiesLoading(false);
      setcurrentAbility(props.abilities[0]);
    }
  }, [props.abilities]);

  const calculateEffectiveness = (offense: string) => {
    return calculateTypeEffectiveness(
      props.types,
      offense,
      currentAbility?.name
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <ButtonGroup className="mb-2 justify-content-center">
          {props.abilities
            .filter(
              (value, index, array) =>
                array.map((x) => x.name).indexOf(value.name) === index
            )
            .map((ability, index) => (
              <Button
                active={ability === currentAbility}
                variant="secondary"
                onClick={() => setcurrentAbility(ability)}
                key={index}
              >
                {ability.name}
              </Button>
            ))}
        </ButtonGroup>
      </div>
      <div className="d-none d-xxl-block">
        <div className="row g-0 text-center mb-3">
          {orderedTypes.slice(0, 9).map((e, index) => (
            <div className="col" key={index}>
              <div className={"type-chart-cell type-" + e.name}>
                {e.accronym}
              </div>
              <div
                className={
                  "type-chart-cell type-" +
                  calculateEffectiveness(e.name).className
                }
              >
                {calculateEffectiveness(e.name).valueStr}
              </div>
            </div>
          ))}
        </div>
        <div className="row g-0 text-center mb-3">
          {orderedTypes.slice(9).map((e, index) => (
            <div className="col" key={index}>
              <div className={"type-chart-cell type-" + e.name}>
                {e.accronym}
              </div>
              <div
                className={
                  "type-chart-cell type-" +
                  calculateEffectiveness(e.name).className
                }
              >
                {calculateEffectiveness(e.name).valueStr}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-xxl-none">
        <div className="row g-0 text-center mb-1">
          {orderedTypes.slice(0, 6).map((e, index) => (
            <div className="col" key={index}>
              <div className={"type-chart-cell type-" + e.name}>
                {e.accronym}
              </div>
              <div
                className={
                  "type-chart-cell type-" +
                  calculateEffectiveness(e.name).className
                }
              >
                {calculateEffectiveness(e.name).valueStr}
              </div>
            </div>
          ))}
        </div>
        <div className="row g-0 text-center mb-1">
          {orderedTypes.slice(6, 12).map((e, index) => (
            <div className="col" key={index}>
              <div className={"type-chart-cell type-" + e.name}>
                {e.accronym}
              </div>
              <div
                className={
                  "type-chart-cell type-" +
                  calculateEffectiveness(e.name).className
                }
              >
                {calculateEffectiveness(e.name).valueStr}
              </div>
            </div>
          ))}
        </div>
        <div className="row g-0 text-center mb-1">
          {orderedTypes.slice(12).map((e, index) => (
            <div className="col" key={index}>
              <div className={"type-chart-cell type-" + e.name}>
                {e.accronym}
              </div>
              <div
                className={
                  "type-chart-cell type-" +
                  calculateEffectiveness(e.name).className
                }
              >
                {calculateEffectiveness(e.name).valueStr}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
