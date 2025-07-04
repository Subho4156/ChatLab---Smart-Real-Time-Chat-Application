import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";


export const sendTextMessage = mutation({
    args: {
        sender: v.string(),
        content: v.string(),
        conversation: v.id("conversations")
    },
    handler: async(ctx, args)=> {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Unauthorized");
        }

        const user= await ctx.db.query("users")
        .withIndex("by_tokenIdentifier", q=> q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();

        if(!user){
            throw new ConvexError("User not Found")
        }

        const conversation = await ctx.db
		.query("conversations")
		.filter((q) => q.eq(q.field("_id"), args.conversation))
		.first();
        
        if(!conversation){
            throw new ConvexError("Conversation not found");
        }
        if (!conversation.participants.includes(user._id)) {
			throw new ConvexError("You are not part of this conversation");
		}
        
        await ctx.db.insert("messages", {
            sender: args.sender,
            content: args.content,
            conversation: args.conversation,
            messageType: "text",
        });

		if(args.content.startsWith("@cohere")){
			await ctx.scheduler.runAfter(0,api.cohere.chat,{
				messageBody: args.content,
				conversation: args.conversation,
			})
		}
    },
});

export const sendCohereMessages = mutation({
	args:{
		content: v.string(),
		conversation: v.id("conversations"),
	},
	handler: async (ctx, args)=> {
		await ctx.db.insert("messages", {
			content: args.content,
			sender: "CohereAI",
			messageType: "text",
			conversation: args.conversation,
		})
	}
})

export const getMessages = query({
	args: {
		conversation: v.id("conversations"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const messages = await ctx.db
			.query("messages")
			.withIndex("by_conversation", (q) => q.eq("conversation", args.conversation))
			.collect();

		const userProfileCache = new Map();

		const messagesWithSender = await Promise.all(
			messages.map(async (message) => {
				if (message.sender === "CohereAI") {
					return { ...message, sender: { name: "CohereAI", image:"/cohere.png" } };
				}
				let sender;
				// Check if sender profile is in cache
				if (userProfileCache.has(message.sender)) {
					sender = userProfileCache.get(message.sender);
				} else {
					// Fetch sender profile from the database
					sender = await ctx.db
						.query("users")
						.filter((q) => q.eq(q.field("_id"), message.sender))
						.first();
					// Cache the sender profile
					userProfileCache.set(message.sender, sender);
				}

				return { ...message, sender };
			})
		);

		return messagesWithSender;
	},
});

export const sendImage = mutation({
	args: { imgId: v.id("_storage"), sender: v.id("users"), conversation: v.id("conversations") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Unauthorized");
		}

		const content = (await ctx.storage.getUrl(args.imgId)) as string;

		await ctx.db.insert("messages", {
			content: content,
			sender: args.sender,
			messageType: "image",
			conversation: args.conversation,
		});
	},
});

export const sendVideo = mutation({
	args: { videoId: v.id("_storage"), sender: v.id("users"), conversation: v.id("conversations") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("Unauthorized");
		}

		const content = (await ctx.storage.getUrl(args.videoId)) as string;

		await ctx.db.insert("messages", {
			content: content,
			sender: args.sender,
			messageType: "video",
			conversation: args.conversation,
		});
	},
});




//Unoptimized
// export const getMessages = query({
//     args:{
//         conversation: v.id("conversations"),
//     },
//     handler: async(ctx, args)=> {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new ConvexError("Unauthorized");
//         }

//         const messages= await ctx.db
//         .query("messages")
//         .withIndex("by_conversation", q=> q.eq("conversation", args.conversation))
//         .collect();

//         const messagesWithSender = await Promise.all(
//             messages.map(async (message)=> {
//                 const sender = await ctx.db
//                 .query("users")
//                 .filter(q=> q.eq(q.field("_id"), message.sender))
//                 .first();

//                 return {...message, sender}
//             })
//         )

//         return messagesWithSender;
//     }
// });