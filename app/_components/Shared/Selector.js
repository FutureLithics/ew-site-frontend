const Selector = ({
    collection,
    currentValue = null,
    handler,
    label,
    classes = "flex justify-between mb-2",
}) => {
    if (collection == null) {
        return <></>;
    }

    return (
        <div className={classes}>
            <span className="me-2 align-middle font-bold">{label}</span>
            <select
                onChange={handler}
                className="ps-4 shadow-md shadow-slate-200 border-radius-5 cursor-pointer hover:bg-slate-50"
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
