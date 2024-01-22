import TaxonomyList from "./widgets/TaxonomyList";

const Footer = () => {
  return (
    <div className="absolute bottom-0 bg-zinc-700  w-screen text-white mt-16 md:mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-4 flex justify-center md:justify-start sm:my-8 sm:mx-3">
          <div>
            <h2 className="font-serif font-extrabold content-center text-2xl">
              Emily Williams
            </h2>
            <p className="font-bold content-center text-lg">
              Household Finance
            </p>
          </div>
        </div>
        <div className="p-4 flex justify-center sm:mx-3 sm:my-8">
          <div>
            <TaxonomyList />
          </div>
        </div>
        <div className="p-4 flex justify-center sm:mx-3 sm:my-8">
          <div></div>
        </div>
      </div>
      <div className="w-full text-end px-4 py-2 text-sm">
        <p>
          Site powered by:
          <a
            href="https://futurelithics.com"
            target="_blank"
            className="ps-2 text-amber-400 hover:text-amber-600"
          >
            Future Lithics LLC
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
