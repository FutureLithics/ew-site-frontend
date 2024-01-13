import TaxonomyList from "./widgets/TaxonomyList";

const Footer = () => {
  return (
    <div>
      <div className="absolute bottom-0 bg-baseGreen w-screen text-white grid grid-cols-1 sm:grid-cols-3">
        <div className="p-4 m-8">
          <h2 className="font-serif font-extrabold content-center text-xl">
            Emily Williams
          </h2>
          <p className="font-bold content-center text-lg">Household Finance</p>
        </div>
        <div className="p-4 m-8">
          <TaxonomyList />
        </div>
        <div className="p-4 m-8"></div>
      </div>
    </div>
  );
};

export default Footer;
