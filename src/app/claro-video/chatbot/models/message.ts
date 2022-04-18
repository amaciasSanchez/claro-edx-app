export class Message {
    content: string;
    timestamp: Date;
    avatar: string;
    style: string;

    constructor(content: string, avatar: string,  style: string, timestamp?: Date) {
        this.content = content;
        this.timestamp = timestamp;
        this.avatar = avatar;
        this.style = style;
    }
}
