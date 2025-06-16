"use client"
import dynamic from "next/dynamic";

const DynamicVideoAI = dynamic(()=> import("./video-ui-kit"),{ssr:false});

export default function VideoCall() {
    return <DynamicVideoAI />
}