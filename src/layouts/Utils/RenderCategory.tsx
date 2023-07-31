export const RenderCategory: React.FC<{category: string}> = (props) => {
  if (props.category === "physical") {
    return (
      <>
        <img
          src={require(`../Images/Moves/physical.png`)}
          alt="Physical"
          style={{ width: "69px", height: "35px" }}
        />
      </>
    );
  } else if (props.category === "special") {
    return (
      <>
        <img
          src={require(`../Images/Moves/special.png`)}
          alt="Special"
          style={{ width: "69px", height: "35px" }}
        />
      </>
    );
  } else if (props.category === "status") {
    return (
      <>
        <img
          src={require(`../Images/Moves/status.png`)}
          alt="Status"
          style={{ width: "69px", height: "35px" }}
        />
      </>
    );
  } else {
    return (
      <>
        <img
          src={require(`../Images/Placeholders/0.png`)}
          alt="Physical Move"
          className="pokemon-sprite"
        />
      </>
    );
  }
};
