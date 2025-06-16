import { CohereClient } from "cohere-ai";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";



const apiKey= process.env.COHERE_API_KEY;

const cohere= new CohereClient({ token: apiKey });

export const chat = action({
    args: {
        messageBody: v.string(),
        conversation: v.id("conversations"),
    },
    handler: async (ctx, args)=> {
        const res = await cohere.chat({
            model: "command",
            message: args.messageBody,
            preamble: "You are a terse bot in a group chat responding to questions with 1-sentence answers",
        })
        const messageContent = (res as any).text ?? "I'm sorry, I don't have a response for that";

        await ctx.runMutation(api.messages.sendCohereMessages, {
            content: messageContent ?? "I'm sorry, I don't have a response for that",
            conversation:args.conversation,
        })
    }
})