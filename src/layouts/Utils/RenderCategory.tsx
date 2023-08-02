export const RenderCategory: React.FC<{category: string, size?: string}> = (props) => {
  const width = props.size === "small" ? "56px" : "64px";
  const height = props.size === "small" ? "28px" : "32px";

  if (props.category === "physical") {
    return (
      <>
        <img
          src={require(`../Images/Moves/physical.png`)}
          alt="Physical"
          style={{ width: width, height: height}}
          className="mx-1"
        />
      </>
    );
  } else if (props.category === "special") {
    return (
      <>
        <img
          src={require(`../Images/Moves/special.png`)}
          alt="Special"
          style={{ width: width, height: height}}
          className="mx-1"
        />
      </>
    );
  } else if (props.category === "status") {
    return (
      <>
        <img
          src={require(`../Images/Moves/status.png`)}
          alt="Status"
          style={{ width: width, height: height}}
          className="mx-1"
        />
      </>
    );
  } else {
    return (
      <>
        <img
          src={require(`../Images/Placeholders/0.png`)}
          alt="Physical Move"
          className="pokemon-sprite mx-1"
          
        />
      </>
    );
  }
};
