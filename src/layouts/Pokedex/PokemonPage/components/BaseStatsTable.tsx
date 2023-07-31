import BaseStatsModel from "../../../../models/Pokemon/BaseStatsModel";
import ProgressBar from "react-bootstrap/ProgressBar";

export const BaseStatsTable: React.FC<{ baseStats: BaseStatsModel }> = (
  props
) => {
  const setBarColor = (stat: number) => {
    if (stat < 50) {
      return "bad-stat";
    } else if (stat >= 50 && stat < 75) {
      return "okay-stat";
    } else if (stat >= 75 && stat < 100) {
      return "decent-stat";
    } else if (stat >= 100 && stat < 120) {
      return "good-stat";
    } else {
      return "amazing-stat";
    }
  };

  return (
    <table className="table align-middle fw-semibold">
      <tbody>
        <tr>
          <td className="col-1">HP</td>
          <td className="col-10">
            <ProgressBar
              now={props.baseStats.hp}
              max={200}
              className={setBarColor(props.baseStats.hp)}
            ></ProgressBar>
          </td>
          <td>{props.baseStats.hp}</td>
        </tr>
        <tr>
          <td className="col-1">Attack</td>
          <td className="col-10">
            <ProgressBar
              now={props.baseStats.attack}
              max={200}
              className={setBarColor(props.baseStats.attack)}
            ></ProgressBar>
          </td>
          <td>{props.baseStats.attack}</td>
        </tr>
        <tr>
          <td className="col-1">Defense</td>
          <td className="col-10">
            <ProgressBar
              now={props.baseStats.defense}
              max={200}
              className={setBarColor(props.baseStats.defense)}
            ></ProgressBar>
          </td>
          <td>{props.baseStats.defense}</td>
        </tr>
        <tr>
          <td className="col-1">Sp. Atk</td>
          <td className="col-10">
            <ProgressBar
              now={props.baseStats.specialAttack}
              max={200}
              className={setBarColor(props.baseStats.specialAttack)}
            ></ProgressBar>
          </td>
          <td>{props.baseStats.specialAttack}</td>
        </tr>
        <tr>
          <td className="col-1">Sp. Def</td>
          <td className="col-10">
            <ProgressBar
              now={props.baseStats.specialDefense}
              max={200}
              className={setBarColor(props.baseStats.specialDefense)}
            ></ProgressBar>
          </td>
          <td>{props.baseStats.specialDefense}</td>
        </tr>
        <tr>
          <td className="col-1">Speed</td>
          <td className="col-10">
            <ProgressBar
              now={props.baseStats.speed}
              max={200}
              className={setBarColor(props.baseStats.speed)}
            ></ProgressBar>
          </td>
          <td>{props.baseStats.speed}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td></td>
          <td>{props.baseStats.bst}</td>
        </tr>
      </tbody>
    </table>
  );
};
