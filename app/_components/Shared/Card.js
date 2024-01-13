import Link from "next/link";

const CardContent = ({ attributes }) => {
  const { FeaturedImage, Excerpt, Title } = attributes;
  const { url, alternativeText } = FeaturedImage?.data?.attributes;

  return (
    <div className="card w-full rounded-lg shadow-md shadow-slate-300 ">
      <div className="card-image relative w-full h-1/2 border-b-4 border-accentPurple overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
          src={url}
          alt={alternativeText}
        />
      </div>
      <div className="card-section w-full h-1/2 p-4">
        <h5 className="text-xl font-black mb-2 text-center">{Title}</h5>
        <p className="text-md">{Excerpt}</p>
      </div>
    </div>
  );
};

const Card = ({ attributes }) => {
  const { LinkURL, Slug } = attributes;

  if (LinkURL) {
    return (
      <a href={LinkURL} target="_blank">
        <CardContent attributes={attributes} />
      </a>
    );
  } else {
    return (
      <Link href={`/blog/${Slug}`}>
        <CardContent attributes={attributes} />
      </Link>
    );
  }
};

export default Card;
