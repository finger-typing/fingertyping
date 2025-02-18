// src/utils/audioUtils.ts

class AudioPlayer {
  private correctSound: HTMLAudioElement | null = null;
  private incorrectSound: HTMLAudioElement | null = null;
  private volume: number;
  private enabled: boolean;

  constructor() {
    this.volume = 0.2; // Default volume
    this.enabled = true;

    // Only create audio objects if running in the browser
    if (typeof window !== "undefined") {
      this.correctSound = new Audio("/correct.mp3");
      this.incorrectSound = new Audio("/incorrect.mp3");

      // Pre-load sounds
      this.correctSound.load();
      this.incorrectSound.load();

      // Set volume
      this.correctSound.volume = this.volume;
      this.incorrectSound.volume = this.volume;
    }
  }

  playCorrect() {
    if (this.enabled && this.correctSound) {
      // Clone the audio to allow rapid successive plays
      const sound = this.correctSound.cloneNode() as HTMLAudioElement;
      sound.volume = this.volume;
      sound.play().catch(() => {});
    }
  }

  playIncorrect() {
    if (this.enabled && this.incorrectSound) {
      const sound = this.incorrectSound.cloneNode() as HTMLAudioElement;
      sound.volume = this.volume;
      sound.play().catch(() => {});
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.correctSound) this.correctSound.volume = this.volume;
    if (this.incorrectSound) this.incorrectSound.volume = this.volume;
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

// Create a singleton instance
export const audioPlayer = new AudioPlayer();
