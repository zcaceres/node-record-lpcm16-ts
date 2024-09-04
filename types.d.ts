export interface RecordingOptions {
  sampleRate: number;
  channels: number;
  compress: boolean;
  threshold: number;
  thresholdStart: number | null;
  thresholdEnd: number | null;
  silence: string;
  recorder: string;
  endOnSilence: boolean;
  audioType: string;
  device?: string;
}

export type RecordingOptionsOverrides = Partial<RecordingOptions>;

export interface RecorderResult {
  cmd: string;
  args: string[];
  spawnOptions?: Record<string, any>;
}
