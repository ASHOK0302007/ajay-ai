class AudioAnalyserManager {
  constructor() {
    this.audioCtx = null;
    this.analyser = null;
    this.dataArray = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.isInitialized = true;
    } catch (e) {
      console.warn('AudioContext not supported or blocked:', e);
    }
  }

  getFrequencyData() {
    if (!this.analyser || !this.dataArray) return 0;
    this.analyser.getByteFrequencyData(this.dataArray);
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    return sum / this.dataArray.length; // Normalized average amplitude 0 - 255
  }

  getSpectrumArray() {
    if (!this.analyser || !this.dataArray) return new Uint8Array(16);
    this.analyser.getByteFrequencyData(this.dataArray);
    return Array.from(this.dataArray.slice(0, 16));
  }
}

export const audioAnalyser = new AudioAnalyserManager();
