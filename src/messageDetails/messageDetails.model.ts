export class Messages {
  message?: string;
  time?: number;
}

export class Communication {
  receiverNumber: number;
  userId?: string;
  messages?: Messages;
}
