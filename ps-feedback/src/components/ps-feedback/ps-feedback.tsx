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
  data: any;
}

@Component({
  tag: 'ps-feedback',
  styleUrl: 'ps-feedback.css',
})
export class PsFeedback {
  @State() compState: string = 'init';
  @State() isRecording: boolean = false;
  @State() fileList: any = [];

  @Prop() options: any = [
    { label: 'Choose option', value: '', iconUrl: '' },
    { label: 'Bug', value: 'bug', iconUrl: '' },
    { label: 'Idea', value: 'idea', iconUrl: '' },
    { label: 'Others', value: 'others', iconUrl: '' },
  ];
  @Prop() inputLabel: string = 'default';
  @Prop() uploadImage: boolean = false;
  @Prop() recordAudio: boolean = false;

  private name: string = '';
  private email: string = '';
  private feedbackOption: string = '';
  private message: string = '';
  private uploads: any;
  private feedbackOptions: any = [
    { label: 'Idea', value: 'idea', isChecked: true },
    { label: 'Bug', value: 'bug', isChecked: false },
    { label: 'Others', value: 'others', isChecked: false },
  ];
  private mediaRecorder: any;

  fileInput!: HTMLInputElement;

  componentWillLoad() {
    if (!navigator.mediaDevices) {
      if (this.recordAudio) {
        this.recordAudio = false;
        console.log('Error: MediaRecorder not available');
      }
    }
  }

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
    } else if (name === 'message') {
      this.message = sanitisedInput;
    }
  }

  handleFeedbackOption(e) {
    console.log(e.target.value);
  }

  handleButtonClick(name: string, data: any) {
    if (name === 'uploadImage') {
      this.fileInput.click();
    } else if (name === 'removeFile') {
      this.removeFile(data);
    }
  }

  addFile() {
    let buff: any = Array.from(this.fileInput.files);
    buff.map(file => this.fileList.push(file));
    this.fileList = [...this.fileList];
  }

  removeFile(index) {
    this.fileList.splice(index, 1);
    this.fileList = [...this.fileList];
  }

  handleAudioRecording() {
    if (!this.mediaRecorder) this.initAudioRecording();
    this.isRecording = !this.isRecording;
    if (this.isRecording) this.startAudioRecording();
    else this.stopAudioRecording();
  }

  initAudioRecording() {
    let constraints = { audio: true };
    let chunks = [];
  }

  startAudioRecording() {}

  stopAudioRecording() {}

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
            onChange={e => this.handleFeedbackOption(e)}
            disabled={this.compState === 'submitting' ? true : false}
            checked={option.isChecked}
          ></input>,
          <label class="ps-feedback-option-label" htmlFor={option.value}>
            {option.label}
          </label>,
        ])}
      </div>
    );

    const Button: FunctionalComponent<ButtonProps> = ({ name, id, label, data }) => {
      if (name === 'recordAudio') {
        return (
          <button id={id} class="control-btn" onClick={() => this.handleAudioRecording()}>
            {this.isRecording ? <span>Recording..</span> : <span>Record</span>}
          </button>
        );
      } else {
        return (
          <button id={id} class="control-btn" onClick={() => this.handleButtonClick(name, data)}>
            {label}
          </button>
        );
      }
    };

    // const FileList: FunctionalComponent = () => <ul id="ps-feedback-upload-list" ref={el => (this.fileListEl = el as HTMLUListElement)}></ul>;

    const FileList: FunctionalComponent = () => (
      <ul id="ps-feedback-upload-list">
        {this.fileList.map((file, index) => (
          <li class="ps-feedback-upload-list-item">
            {file.name} <Button name="removeFile" id="ps-feedback-remove-file-btn" label="Remove" data={index}></Button>
          </li>
        ))}
      </ul>
    );

    return (
      <div id="ps-feedback-container">
        <TextInput type="text" name="name" id="ps-feedback-name" placeholder="Name"></TextInput>
        <TextInput type="email" name="email" id="ps-feedback-email" placeholder="Email"></TextInput>
        <FeedbackOptions></FeedbackOptions>
        <textarea id="ps-feedback-textarea" onInput={e => this.handleTextInput(e, 'message')}></textarea>
        <div class="ps-feedback-btn-group">
          <div class="ps-feedback-upload-btn-group">
            {this.uploadImage && <Button name="uploadImage" id="ps-feedback-upload-image-btn" label="Upload Image" data=""></Button>}
            {this.uploadImage && (
              <input type="file" id="files" name="files" ref={el => (this.fileInput = el as HTMLInputElement)} onChange={() => this.addFile()} multiple hidden />
            )}
            {this.recordAudio && <Button name="recordAudio" id="ps-feedback-record-audio-btn" label="Record Audio" data=""></Button>}
          </div>
          <FileList></FileList>
          <Button name="submitFeedback" id="ps-feedback-submit-btn" label="Submit" data=""></Button>
        </div>
      </div>
    );
  }
}
