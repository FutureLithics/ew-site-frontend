const Loader = () => {
  return (
    <div className="w-full pt-12 flex justify-center content-center">
      <div className="p-4 flex items-center w-50 border-radius-20 bg-slate-50">
        <img src="/tube-spinner.svg" alt="spinner" width="40px" height="40px" />
        <p className="ps-4 m-0 inline-block align-middle">
          Please wait while retrieving data...
        </p>
      </div>
    </div>
  );
};

export default Loader;
