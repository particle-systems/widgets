import { Component, Prop, State, h, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'ps-contact-form',
  styleUrl: 'ps-contact-form.css',
})
export class PsContactForm {
  fullNameInputEl!: HTMLInputElement;
  emailInputEl!: HTMLInputElement;
  messageTextAreaEl!: HTMLTextAreaElement;

  @State() state: string = 'init';

  @Prop() integrationKey: string = '';
  @Prop() fullNamePlaceholderText: string = 'Your Full Name';
  @Prop() emailPlaceholderText: string = 'Your Email';
  @Prop() messagePlaceholderText: string = 'Your Message';
  @Prop() submitButtonText: string = 'Submit';
  @Prop() successMessage: string = 'Thanks for getting in touch';
  @Prop() tags: string;
  @Prop() inputClasses: string = '';
  @Prop() textAreaClasses: string = '';
  @Prop() buttonClasses: string = '';

  private fullName: string = '';
  private email: string = '';
  private message: string = '';
  private tagsArray: Array<string>;
  private isFullNameInputFocused: boolean = false;
  private isEmailInputFocused: boolean = false;
  private errorMessage: string = '';
  private emailRegex: any = /\S+@\S+\.\S+/;

  @Event({
    eventName: 'ps-cf-invalid-fullname-ev',
    bubbles: true,
  })
  invalidFullNameEvent: EventEmitter;

  @Event({
    eventName: 'ps-cf-invalid-email-ev',
    bubbles: true,
  })
  invalidEmailEvent: EventEmitter;

  @Event({
    eventName: 'ps-cf-invalid-message-ev',
    bubbles: true,
  })
  invalidMessageEvent: EventEmitter;

  @Event({
    eventName: 'ps-cf-submission-ev',
    bubbles: true,
  })
  submissionEvent: EventEmitter;

  @Event({
    eventName: 'ps-cf-submission-success-ev',
    bubbles: true,
  })
  submissionSuccessEvent: EventEmitter;

  @Event({
    eventName: 'ps-cf-submission-failed-ev',
    bubbles: true,
  })
  submissionFailedEvent: EventEmitter;

  @Event({
    eventName: 'ps-cf-submission-error-ev',
    bubbles: true,
  })
  submissionErrorEvent: EventEmitter;

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    let code: any;
    if (ev.key !== undefined) {
      code = ev.key;
    } else if (ev.keyCode !== undefined) {
      code = ev.keyCode;
    }
    if (code === 13 || code === 'Enter') {
      if (this.isFullNameInputFocused || this.isEmailInputFocused) {
        this.handleSubmit();
      }
    }
  }

  handleInput(event, el) {
    if (this.state === 'error') this.state = 'init';
    if (event.target.value) {
      if (event.target.value.trim()) {
        if (el === 'fullNameInputEl') {
          this.fullName = event.target.value.trim();
        } else if (el === 'emailInputEl') {
          this.email = event.target.value.trim();
        } else if (el === 'messageInputEl') {
          this.message = event.target.value.trim();
        }
      }
    }
  }

  handleFocus(el) {
    if (el === 'fullNameInputEl') {
      this.isFullNameInputFocused = true;
    } else if (el === 'emailInputEl') {
      this.isEmailInputFocused = true;
    }
  }

  handleBlur(el) {
    if (el === 'fullNameInputEl') {
      this.isFullNameInputFocused = false;
    } else if (el === 'emailInputEl') {
      this.isEmailInputFocused = false;
    }
  }

  handleSubmit() {
    if (this.fullName.length === 0) {
      this.fullNameInputEl.value = '';
      this.errorMessage = 'Please enter a valid Full Name';
      this.state = 'error';
      this.invalidFullNameEvent.emit();
      return;
    }
    if (!this.emailRegex.test(this.email)) {
      this.emailInputEl.value = '';
      this.errorMessage = 'Please enter a valid Email';
      this.state = 'error';
      this.invalidEmailEvent.emit();
      return;
    }
    if (this.message.length === 0) {
      this.messageTextAreaEl.value = '';
      this.errorMessage = 'Please enter a valid Message';
      this.state = 'error';
      this.invalidMessageEvent.emit();
      return;
    }
    this.submitData();
  }

  throwError(state, errorMessage) {
    this.state = state;
    this.errorMessage = errorMessage;
  }

  submitData() {
    let endpoint = document.domain === 'localhost' ? 'http://localhost:3334/contact-form' : `https://api.particle.systems/contact-form/`;

    if (this.tags) {
      if (this.tags.length > 0) {
        this.tagsArray = this.tags.split(',').map(tag => {
          return tag.trim();
        });
      }
    } else {
      this.tagsArray = [];
    }
    let payload = {
      key: this.integrationKey.trim(),
      visitorFullName: this.fullName,
      visitorEmail: this.email,
      visitorMessage: this.message,
      tags: this.tagsArray,
    };

    let options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    this.submissionEvent.emit();
    fetch(endpoint, options)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          this.state = 'success';
          this.submissionSuccessEvent.emit();
        } else if (data.status === 'failed') {
          this.errorMessage = data.message;
          this.state = 'error';
          this.submissionFailedEvent.emit();
        }
      })
      .catch(error => {
        console.log(error);
        this.state = 'error';
        this.submissionErrorEvent.emit();
      });
  }

  render() {
    return (
      <div class="container">
        {this.state === 'init' || this.state === 'submitting' || this.state === 'error' ? (
          <div>
            <input
              type="text"
              class={`fullname-input ${this.inputClasses}`}
              placeholder={this.fullNamePlaceholderText}
              disabled={this.state === 'submitting' ? true : false}
              onInput={(event: UIEvent) => this.handleInput(event, 'fullNameInputEl')}
              onFocus={() => this.handleFocus('fullNameInputEl')}
              onBlur={() => this.handleBlur('fullNameInputEl')}
              ref={el => (this.fullNameInputEl = el as HTMLInputElement)}
            ></input>
            <br />
            <input
              type="email"
              class={`email-input ${this.inputClasses}`}
              placeholder={this.emailPlaceholderText}
              disabled={this.state === 'submitting' ? true : false}
              onInput={(event: UIEvent) => this.handleInput(event, 'emailInputEl')}
              onFocus={() => this.handleFocus('emailInputEl')}
              onBlur={() => this.handleBlur('emailInputEl')}
              ref={el => (this.emailInputEl = el as HTMLInputElement)}
            ></input>
            <br />
            <textarea
              class={`message-textarea ${this.textAreaClasses}`}
              placeholder={this.messagePlaceholderText}
              disabled={this.state === 'submitting' ? true : false}
              onInput={(event: UIEvent) => this.handleInput(event, 'messageInputEl')}
              onFocus={() => this.handleFocus('messageInputEl')}
              onBlur={() => this.handleBlur('messageInputEl')}
              ref={el => (this.messageTextAreaEl = el as HTMLTextAreaElement)}
            ></textarea>
            <br />
            <button class={`submit-button ${this.buttonClasses}`} disabled={this.state === 'submitting' ? true : false} onClick={() => this.handleSubmit()}>
              {this.state === 'submitting' ? <div class="spinner"></div> : this.submitButtonText}
            </button>
            {this.state === 'error' ? <p class="error-message">{this.errorMessage}</p> : ''}
          </div>
        ) : (
          <p class="success-message">{this.successMessage}</p>
        )}
      </div>
    );
  }
}
