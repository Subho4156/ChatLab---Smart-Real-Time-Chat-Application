import ChatBubble from "./chat-bubble";
import { useConversationStore } from "@/store/chat-store";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";


const MessageContainer = () => {
	const { selectedConversation }= useConversationStore();
	const messages= useQuery(api.messages.getMessages, {
		conversation: selectedConversation!._id,
	});
	const me= useQuery(api.users.getMe);

	return (
		<div className='relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark'>
			<div className='mx-12 flex flex-col gap-3 h-full'>
				{messages?.map((msg, idx) => (
					<div key={msg._id}>
						<ChatBubble 
						 previousMessage= {idx > 0 ? messages[idx - 1] : undefined}
						 message={msg}
						 me={me}
						 />
					</div>
				))}
			</div>
		</div>
	);
};
export default MessageContainer;