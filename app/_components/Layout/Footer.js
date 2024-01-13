import TaxonomyList from "./widgets/TaxonomyList";

const Footer = () => {
  return (
    <div>
      <div className="absolute bottom-0 bg-baseGreen w-screen text-white grid grid-cols-1 md:grid-cols-3">
        <div className="p-4 flex justify-center md:justify-start sm:my-8 sm:mx-3">
			<div>
				<h2 className="font-serif font-extrabold content-center text-xl">
					Emily Williams
				</h2>
				<p className="font-bold content-center text-lg">Household Finance</p>				
			</div>
        </div>
        <div className="p-4 flex justify-center sm:mx-3 sm:my-8">
			<div>
		          <TaxonomyList />				
			</div>
        </div>
        <div className="p-4 flex justify-center sm:mx-3 sm:my-8">
			<div>

			</div>
		</div>
      </div>
    </div>
  );
};

export default Footer;
