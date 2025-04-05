'use client';

import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export interface ProductVideoCardProps {
  bgImageSrc: string;
  videoSrc?: string;
  title: string;
  description: string;
  className?: string;
  priority?: boolean;
  gradientClass?: string;
}

export const ProductVideoCard: FC<ProductVideoCardProps> = ({
  bgImageSrc,
  videoSrc,
  title,
  description,
  className = '',
  priority = false,
  gradientClass = 'bg-gradient-to-t from-black/90 to-transparent',
}) => {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Process video URL to handle YouTube links
  useEffect(() => {
    if (videoSrc) {
      // Check if it's a YouTube URL
      if (videoSrc.includes('youtu.be') || videoSrc.includes('youtube.com')) {
        // Extract video ID
        let videoId = '';
        
        if (videoSrc.includes('youtu.be/')) {
          // Format: https://youtu.be/VIDEO_ID
          videoId = videoSrc.split('youtu.be/')[1];
          if (videoId.includes('?')) {
            videoId = videoId.split('?')[0];
          }
        } else if (videoSrc.includes('youtube.com/watch')) {
          // Format: https://www.youtube.com/watch?v=VIDEO_ID
          const urlParams = new URLSearchParams(videoSrc.split('?')[1]);
          videoId = urlParams.get('v') || '';
        }
        
        if (videoId) {
          // Create embed URL with parameters for better viewing experience
          setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`);
        } else {
          setVideoError(true);
        }
      } else {
        // It's a direct video URL
        setEmbedUrl(videoSrc);
      }
    }
  }, [videoSrc]);

  const handleVideoError = () => {
    setVideoError(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div 
          className={`rounded-2xl  aspect-square  overflow-hidden shadow-lg relative cursor-pointer ${className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onClick={() => embedUrl && !videoError && setIsOpen(true)}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full bg-slate-800">
            {/* Static background image */}
            <Image
              src="/home/installation-bg.png"
              alt="Installation Background"
              fill
              priority={priority}
              className="object-cover"
            />
            
            {/* Product image overlay */}
            {!imageError && (
              <Image
                src={bgImageSrc}
                alt={title}
                fill
                priority={priority}
                className="object-contain z-[1] object-top"
                onError={() => setImageError(true)}
              />
            )}
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center top-[-20px] z-10">
            {embedUrl && !videoError && (
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                {/* Try to use the custom play icon, fallback to a simple triangle */}
                <Image 
                  src="/home/icons/play.svg" 
                  alt="Play Video" 
                  width={50} 
                  height={50}
                  className=" w-24 h-24"
                  onError={(e) => {
                    // If image fails to load, replace with CSS triangle
                    const target = e.target as HTMLElement;
                    if (target.parentElement) {
                      target.style.display = 'none';
                      // Create a play triangle with CSS
                      const playTriangle = document.createElement('div');
                      playTriangle.style.width = '0';
                      playTriangle.style.height = '0';
                      playTriangle.style.borderTop = '15px solid transparent';
                      playTriangle.style.borderBottom = '15px solid transparent';
                      playTriangle.style.borderLeft = '25px solid white';
                      playTriangle.style.marginLeft = '5px';
                      target.parentElement.appendChild(playTriangle);
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Gradient Overlay at bottom */}
          <div className={`absolute bottom-0 left-0 right-0 h-2/3 ${gradientClass} z-5`}></div>

          {/* Content */}
          <div className="relative flex flex-col items-center justify-end text-center h-full z-10 px-2 pb-4 pt-20">
            <h3 className="text-xl md:text-3xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-sm md:text-lg text-white/90 max-w-xl">{description}</p>
            {videoError && (
              <p className="text-xs mt-2 text-white/60 italic">
                Video unavailable
              </p>
            )}
          </div>
        </motion.div>
      </DialogTrigger>

      {/* Video Dialog */}
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] max-h-[90vh] lg:max-w-[1000px] p-0 bg-black border-none">
        {embedUrl && (
          <div className="relative">
            <DialogClose className="absolute -top-10 right-0 rounded-full w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white z-50 hover:bg-white/40 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
            
            {embedUrl.includes('youtube.com/embed') ? (
              <iframe
                src={embedUrl}
                className="w-full h-[80vh] md:aspect-video md:h-auto"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onError={handleVideoError}
              ></iframe>
            ) : (
              <video 
                autoPlay 
                controls 
                className="w-full h-[80vh] md:aspect-video md:h-auto object-contain" 
                onError={handleVideoError}
              >
                <source src={embedUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 