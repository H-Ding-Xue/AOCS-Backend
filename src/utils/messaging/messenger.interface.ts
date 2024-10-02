export interface Messenger {
  init(): Promise<void>;

  publish(subject: string, payload: any): void;

  subscribe(subject: string, callback: (payload: any) => void): void;

  terminate(): Promise<void>;
}
