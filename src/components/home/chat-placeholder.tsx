import { Lock } from "lucide-react";
import Image from "next/image";

const ChatPlaceHolder = () => {
	return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
				<Image src={"/desktop-hero.png"} alt='Hero' width={320} height={188} />
				<p className='text-3xl font-extralight mt-5 mb-2'>ChatLab - Smart Real-Time Chat Application</p>
				<p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					ChatLab is a modern chat app where users can message friends, create group chats, share images and videos, start video calls, and even ask questions to CohereAI for instant AI-powered responses. It combines real-time communication with intelligent assistance for a seamless social experience.
				</p>
			</div>
		</div>
	);
};
export default ChatPlaceHolder;