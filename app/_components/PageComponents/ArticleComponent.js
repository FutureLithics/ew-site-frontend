"use client";
import ArticleHeader from "../Article/ArticleHeader";
import Paragraph from "../Article/Paragraph";
import Image from "../Article/Image";
import Embed from "../Article/Embed";
import LinkList from "../Article/LinkList";

const determineComponent = (component) => {
  if (!component) {
    return;
  }

  return component.__component.split(".")[1];
};

const returnCorrectComponent = (component) => {
  const type = determineComponent(component);

  if (type) {
    switch (type) {
      case "paragraph":
        return (
          <Paragraph
            component={component}
            key={`${component.__component}-${component.id}`}
          />
        );
      case "image":
        return (
          <Image
            component={component}
            key={`${component.__component}-${component.id}`}
          />
        );
      case "video-embed":
        return (
          <Embed
            component={component}
            key={`${component.__component}-${component.id}`}
          />
        );
      case "link-list":
        return (
          <LinkList
            component={component}
            key={`${component.__component}-${component.id}`}
          />
        );
      default:
        return <p>No Component For Type</p>;
    }
  }
};

const ArticleComponent = async ({ data }) => {
  const { ArticleComponent } = data.data[0]?.attributes;

  return (
    <article className="w-full">
      <ArticleHeader attributes={data.data[0]?.attributes} />
      {ArticleComponent.map((component) => {
        return returnCorrectComponent(component);
      })}
    </article>
  );
};

export default ArticleComponent;
