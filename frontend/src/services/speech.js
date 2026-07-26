export const startSpeechRecognition = (
  onResult
) => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Speech Recognition not supported in this browser."
    );

    return null;
  }

  const recognition =
    new SpeechRecognition();

  recognition.continuous = true;

  recognition.interimResults = true;

  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let transcript = "";

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {
      transcript +=
        event.results[i][0].transcript;
    }

    onResult(transcript);
  };

  recognition.start();

  return recognition;
};

export const speakText = (text) => {
  const speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";

  speech.rate = 1;

  speech.pitch = 1;

  speech.volume = 1;

  window.speechSynthesis.speak(speech);
};