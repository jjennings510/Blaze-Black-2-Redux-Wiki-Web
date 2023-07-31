export const TypeCard: React.FC<{ type: string }> = (props) => {
  return (
    <div
      className={
        "card mx-1 type-card d-inline-block type-" + props.type.toLowerCase()
      }
    >
      <div className="d-flex justify-content-center align-items-center">
        <p className="card-title m-0 p-0 fw-bold font-monospace">
          {props.type}
        </p>
      </div>
    </div>
  );
};
