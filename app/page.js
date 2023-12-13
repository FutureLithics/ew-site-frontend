import {fetchPageData} from './utils/api';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';

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
	const parseContent = content.map(item => {
		if(item?.children){
			const text = item.children[0].text;

			return {
				type: item.type,
				text: text
			}			
		}
	})

	return (
		<div>
			{
				parseContent.map((item) => {
					if (item.type == 'heading') {
						return (
							<h3 className="font-bold text-3xl text-slate-400 mb-2">
								{item.text}
							</h3>
						);
					} else {
						return (
							<p className="font-medium text-md text-slate-900 pb-2">
								{item.text}
							</p>
						);
					}
				})
			}
		</div>
	)
}

const FrontPageWidget = ({ content }) => {
	const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
	const { MainIntro, Photo, Header } = content;
	const photoAtt = Photo?.data?.attributes;

	const contactSections = [
		{key: 'email', Icon: EnvelopeIcon, text: content.Email},
		{key: 'phone', Icon: PhoneIcon, text: content.Phone},
		{key: 'location', Icon: MapPinIcon, text: content.Location}
	]

	return (
		<div className="front-page-widget flex flex-col md:flex-row ">
			<div className="flex flex-col content-center px-4 left-side pb-2 sm:pb-0">
				<div className="flex flex-col justify-center content-center">
					<div className="relative w-40 h-40 self-center rounded-full overflow-hidden flex content-center justify-center border-2 border-slate-200">
						<img
							className="absolute w-36 z-20"
							src={`${baseURL}${photoAtt?.url}`} 
							alt={photoAtt?.alternativeTex}
						/>						
					</div>
					<h3 className="text-2xl text-center font-extrabold mb-4">{Header}</h3>
					<ContactListItems sections={contactSections} />
				</div>
			</div>
			<div className="flex flex-col justify-start pt-4 px-4">
				<MainContentSection content={MainIntro} />
			</div>
		</div>	
	);
}

const Home = async () => {

	// fetch content for front page
	const data = await fetchPageData();

	// if data.success is false, redirect to error page or render error message

	return (
		<main className="w-screen flex min-h-screen flex-col items-center justify-between p-24">
			{data.content !== undefined && <FrontPageWidget content={data.content[0]}/>}
		</main>
	)
}

export const revalidate = 10;

export default Home;
