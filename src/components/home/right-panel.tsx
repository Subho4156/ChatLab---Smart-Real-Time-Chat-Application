"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, X } from "lucide-react";
import MessageInput from "./message-input";
import MessageContainer from "./message-container";
import ChatPlaceHolder from "@/components/home/chat-placeholder";
import GroupMembersDialog from "./group-members-dialog";
import { useConversationStore } from "@/store/chat-store";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";

const RightPanel = () => {
  const { selectedConversation, setSelectedConversation } = useConversationStore();
  const me = useQuery(api.users.getMe);
  const deleteGroup = useMutation(api.conversations.deleteGroup);
  const groupImageUrl = useQuery(
    api.conversations.getUrl,
    selectedConversation?.isGroup && selectedConversation.groupImage
      ? { storageId: selectedConversation.groupImage as Id<"_storage"> }
      : "skip"
  );	
  const { isLoading } = useConvexAuth();
  if (isLoading) return null;
  if (!selectedConversation) return <ChatPlaceHolder />;
  const conversationName =
    selectedConversation.groupName || selectedConversation.name;
  const conversationImage = selectedConversation.isGroup ? groupImageUrl : selectedConversation.image;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (!confirmDelete) return;

    try {
      await deleteGroup({ conversationId: selectedConversation._id });
      setSelectedConversation(null);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="w-3/4 flex flex-col">
      <div className="w-full sticky top-0 z-50">
        {/* Header */}
        <div className="flex justify-between bg-gray-primary p-3">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage
                src={conversationImage || "/placeholder.png"}
                className="object-cover"
              />
              <AvatarFallback>
                <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{conversationName}</p>
              {selectedConversation.isGroup && (
                <GroupMembersDialog
                  selectedConversation={selectedConversation}
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-7 mr-5">
			{selectedConversation.isGroup && me?._id === selectedConversation.admin && (
			  <Button size="sm" className="bg-red-600 flex items-center gap-7 mr-5 text-sm hover:bg-red-700" onClick={handleDelete}>
				Delete Group
			  </Button>
		    )}
            <a href="/video-call" target="_blank">
              <Video size={23} />
            </a>
            <X
              size={16}
              className="cursor-pointer"
              onClick={() => setSelectedConversation(null)}
            />
          </div>
        </div>
      </div>
      {/* CHAT MESSAGES */}
      <MessageContainer />

      {/* INPUT */}
      <MessageInput />
    </div>
  );
};
export default RightPanel;
