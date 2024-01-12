'use client';
import ArticleHeader from '../Article/ArticleHeader';
import Paragraph from '../Article/Paragraph';

const determineComponent = (component) => {
    if (!component) {
        return;
    }

    return component.__component.split(".")[1];
}

const returnCorrectComponent = (component) => {
    const type = determineComponent(component);

    if (type) {
        switch(type){
            case 'paragraph':
                return <Paragraph component={component}/>
                break;
            default:
                return <p>No Component For Type</p>;

        }
    }
}

const ArticleComponent = async ({attributes}) => {

    const { ArticleComponent } = attributes;

    console.log(ArticleComponent);

    return (
        <article className="w-full">
            <ArticleHeader attributes={attributes} />
            {
                ArticleComponent.map((component) => {
                    return returnCorrectComponent(component);
                })
            }
        </article>
    );
};

export default ArticleComponent;