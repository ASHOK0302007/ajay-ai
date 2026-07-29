class VoiceEngine {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis || null;
    this.isListening = false;
    this.isSpeaking = false;
    this.wakeWord = 'hey ajay';
    this.voices = [];
    this.selectedVoice = null;
    this.rate = 1.05; // Gojo smooth energetic speed
    this.pitch = 0.88; // Deep confident Gojo tone
    this.onResultCallback = null;
    this.onWakeWordCallback = null;
    this.onSpeechEndCallback = null;
    this.initSpeech();
  }

  initSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const currentText = (finalTranscript || interimTranscript).trim().toLowerCase();

        if (currentText.includes(this.wakeWord) || currentText.includes('ajay') || currentText.includes('gojo')) {
          if (this.onWakeWordCallback) {
            this.onWakeWordCallback(currentText);
          }
        }

        if (finalTranscript && this.onResultCallback) {
          this.onResultCallback(finalTranscript);
        }
      };

      this.recognition.onerror = (err) => {
        console.warn('Speech recognition notice:', err.error);
      };
    }

    if (this.synthesis) {
      const loadVoices = () => {
        this.voices = this.synthesis.getVoices();
        // Default to a deep, smooth male voice matching Gojo
        this.selectedVoice = this.voices.find(v => 
          v.lang.startsWith('en') && 
          (v.name.includes('David') || v.name.includes('Male') || v.name.includes('Google US English') || v.name.includes('Daniel') || v.name.includes('Alex'))
        ) || this.voices[0];
      };
      loadVoices();
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  // Apply Gojo Signature Voice Tuning
  applyGojoVoicePreset() {
    this.rate = 1.05;
    this.pitch = 0.88;
    const deepVoice = this.voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('David') || v.name.includes('Male') || v.name.includes('Google US English') || v.name.includes('Daniel'))
    );
    if (deepVoice) this.selectedVoice = deepVoice;
  }

  startListening(onResult, onWakeWord) {
    if (!this.recognition) {
      console.warn('Speech Recognition not supported in this browser environment.');
      return false;
    }
    this.onResultCallback = onResult;
    this.onWakeWordCallback = onWakeWord;
    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (e) {
      console.warn('Recognition already listening:', e);
      return true;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text, onStart, onEnd, onBoundary) {
    if (!this.synthesis) return;
    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) utterance.voice = this.selectedVoice;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
      if (this.onSpeechEndCallback) this.onSpeechEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onboundary = (event) => {
      if (onBoundary) onBoundary(event);
    };

    this.synthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  setVoice(voiceName) {
    const found = this.voices.find(v => v.name === voiceName);
    if (found) this.selectedVoice = found;
  }

  setRate(val) {
    this.rate = parseFloat(val);
  }

  setPitch(val) {
    this.pitch = parseFloat(val);
  }
}

export const voiceEngine = new VoiceEngine();
