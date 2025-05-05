declare module '@vimeo/player' {
  interface PlayerOptions {
    id?: string | number;
    url?: string;
    width?: number | string;
    height?: number | string;
    autopause?: boolean;
    autoplay?: boolean;
    background?: boolean;
    byline?: boolean;
    color?: string;
    controls?: boolean;
    dnt?: boolean;
    keyboard?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsinline?: boolean;
    portrait?: boolean;
    responsive?: boolean;
    speed?: boolean;
    title?: boolean;
    transparent?: boolean;
  }

  interface VimeoTimeEvent {
    duration: number;
    percent: number;
    seconds: number;
  }

  interface VimeoProgressEvent {
    duration: number;
    percent: number;
    seconds: number;
  }

  interface VimeoErrorEvent {
    name: string;
    message: string;
    method: string;
  }

  class Player {
    constructor(element: HTMLElement | string, options: PlayerOptions);
    
    on(event: string, callback: (data: any) => void): void;
    off(event: string, callback?: (data: any) => void): void;
    
    loadVideo(id: number): Promise<number>;
    ready(): Promise<void>;
    enableTextTrack(language: string, kind?: string): Promise<object>;
    disableTextTrack(): Promise<void>;
    pause(): Promise<void>;
    play(): Promise<void>;
    unload(): Promise<void>;
    getChapters(): Promise<any[]>;
    getCurrentChapter(): Promise<any>;
    getColor(): Promise<string>;
    getColors(): Promise<any>;
    getDuration(): Promise<number>;
    getCurrentTime(): Promise<number>;
    getLoop(): Promise<boolean>;
    getMuted(): Promise<boolean>;
    getPaused(): Promise<boolean>;
    getPlaybackRate(): Promise<number>;
    getTextTracks(): Promise<any[]>;
    getVideoEmbedCode(): Promise<string>;
    getVideoId(): Promise<string>;
    getVideoTitle(): Promise<string>;
    getVideoWidth(): Promise<number>;
    getVideoHeight(): Promise<number>;
    setColor(color: string): Promise<string>;
    setLoop(loop: boolean): Promise<boolean>;
    setMuted(muted: boolean): Promise<boolean>;
    setPlaybackRate(playbackRate: number): Promise<number>;
    setVolume(volume: number): Promise<number>;
    setCurrentTime(time: number): Promise<number>;
    destroy(): void;
  }

  export default Player;
}