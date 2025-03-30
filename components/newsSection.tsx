import { useState, useRef } from "react";
import Image from "next/image";

const videos = [
    {
        id: "1",
        title: "100 People Benefit from Rotary Free Dental Outreach",
        date: "Mar 29, 2022",
        url: "https://www.youtube.com/embed/BzczFjsm0WE?si=uOMgXL5cSTBQnPTY"
    },
    {
        id: "2",
        title: "How BoI Made Me An Accomplished Dentist-- MD; Orange Dental Clinic Pt.1 |BoI Weekly|",
        date: "Oct 19, 2017",
        url: "https://www.youtube.com/embed/Lm2mc1W_Pts?si=41D7GXZFGa68lNNV"
    },
    {
        id: "3",
        title: "How BoI Made Me An Accomplished Dentist-- MD; Orange Dental Clinic Pt.2 |BoI Weekly|",
        date: "Oct 19, 2017",
        url: "https://www.youtube.com/embed/NL11nIpg1bk?si=3_Sq79t5qDB-giqW"
    },
    {
        id: "4",
        title: "How BoI Made Me An Accomplished Dentist-- MD; Orange Dental Clinic Pt.3 |BoI Weekly|",
        date: "Oct 19, 2017",
        url: "https://www.youtube.com/embed/9rnLJYVAqyc?si=9ImifZ4jZiAEsnSh"
    }
];

// Function to extract video ID from YouTube URL
const getVideoId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
};

export default function NewsSection() {
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const [loading, setLoading] = useState(false);
    const videoRef = useRef<HTMLDivElement>(null);

    const handleVideoSelect = (video: typeof videos[number]) => {
        if (selectedVideo.id === video.id) return; // Avoid reloading the same video
        
        setLoading(true); // Show loader
        
        setTimeout(() => {
            setSelectedVideo(video);
            setLoading(false); // Hide loader
            videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1000); // Simulated loading delay
    };

    return (
        <div className="md:px-20 p-4 w-full">
            <h2 className="text-3xl font-semibold capitalize mb-4">outreach / news</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main video player with loader */}
                <div ref={videoRef} className="md:col-span-2 bg-black rounded-lg overflow-hidden relative">
                    {loading ? (
                        <div className="flex justify-center items-center h-64 md:h-96 bg-gray-800">
                            <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <iframe
                            key={selectedVideo.id} // Ensures reloading of iframe
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
                </div>

                {/* Video thumbnails */}
                <div className="flex flex-col gap-2">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className={`bg-gray-200 flex md:flex-col gap-2 rounded-lg p-2 cursor-pointer transition-all ${selectedVideo.id === video.id ? "ring-2 ring-[#3ca0ca] shadow-sm" : ""}`}
                            onClick={() => handleVideoSelect(video)}
                        >
                            {/* Display YouTube thumbnail */}
                            <Image
                                src={`https://img.youtube.com/vi/${getVideoId(video.url)}/hqdefault.jpg`}
                                alt={video.title}
                                height={96}
                                width={96}
                                className="w-full h-24 rounded-md object-cover"
                            />
                            <div className="flex flex-col gap-2 justify-between">
                                <p className="text-xs opacity-75 mt-1">{video.date}</p>
                                <h4 className="md:text-sm text-xs font-semibold">{video.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
