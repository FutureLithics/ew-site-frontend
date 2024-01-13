const Paragraph = ({ component }) => {
  const { Heading, Image, Imageright, MainBody, ImageCaption } = component;
  const url = Image?.data?.attributes?.url;
  const alternativeText = Image?.data?.attributes?.alternativeText;

  const imageClasses =
    (Imageright ? " sm:float-right " : " sm:float-left ") +
    (Image && url ? " block " : " hidden ");
  const imageMargin = Imageright ? " sm:ms-4 " : " sm:me-4";

  return (
    <div className="paragraph-text-component w-full my-16">
      <h4 className="text-center sm:text-start text-2xl mb-4 sm:mb-1  font-extrabold">
        {Heading}
      </h4>
      <div className="relative">
        <div
          className={`${imageClasses} w-full md:w-1/5 md:h-1/5 m-0 sm:my-0 ${imageMargin}`}
        >
          <img
            src={url}
            alt={alternativeText}
            className="w-full md:max-h-60 object-contain my-1"
          />
          <p className="my-4 sm:my-1 text-center font-extrabold text-sm">
            {ImageCaption}
          </p>
        </div>
        <p className="text-center sm:text-start">{MainBody}</p>
      </div>
    </div>
  );
};

export default Paragraph;
