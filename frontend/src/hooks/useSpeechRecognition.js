import {
  useEffect,
  useRef,
  useState,
} from "react";

const useSpeechRecognition = () => {
  const [isListening, setIsListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let text = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        text +=
          event.results[i][0]
            .transcript;
      }

      setTranscript(text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current =
      recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current)
      return;

    setTranscript("");

    setIsListening(true);

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current)
      return;

    recognitionRef.current.stop();

    setIsListening(false);
  };

  return {
    transcript,

    isListening,

    startListening,

    stopListening,
  };
};

export default useSpeechRecognition;