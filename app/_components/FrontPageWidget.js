import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';

// add support for underline text from the Rich Text Formatter
import rehypeRaw from "rehype-raw";

const ContactListItems = ({sections}) => {
	return (
		<div className="self-center">
			{sections.map( (section) => {
				const Icon = section.Icon;

				return (
					<li key={section.key} className="flex">
						<div className="flex pe-2">
							<Icon className="w-4 h-4 self-center"/>
						</div>
						<div>{section.text}</div>
					</li>					
				)

			} )}
		</div>
	);
}

const MainContentSection = ({content}) => {
	return (
		<>
			<ReactMarkdown className="rich-text prose" rehypePlugins={[rehypeRaw]}>
				{content}
			</ReactMarkdown>
		</>
	)
}

const FrontPageWidget = ({ content }) => {
	const { MainIntroClassic, Photo, Header } = content;
	const photoAtt = Photo?.data?.attributes;

	const contactSections = [
		{key: 'email', Icon: EnvelopeIcon, text: content.Email},
		{key: 'phone', Icon: PhoneIcon, text: content.Phone},
		{key: 'location', Icon: MapPinIcon, text: content.Location}
	]

	return (
		<div className="front-page-widget flex flex-col md:flex-row ">
			<div className="flex flex-col content-center px-4 left-side pb-12 sm:pb-0">
				<div className="flex flex-col justify-center content-center">
					<div className="relative w-40 h-40 self-center rounded-full overflow-hidden flex content-center justify-center border-2 border-slate-200">
						<img
							className="absolute w-36 z-20"
							src={`${photoAtt?.url}`} 
							alt={photoAtt?.alternativeTex}
						/>						
					</div>
					<h3 className="text-2xl text-center font-extrabold mb-4">{Header}</h3>
					<ContactListItems sections={contactSections} />
				</div>
			</div>
			<div className="flex flex-col justify-start pt-0 px-4">
				<MainContentSection content={MainIntroClassic} />
			</div>
		</div>	
	);
}

export default FrontPageWidget;