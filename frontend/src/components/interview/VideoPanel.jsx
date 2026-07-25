import {
  Camera,
  Mic,
  ShieldCheck,
  Activity,
  ScanEye,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

const VideoPanel = ({ liveStats = false }) => {
  const videoRef = useRef(null);

  const [cameraOn, setCameraOn] =
    useState(false);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera =
    async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: true,
              audio: false,
            }
          );

        if (
          videoRef.current
        ) {
          videoRef.current.srcObject =
            stream;
        }

        setCameraOn(true);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl overflow-hidden relative">
      
      {/* HEADER */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        
        <div>
          
          <div className="flex items-center gap-3 mb-2">
            
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
              
              <Camera
                size={22}
                className="text-black"
              />
            </div>

            <div>
              
              <h3 className="text-xl font-black">
                AI Video Monitor
              </h3>

              <p className="text-sm text-gray-400">
                Optional camera preview (local only)
              </p>
            </div>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold flex items-center gap-2">
          
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

          LIVE
        </div>
      </div>

      {/* VIDEO */}

      <div className="relative p-5">
        
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black aspect-[16/10]">
          
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* TOP STATUS */}

          <div className="absolute top-4 left-4 flex items-center gap-3">
            
            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs">
              Preview
            </div>
          </div>

          {/* BOTTOM */}

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            
            <div className="flex items-center gap-3">
              
              <div className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                
                <Mic
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <div className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                
                <Camera
                  size={20}
                  className="text-purple-400"
                />
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white text-sm">
              
              {cameraOn
                ? "Camera Active"
                : "Connecting..."}
            </div>
          </div>
        </div>

        

        {liveStats ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-gray-400 leading-relaxed">
            <p className="font-semibold text-white mb-2">About this panel</p>
            Your answers are scored on the server when you end the session. The camera stays on your device and is not sent for automated facial analysis.
          </div>
        ) : null}

        {/* AI NOTICE */}

        <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-5 flex items-start gap-4">
          
          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center shrink-0">
            
            <ShieldCheck
              className="text-cyan-400"
              size={22}
            />
          </div>

          <div>
            
            <h4 className="font-bold text-lg mb-2">
              AI Behavioral Analysis
            </h4>

            <p className="text-gray-400 leading-relaxed text-sm">
              Use voice mode or text to practice. End the session to receive AI feedback from your transcript.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;