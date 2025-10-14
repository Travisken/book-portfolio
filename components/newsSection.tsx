"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const videos = [
    {
        id: "1",
        title: "100 People Benefit from Rotary Free Dental Outreach",
        date: "Mar 29, 2022",
        url: "https://www.youtube.com/embed/BzczFjsm0WE?si=uOMgXL5cSTBQnPTY",
    },
    {
        id: "2",
        title: "How BoI Made Me An Accomplished Dentist-- MD; Orange Dental Clinic Pt.1 |BoI Weekly|",
        date: "Oct 19, 2017",
        url: "https://www.youtube.com/embed/Lm2mc1W_Pts?si=41D7GXZFGa68lNNV",
    },
    {
        id: "3",
        title: "How BoI Made Me An Accomplished Dentist-- MD; Orange Dental Clinic Pt.2 |BoI Weekly|",
        date: "Oct 19, 2017",
        url: "https://www.youtube.com/embed/NL11nIpg1bk?si=3_Sq79t5qDB-giqW",
    },
    {
        id: "4",
        title: "How BoI Made Me An Accomplished Dentist-- MD; Orange Dental Clinic Pt.3 |BoI Weekly|",
        date: "Oct 19, 2017",
        url: "https://www.youtube.com/embed/9rnLJYVAqyc?si=9ImifZ4jZiAEsnSh",
    },
    {
        id: "5",
        title: "Harnessing the expertise of Nigerian Healthcare professionals in the Diaspora ...",
        date: "Jan 15, 2021",
        url: "https://www.youtube.com/embed/loEH8pg8Yjs?si=TWvdbgz2ucn9GPds",
    },
    {
        id: "6",
        title: "Leadership, Trust & The Healthcare Divide: Why Government Officials Seek Treatment Abroad.",
        date: "Jul 28, 2025",
        url: "https://www.youtube.com/embed/DC7ay8H09fg?si=JbgSRvNbyn6Hvbqb",
    },
    {
        id: "7",
        title: "IRDOC NIGERIA: Blazing the trail in Interventional Radiology.",
        date: "Jul 12, 2025",
        url: "https://www.youtube.com/embed/oWNCdlI3i7g?si=9FM8EfuvJ7BZd2i_",
    },
    {
        id: "8",
        title: "This Lagos Hospital is Changing Healthcare Forever",
        date: "Aug 16, 2025",
        url: "https://www.youtube.com/embed/rNrwRPo6S8c?si=JKr12Fwx5OYsc20w",
    },
    {
        id: "9",
        title: "Inside U-VOL: The Diaspora-Led Mission Transforming Healthcare in Nigeria.",
        date: "Jul 19, 2025",
        url: "https://www.youtube.com/embed/ikxeH5J-9G8?si=MsqvQGzDYH3Ov-HT",
    },
    {
        id: "10",
        title: "DUCHESS INTERNATIONAL HOSPITAL, LAGOS, NIGERIA",
        date: "Jun 19, 2025",
        url: "https://www.youtube.com/embed/ryi2bqLhMjo?si=tvuveIu8zbO70IgA",
    },
];

const getVideoId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
};

export default function NewsSection() {
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    const handleVideoSelect = (video: typeof videos[number]) => {
        if (selectedVideo.id === video.id) return;
        setLoading(true);
        setTimeout(() => {
            setSelectedVideo(video);
            setLoading(false);
            videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1000);
    };

    return (
        <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:px-20 p-4 w-full"
        >
            <h2 className="text-3xl font-semibold capitalize mb-4">Outreach / News</h2>

            <div className="flex flex-col md:flex-col md:h-[140vh] gap-4">
                {/* Main video player */}
                <motion.div
                    ref={videoRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 bg-black rounded-lg overflow-hidden relative"
                >
                    {loading ? (
                        <div className="flex justify-center items-center h-64 md:h-96 bg-gray-800">
                            <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <iframe
                            key={selectedVideo.id}
                            src={selectedVideo.url}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            className="w-full h-64 md:h-[85%]"
                            referrerPolicy="strict-origin-when-cross-origin"
                            frameBorder="0"
                            title="YouTube video player"
                            allowFullScreen
                        ></iframe>
                    )}
                    <div className="p-4 text-white">
                        <p className="text-sm opacity-75">{selectedVideo.date}</p>
                        <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
                    </div>
                </motion.div>

                {/* Video thumbnails */}
                <div className="flex md:flex-row flex-col gap-2 w-full flex-wrap">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                            className={`flex gap-2 rounded-lg w-full md:w-[32%] h-fit p-2 cursor-pointer transition-all ${selectedVideo.id === video.id
                                ? "ring-2 ring-[#3ca0ca] shadow-sm"
                                : "bg-gray-200"
                                }`}
                            onClick={() => handleVideoSelect(video)}
                        >
                            <Image
                                src={`https://img.youtube.com/vi/${getVideoId(video.url)}/hqdefault.jpg`}
                                alt={video.id}
                                height={72}
                                width={96}
                                className="rounded-md object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null; // Prevent infinite loop if fallback fails
                                    target.src = "/fallback_image.jpeg"; // Path to your fallback image in /public folder
                                }}
                            />

                            <div className="flex flex-col justify-between">
                                <p className="text-xs opacity-75 mt-1">{video.date}</p>
                                <h4 className="text-sm font-semibold">{video.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
