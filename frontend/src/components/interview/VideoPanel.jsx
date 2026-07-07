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

const VideoPanel = () => {
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
                Real-time interview tracking
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
            
            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs flex items-center gap-2">
              
              <ScanEye
                size={14}
                className="text-cyan-400"
              />

              Face Tracking
            </div>

            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs flex items-center gap-2">
              
              <Activity
                size={14}
                className="text-purple-400"
              />

              Confidence Detection
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

        

        {/* AI ANALYTICS */}

<div className="mt-5 space-y-4">
  
  {[
    {
      label:
        "Eye Contact",
      value: "94%",
      color:
        "from-cyan-400 to-blue-500",
    },

    {
      label:
        "Confidence",
      value: "91%",
      color:
        "from-purple-400 to-pink-500",
    },

    {
      label:
        "Communication Energy",
      value: "96%",
      color:
        "from-green-400 to-emerald-500",
    },

    {
      label:
        "Facial Engagement",
      value: "89%",
      color:
        "from-orange-400 to-red-500",
    },
  ].map((item, index) => (
    <motion.div
      key={index}
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay:
          index * 0.1,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
    >
      
      <div className="flex items-center justify-between mb-3">
        
        <p className="text-sm text-gray-300">
          {item.label}
        </p>

        <p className="font-bold text-white">
          {item.value}
        </p>
      </div>

      <div className="h-3 rounded-full bg-white/5 overflow-hidden">
        
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width:
              item.value,
          }}
          transition={{
            duration: 1,
          }}
          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
        />
      </div>
    </motion.div>
  ))}
</div>

<div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
  
  <div className="flex items-center justify-between mb-5">
    
    <h3 className="text-lg font-bold">
      Live AI Observations
    </h3>

    <div className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
      REAL-TIME
    </div>
  </div>

  <div className="space-y-3">
    
    {[
      "Maintaining excellent eye contact with interviewer.",

      "Voice clarity and confidence level are strong.",

      "Communication pace is recruiter-friendly.",

      "Technical explanations are structured well.",
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay:
            index * 0.15,
        }}
        className="rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-gray-300"
      >
        {item}
      </motion.div>
    ))}
  </div>
</div>

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
              AI monitors confidence, eye contact,
              communication clarity, and speaking
              patterns to simulate enterprise-level
              interview evaluation systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel;