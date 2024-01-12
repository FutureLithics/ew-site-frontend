const Selector = ({
  collection,
  currentValue = "",
  handler,
  label,
  classes = "flex justify-between mb-2",
}) => {
  if (collection == null) {
    return <></>;
  }

  return (
    <div className={classes}>
      {label && <span className="me-2 align-middle font-bold">{label}</span>}
      <select
        onChange={handler}
        className="px-2 pe-4 shadow-sm shadow-baseBlue rounded cursor-pointer bg-slate-50 hover:bg-slate-100"
        value={currentValue}
      >
        {collection.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selector;
