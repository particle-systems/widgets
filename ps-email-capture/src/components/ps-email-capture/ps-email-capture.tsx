import { Component, h, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'ps-email-capture',
  styleUrl: 'ps-email-capture.css',
})
export class PsEmailCapture {
  inputBoxEl!: HTMLInputElement;

  @State() state: string = 'init';
  @State() isEmailValid: boolean = false;

  @Prop() tags: string = 'landing-page';
  @Prop() inputPlaceholderText: string = 'Your Email';
  @Prop() submitButtonText: string = 'Subscribe';
  @Prop() successMessage: string = 'You have subscribed to our list';
  @Prop() failureMessage: string = 'Oops! something went wrong';
  @Prop() invalidEmailMessage: string = 'Please enter a valid email';
  @Prop() integrationKey: string = '';
  @Prop() btnClasses: string = '';
  @Prop() events: string = 'disabled';

  private email: string = '';
  private tagsArray: Array<string>;
  private isTextboxFocused: boolean = false;
  private errorMessage: string = this.failureMessage;
  private emailRegex: any = /\S+@\S+\.\S+/;

  @Event({
    eventName: 'ps-invalid-email',
    bubbles: true,
  })
  invalidEmailEvent: EventEmitter;

  @Event({
    eventName: 'ps-email-submission',
    bubbles: true,
  })
  emailSubmissionEvent: EventEmitter;

  @Event({
    eventName: 'ps-email-submission-success',
    bubbles: true,
  })
  emailSubmissionSuccessEvent: EventEmitter;

  @Event({
    eventName: 'ps-email-submission-failed',
    bubbles: true,
  })
  emailSubmissionFailedEvent: EventEmitter;

  @Event({
    eventName: 'ps-email-submission-error',
    bubbles: true,
  })
  emailSubmissionErrorEvent: EventEmitter;

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode === 13 && this.email.length > 0) if (this.isTextboxFocused === true) this.handleSubmit();
  }

  private handleEmailInput(event) {
    if (event.target.value) {
      if (event.target.value.trim()) {
        this.email = event.target.value;
        this.isEmailValid = this.emailValidator(this.email);
      }
    }
    if (this.state === 'failed') {
      this.state = 'init';
    }
  }

  private emailValidator(email: string) {
    return this.emailRegex.test(email);
  }

  private handleSubmit() {
    if (!this.isEmailValid) {
      this.errorMessage = this.invalidEmailMessage;
      this.state = 'failed';
      this.inputBoxEl.value = '';
      this.emitEvent('invalid-email');
      return;
    }
    this.state = 'submitting';
    this.emitEvent('email-submission');
    if (this.tags.length > 0) {
      this.tagsArray = this.tags.split(',').map(tag => {
        return tag.trim();
      });
    }
    const endpointUrl: string = 'https://api.particle.systems/email-capture/';
    // const endpointUrl: string = 'http://localhost:3334/email-capture';
    const payload = {
      key: this.integrationKey.trim(),
      email: this.email.trim(),
      tags: this.tagsArray,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    fetch(endpointUrl, options)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          this.emitEvent('email-submission-success');
          this.state = 'success';
        } else if (data.status === 'failed') {
          this.errorMessage = data.message;
          this.emitEvent('email-submission-failed');
          this.state = 'failed';
        }
      })
      .catch(error => {
        console.log(error);
        this.emitEvent('email-submission-error');
        this.state = 'failed';
      });
  }

  private handleTextboxFocus() {
    this.isTextboxFocused = true;
  }

  private handleTextboxBlur() {
    this.isTextboxFocused = false;
  }

  private emitEvent(eventName) {
    if (this.events != 'enabled') {
      return;
    }

    if (eventName === 'invalid-email') {
      this.invalidEmailEvent.emit();
    } else if (eventName === 'email-submission') {
      this.emailSubmissionEvent.emit();
    } else if (eventName === 'email-submission-success') {
      this.emailSubmissionSuccessEvent.emit();
    } else if (eventName === 'email-submission-failed') {
      this.emailSubmissionFailedEvent.emit();
    } else if (eventName === 'email-submission-error') {
      this.emailSubmissionErrorEvent.emit();
    }
  }

  render() {
    return (
      <div class="container">
        {this.state === 'init' || this.state === 'submitting' || this.state === 'failed' ? (
          <div>
            <div class="input-group">
              <input
                type="email"
                class={`email-input ${this.email.length > 0 ? (this.isEmailValid ? 'valid-email-input' : 'invalid-email-input') : ''}`}
                placeholder={this.inputPlaceholderText}
                disabled={this.state === 'submitting' ? true : false}
                onInput={(event: UIEvent) => this.handleEmailInput(event)}
                onFocus={() => this.handleTextboxFocus()}
                onBlur={() => this.handleTextboxBlur()}
                ref={el => (this.inputBoxEl = el as HTMLInputElement)}
              ></input>
              <button class={`submit-button ${this.btnClasses}`} disabled={this.state === 'submitting' ? true : false} onClick={() => this.handleSubmit()}>
                {this.state === 'submitting' ? <div class="spinner"></div> : this.submitButtonText}
              </button>
            </div>
            {this.state === 'failed' ? <p class="error-message">{this.errorMessage}</p> : ''}
          </div>
        ) : (
          <p class="success-message">{this.successMessage.length > 0 ? this.successMessage : ''}</p>
        )}
      </div>
    );
  }
}
