import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Search = ({inputHandler, submitHandler, placeholder = ''}) => {
    return (
        <div className="w-full my-1 sm:my-0 sm:w-1/4 search-bar-filter inline-flex relative rounded shadow-sm shadow-baseBlue">
            <input
                className="w-full h-full px-2 bg-slate-50 rounded hover:bg-slate-100 outline-0"
                onChange={(e) => inputHandler(e.target.value)}
                placeholder={placeholder}
            />
            <button
                className="min-h-full px-2 flex rounded-tr rounded-br justify-center content-center bg-slate-200 hover:bg-slate-300"
                onClick={submitHandler}
            >
                <MagnifyingGlassIcon className="w-4 h-4 baseBlue self-center" />
            </button>
        </div>       
    );
}

export default Search;