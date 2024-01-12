const Image = ({ component }) => {
  const { Image, Caption } = component;
  const { url, alternativeText } = Image?.data?.attributes;

  return (
    <div className="image-component w-full my-16">
      <div className="relative">
        <div
          className={`w-auto max-h-screen m-0 sm:my-0 flex flex-col items-center justify-center`}
        >
          <img
            src={url}
            alt={alternativeText}
            className="max-w-full max-h-screen object-contain my-1"
          />
          <p className="my-4 sm:my-1 text-center font-extrabold text-sm">
            {Caption}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Image;
