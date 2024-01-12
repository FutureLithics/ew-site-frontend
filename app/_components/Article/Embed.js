const Image = ({ component }) => {
  const { LinkURL, LinkTitle, Description } = component.Link;

  return (
    <div className="embed-component w-full my-16">
      <div className="relative">
        <h4 className="w-full text-center text-2xl mb-4 font-extrabold">
          {LinkTitle}
        </h4>
        <div
          className={`w-auto max-h-screen m-0 sm:my-0 flex flex-col items-center justify-center`}
        >
          <iframe
            width="560"
            height="315"
            src={LinkURL}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <p className="w-full sm:w-2/3 mt-8 text-center font-extrabold text-sm">
            {Description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Image;
