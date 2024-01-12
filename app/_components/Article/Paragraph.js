const Paragraph = ({component}) => {
    const { Heading, Image, ImageRight, MainBody, ImageCaption } = component;
    const { url, alternativeText } = Image?.data?.attributes;

    const imageClasses = ImageRight ? " float-right " : " float-right " + Image ? " block " : " none "

    return (
        <div className="w-full min-w-full">
            <h4>{Heading}</h4>
            <div className="relative">
                <div className={`${imageClasses} w-1/4 h-1/4`}>
                    <img src={url} alt={alternativeText} className="w-full h-full object-cover my-1"/>
                    <p className="text-center">{ImageCaption}</p>
                </div>
                <p>{MainBody}</p>
            </div>
        </div>
    )
}

export default Paragraph;