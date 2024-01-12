import Card from "./Card";

const PostsContainer = ({posts, total, loadHandler}) => {
    return (
        <div className="w-full posts-container">
            <div className="w-full">
                <div className="py-4">
                    <span className="font-extrabold">
                        Showing {posts.length} out of {total} posts
                    </span>
                </div>
            </div>
            <div className="card-container w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-24">
                {posts.map((post) => {
                    const id = post.id;
                    const attributes = post.attributes;

                    if (id && attributes) {
                        return <Card id={id} attributes={attributes} />;
                    }
                })}
            </div>
            <div className="w-full text-center mt-32">
                {
                    (posts.length < total && total > 0) &&                 
                    <button 
                        className="py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-black text-xl outline-none"
                        onClick={() => loadHandler(true)}
                    >
                            Load More
                    </button>
                }
            </div>
        </div>
    );
}

export default PostsContainer;