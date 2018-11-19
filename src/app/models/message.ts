export class Message {
  content: string;
  style: string;
  id: number;
  constructor(id, content, style?) {
    this.content = content;
    this.id = id;
    this.style = style || 'info'
  }

}