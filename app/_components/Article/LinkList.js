const LinkList = ({ component, classes = "w-full my-16" }) => {
  const { Links, Heading } = component;

  return (
    <div className={`link-list ${classes} prose`}>
      <h4 className="w-full text-center sm:text-start text-2xl mb-4 font-extrabold">
        {Heading}
      </h4>
      <ul>
        {Links.map((link) => {
          return (
            <li key={`link-list-component-${link.id}`}>
              <a href={link.LinkURL} target="_blank">
                {link.LinkTitle}
              </a>
              <p className="mt-1 mb-2">{link.Description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LinkList;
