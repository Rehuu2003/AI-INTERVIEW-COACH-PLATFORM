import {
  UploadCloud,
  FileText,
  Sparkles,
} from "lucide-react";

import { useDropzone } from "react-dropzone";

import { motion } from "framer-motion";

const ResumeUpload = ({
  onUpload,
}) => {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
  } = useDropzone({
    accept: {
      "application/pdf": [
        ".pdf",
      ],
      "application/msword": [
        ".doc",
      ],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },

    multiple: false,

    onDrop: (files) => {
      if (files[0]) {
        onUpload(files[0]);
      }
    },
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-8"
    >
      
      <div className="flex items-center gap-4 mb-8">
        
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
          
          <FileText
            size={30}
            className="text-black"
          />
        </div>

        <div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs font-semibold mb-2">
            
            <Sparkles size={12} />

            AI Resume Intelligence
          </div>

          <h2 className="text-3xl font-black">
            Upload Resume
          </h2>
        </div>
      </div>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-white/10 hover:border-cyan-400/40 transition-all rounded-[28px] p-14 text-center cursor-pointer bg-white/[0.03]"
      >
        
        <input
          {...getInputProps()}
        />

        <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto flex items-center justify-center mb-6">
          
          <UploadCloud
            size={42}
            className="text-black"
          />
        </div>

        <h3 className="text-3xl font-black mb-4">
          Drag & Drop Resume
        </h3>

        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and let AI analyze
          your ATS score, technical skills,
          missing keywords, communication quality,
          and hiring potential.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          
          <div className="px-4 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-sm">
            PDF
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-sm">
            DOC
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/[0.05] border border-white/10 text-sm">
            DOCX
          </div>
        </div>

        {acceptedFiles[0] && (
          <div className="mt-8 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 px-5 py-4 text-cyan-300">
            
            Uploaded:
            {" "}
            {acceptedFiles[0].name}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeUpload;