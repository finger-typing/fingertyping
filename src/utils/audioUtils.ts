// audioUtils.ts

class AudioPlayer {
  private correctSound: HTMLAudioElement;
  private incorrectSound: HTMLAudioElement;
  private volume: number;
  private enabled: boolean;

  constructor() {
    this.correctSound = new Audio("/correct.mp3");
    this.incorrectSound = new Audio("/incorrect.mp3");
    this.volume = 0.5; // Default volume
    this.enabled = true;

    // Pre-load sounds
    this.correctSound.load();
    this.incorrectSound.load();

    // Set volume
    this.correctSound.volume = this.volume;
    this.incorrectSound.volume = this.volume;
  }

  playCorrect() {
    if (this.enabled) {
      // Clone the audio to allow rapid successive plays
      const sound = this.correctSound.cloneNode() as HTMLAudioElement;
      sound.volume = this.volume;
      sound.play().catch(() => {});
    }
  }

  playIncorrect() {
    if (this.enabled) {
      const sound = this.incorrectSound.cloneNode() as HTMLAudioElement;
      sound.volume = this.volume;
      sound.play().catch(() => {});
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.correctSound.volume = this.volume;
    this.incorrectSound.volume = this.volume;
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
