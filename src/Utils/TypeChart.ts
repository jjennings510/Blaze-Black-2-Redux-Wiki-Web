export const Type = {
  normal: {
    name: "normal",
    accronym: "nor",
  },
  fighting: {
    name: "fighting",
    accronym: "fgh",
  },
  flying: {
    name: "flying",
    accronym: "fly",
  },
  poison: {
    name: "poison",
    accronym: "psn",
  },
  ground: {
    name: "ground",
    accronym: "gnd",
  },
  rock: {
    name: "rock",
    accronym: "rck",
  },
  bug: {
    name: "bug",
    accronym: "bug",
  },
  ghost: {
    name: "ghost",
    accronym: "gst",
  },
  steel: {
    name: "steel",
    accronym: "stl",
  },
  fire: {
    name: "fire",
    accronym: "fir",
  },
  water: {
    name: "water",
    accronym: "wat",
  },
  grass: {
    name: "grass",
    accronym: "gra",
  },
  electric: {
    name: "electric",
    accronym: "ele",
  },
  psychic: {
    name: "psychic",
    accronym: "psy",
  },
  ice: {
    name: "ice",
    accronym: "ice",
  },
  dragon: {
    name: "dragon",
    accronym: "drg",
  },
  dark: {
    name: "dark",
    accronym: "drk",
  },
  fairy: {
    name: "fairy",
    accronym: "fai",
  },
  none: {
    name: "none",
    accronym: "N/A",
  },
};

export const orderedTypes = [
  Type.normal,
  Type.fire,
  Type.water,
  Type.electric,
  Type.grass,
  Type.ice,
  Type.fighting,
  Type.poison,
  Type.ground,
  Type.flying,
  Type.psychic,
  Type.bug,
  Type.rock,
  Type.ghost,
  Type.dragon,
  Type.dark,
  Type.steel,
  Type.fairy,
] as const;

type Type = typeof Type;

// prettier-ignore
export const typeChart = [
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.0, 1.0, 1.0, 0.5, 1.0],
    [1.0, 0.5, 0.5, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0],
    [1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0],
    [1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0],
    [1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 0.5, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 0.5, 1.0],
    [1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0],
    [2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5, 0.5, 0.5, 2.0, 0.0, 1.0, 2.0, 2.0, 0.5],
    [1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 0.0, 2.0],
    [1.0, 2.0, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0],
    [1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0],
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.0, 0.5, 1.0],
    [1.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.5, 0.5, 1.0, 0.5, 2.0, 1.0, 1.0, 0.5, 1.0, 2.0, 0.5, 0.5],
    [1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0],
    [0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0],
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 0.0],
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5],
    [1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0],
    [1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 0.5, 1.0],
  ];

export const calculateTypeEffectiveness = (
  defense: string[],
  offense: string,
  ability: string
) => {
  let x = orderedTypes.findIndex((t) => t.name === offense);
  let y = orderedTypes.findIndex((t) => t.name === defense[0]?.toLowerCase());

  let result = typeChart[x][y];

  if (defense.length > 1) {
    y = orderedTypes.findIndex((t) => t.name === defense[1]?.toLowerCase());
    result *= typeChart[x][y];
  }

  result *= calculateAbilityEffect(ability, offense);

  let className = "";
  let valueStr = "";

  if (result === 4) {
    className = "4x-weakness";
    valueStr = "4";
  } else if (result === 2) {
    className = "weakness";
    valueStr = "2";
  } else if (result === 0.5) {
    className = "resistance";
    valueStr = String.fromCharCode(189);
  } else if (result === 0.25) {
    className = "4x-resistance";
    valueStr = String.fromCharCode(188);
  } else if (result === 0) {
    className = "immunity";
    valueStr = "0";
  } else {
    className = "neutral";
    valueStr = "-";
  }

  return { result, className, valueStr };
};

const calculateAbilityEffect = (ability: string, offense: string) => {
  switch (ability?.toLowerCase()) {
    case "heatproof":
      if (Type.fire.name === offense) {
        return 0.5;
      }
      break;
    case "water bubble":
      if (Type.water.name === offense) {
        return 0.5;
      }
      break;
    case "thick fat":
      if (Type.fire.name === offense || Type.ice.name === offense) {
        return 0.5;
      }
      break;
    case "levitate":
      if (Type.ground.name === offense) {
        return 0;
      }
      break;
    case "flash fire":
      if (Type.fire.name === offense) {
        return 0;
      }
      break;
    case "dry skin":
      if (Type.fire.name === offense) {
        return 1.25;
      } else if (Type.water.name === offense) {
        return 0;
      }
      break;
    case "storm drain":
      if (Type.water.name === offense) {
        return 0;
      }
      break;
    case "water absorb":
      if (Type.water.name === offense) {
        return 0;
      }
      break;
    case "sap sipper":
      if (Type.grass.name === offense) {
        return 0;
      }
      break;
    case "lightning rod":
      if (Type.electric.name === offense) {
        return 0;
      }
      break;
    case "motor drive":
      if (Type.electric.name === offense) {
        return 0;
      }
      break;
    case "volt absorb":
      if (Type.electric.name === offense) {
        return 0;
      }
      break;
  }
  return 1;
};
