import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";

// add support for underline text from the Rich Text Formatter
import rehypeRaw from "rehype-raw";

const ContactListItems = ({ sections }) => {
  return (
    <div className="self-center">
      {sections.map((section) => {
        const Icon = section.Icon;
        if (section.key == "cv-resume") {
          return (
            <li key={section.key} className="flex">
              <div className="flex pe-2">
                <Icon className="w-4 h-4 self-center" />
              </div>
              <a href={section.text} className="text-amber-500">
                CV/Resume
              </a>
            </li>
          );
        } else {
          return (
            <li key={section.key} className="flex">
              <div className="flex pe-2">
                <Icon className="w-4 h-4 self-center" />
              </div>
              <div>{section.text}</div>
            </li>
          );
        }
      })}
    </div>
  );
};

const MainContentSection = ({ content }) => {
  return (
    <>
      <ReactMarkdown className="rich-text prose" rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </>
  );
};

const FrontPageWidget = ({ content }) => {
  const { MainIntroClassic, Photo, Header, CvResume, SecondaryContact } =
    content;
  const photoAtt = Photo?.data?.attributes;

  const contactSections = [
    { key: "email", Icon: EnvelopeIcon, text: content.Email },
    //{ key: "phone", Icon: PhoneIcon, text: content.Phone },
    //{ key: "location", Icon: MapPinIcon, text: content.Location },
    {
      key: "cv-resume",
      Icon: DocumentArrowDownIcon,
      text: CvResume?.data?.attributes?.url,
    },
  ];

  return (
    <div className="front-page-widget flex flex-col md:flex-row ">
      <div className="flex flex-col content-center px-4 left-side pb-12 sm:pb-0">
        <div className="flex flex-col justify-center content-center">
          <div className="relative w-52 h-auto rounded self-center overflow-hidden flex content-center justify-center border-2 border-slate-200">
            <img
              className="object-cover z-20"
              src={`${photoAtt?.url}`}
              alt={photoAtt?.alternativeTex}
            />
          </div>
          <h3 className="text-2xl text-center font-extrabold mt-4 mb-2">
            {Header}
          </h3>
          <ContactListItems sections={contactSections} />
          <div className="mt-8 md:w-4/5 self-center text-center text-sm secondary-contact">
            <ReactMarkdown className="rich-text" rehypePlugins={[rehypeRaw]}>
              {SecondaryContact}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start pt-0 px-4">
        <MainContentSection content={MainIntroClassic} />
      </div>
    </div>
  );
};

export default FrontPageWidget;
