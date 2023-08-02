export const TypeCard: React.FC<{ type: string; size?: string }> = (props) => {
  return (
    <div
      className={`card m-1 type-card type-card-${
        props.size
      } d-inline-block type-${props.type.toLowerCase()} align-middle`}
    >
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <p className="card-title m-0 p-0 fw-bold font-monospace">
            {props.type}
          </p>
        </div>
      </div>
    </div>
  );
};
