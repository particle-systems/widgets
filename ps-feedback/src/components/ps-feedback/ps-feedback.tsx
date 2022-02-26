import { Component, State, Prop, Event, EventEmitter, FunctionalComponent, h } from '@stencil/core';

interface TextInputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
}

interface ButtonProps {
  name: string;
  id: string;
  label: string;
}

@Component({
  tag: 'ps-feedback',
  styleUrl: 'ps-feedback.css',
})
export class PsFeedback {
  @State() compState: string = 'init';

  @Prop() options: any = [
    { label: 'Choose option', value: '', iconUrl: '' },
    { label: 'Bug', value: 'bug', iconUrl: '' },
    { label: 'Idea', value: 'idea', iconUrl: '' },
    { label: 'Others', value: 'others', iconUrl: '' },
  ];
  @Prop() inputLabel: string = 'default';
  @Prop() imageUpload: boolean = false;
  @Prop() audioUpload: boolean = false;

  private name: string;
  private email: string;
  private message: string;
  private uploads: any;
  private feedbackOptions: any = [
    { label: 'Idea', value: 'idea' },
    { label: 'Bug', value: 'bug' },
    { label: 'Others', value: 'other' },
  ];

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

  handleTextInput(e, name: string) {
    let sanitisedInput = e.target.value.trim();
    if (!sanitisedInput) return;

    if (name === 'name') {
      this.name = sanitisedInput;
    } else if (name === 'email') {
      this.email = sanitisedInput;
    }
  }

  handleFeedbackChoice(e) {}

  handleButtonClick(name: string) {
    console.log(`buttonName: ${name}`);
  }

  render() {
    const TextInput: FunctionalComponent<TextInputProps> = ({ type, name, id, placeholder }) => (
      <input type={type} id={id} name={name} placeholder={placeholder} onInput={e => this.handleTextInput(e, name)}></input>
    );

    const FeedbackOptions: FunctionalComponent = () => (
      <div class="feedback-option-group">
        {this.feedbackOptions.map(option => [
          <input
            class="ps-feedback-option-input"
            id={option.value}
            type="radio"
            name="feedbackOption"
            value={option.value}
            onChange={e => this.handleFeedbackChoice(e)}
            disabled={this.compState === 'submitting' ? true : false}
          ></input>,
          <label class="ps-feedback-option-label" htmlFor={option.value}>
            {option.label}
          </label>,
        ])}
      </div>
    );

    const Button: FunctionalComponent<ButtonProps> = ({ name, id, label }) => (
      <button id={id} class="control-btn" onClick={() => this.handleButtonClick(name)}>
        {label}
      </button>
    );

    return (
      <div id="ps-feedback-container">
        <TextInput type="text" name="name" id="ps-feedback-name" placeholder="Name"></TextInput>
        <TextInput type="email" name="email" id="ps-feedback-email" placeholder="Email"></TextInput>
        <FeedbackOptions></FeedbackOptions>
        <textarea id="ps-feedback-textarea"></textarea>
        <ul id="ps-feedback-upload-list">
          <li class="ps-feedback-upload-list-item">image.jpg</li>
          <li class="ps-feedback-upload-list-item">audio.png</li>
        </ul>
        <div class="ps-feedback-btn-group">
          <div class="ps-feedback-upload-btn-group">
            {this.imageUpload && <Button name="imageUpload" id="ps-feedback-upload-image-btn" label="Upload Image"></Button>}
            {this.imageUpload && <Button name="recordAudio" id="ps-feedback-record-audio-btn" label="Record Audio"></Button>}
          </div>
          <Button name="submitFeedback" id="ps-feedback-submit-btn" label="Submit"></Button>
        </div>
      </div>
    );
  }
}
