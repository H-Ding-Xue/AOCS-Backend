import { ConnectionOptions, JSONCodec, NatsConnection, connect } from 'nats';
import { Messenger } from '../messenger.interface';

export class NatsMessenger implements Messenger {
  private _client: NatsConnection;

  constructor(private config: ConnectionOptions) {}

  async init(): Promise<void> {
    this._client = await connect(this.config);
  }

  publish(subject: string, payload: any) {
    if (this._client.info) {
      this._client.publish(subject, JSONCodec().encode(payload));
    }
  }

  async subscribe(subject: string, callback: (payload: any) => void) {
    if (this._client.info == undefined) {
      throw 'Nats not connected';
    }

    const subscription = this._client.subscribe(subject);

    for await (const message of subscription) {
      callback(JSONCodec().decode(message.data));
    }
  }

  async terminate(): Promise<void> {
    if (this._client.info) {
      await this._client.drain();
    }
  }
}
