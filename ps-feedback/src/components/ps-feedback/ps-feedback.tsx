import { Component, State, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'ps-feedback',
  styleUrl: 'ps-feedback.css',
})
export class PsFeedback {
  @State() compState: string = 'init';

  @Prop() options: any = [
    { label: 'Choose option', value: '' },
    { label: 'Bug', value: 'bug' },
    { label: 'Idea', value: 'idea' },
    { label: 'Others', value: 'others' },
  ];
  @Prop() inputLabel: string = 'default';
  @Prop() imageUpload: boolean = false;
  @Prop() audioUpload: boolean = false;

  @Event({
    eventName: 'psFeedbackEvent',
    bubbles: true,
  })
  psFeedbackEventEmitter: EventEmitter;

  eventDispatcher(name: string, data: any) {
    this.psFeedbackEventEmitter.emit({
      name: name,
      data: data,
    });
  }

  render() {
    return (
      <div id="ps-feedback-container">
        <input id="ps-feedback-name" type="text" placeholder="name" />
        <input id="ps-feedback-email" type="email" placeholder="email" />
        <select id="ps-feedback-select">
          {this.options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <textarea id="ps-feedback-textarea"></textarea>
        <ul id="ps-feedback-upload-list">
          <li class="ps-feedback-upload-list-item">image.jpg</li>
          <li class="ps-feedback-upload-list-item">audio.png</li>
        </ul>
        {this.imageUpload && <button id="ps-feedback-image-upload-btn">Upload Image</button>}
        {this.audioUpload && <button id="ps-feedback-audio-upload-btn">Upload Audio</button>}
        <button id="ps-feedback-submit-btn">Submit</button>
      </div>
    );
  }
}
