import { Component, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'ps-email-capture',
  styleUrl: 'ps-email-capture.css',
})
export class PsEmailCapture {
  inputBoxEl!: HTMLInputElement;

  @State() state: string = 'success';

  @Prop() heading: string = '';
  @Prop() tags: string = '';
  @Prop() inputPlaceholderText: string = '';
  @Prop() submitButtonText: string = '';
  @Prop() subtext: string = '';
  @Prop() successMessage: string = '';
  @Prop() key: string = '';

  private email: string;
  private tagsArray: Array<string>;
  private isTextboxFocused: boolean = false;
  private errorMessage: string = 'Oops! something went wrong';

  private handleSubmit() {
    this.state = 'submitting';
    const enpointUrl: string = 'http://localhost:1153/email-capture';
    const payload = {
      email: this.email,
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
    fetch(enpointUrl, options)
      .then(res => res.json())
      .then(data => {
        this.state = data.status;
        if (this.state === 'error') {
          this.errorMessage = data.message;
        }
      })
      .catch(error => {
        console.log(error);
        this.state = 'error';
      });
  }

  private handleTextboxFocus() {
    this.isTextboxFocused = true;
  }

  private handleTextboxBlur() {
    this.isTextboxFocused = false;
  }

  private handleEmailInput(event) {
    this.email = event.target.value;
  }

  private init() {
    this.state = 'init';
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode === 13 && this.email.length > 0) if (this.isTextboxFocused === true) this.handleSubmit();
  }

  render() {
    return (
      <div class="ps-ec-container">
        {this.state === 'init' || this.state === 'submitting' || this.state === 'failed' ? (
          <div>
            <h1 class="ps-ec-heading">{this.heading.length > 0 ? this.heading : 'Get updates in your email'}</h1>
            <div class="ps-ec-inputbutton-group">
              <input
                type="email"
                class="ps-ec-input"
                placeholder={this.inputPlaceholderText.length > 0 ? this.inputPlaceholderText : 'Enter email'}
                disabled={this.state === 'submitting' ? true : false}
                onInput={(event: UIEvent) => this.handleEmailInput(event)}
                onFocus={() => this.handleTextboxFocus()}
                onBlur={() => this.handleTextboxBlur()}
                ref={el => (this.inputBoxEl = el as HTMLInputElement)}
              ></input>
              <button class="ps-ec-submit-button" disabled={this.state === 'submitting' ? true : false} onClick={() => this.handleSubmit()}>
                {this.submitButtonText.length > 0 ? this.submitButtonText : 'Submit'}
              </button>
            </div>
            <p class="ps-ec-subtext">{this.subtext.length > 0 ? this.subtext : "Only 1 email per week. We don't spam :)"}</p>
            {this.state === 'failed' ? <p class="ps-ec-error-msg">{this.errorMessage}</p> : ''}
          </div>
        ) : (
          <div>
            <p class="ps-ec-success-msg">{this.successMessage.length > 0 ? this.successMessage : ''}</p>
            <button class="ps-ec-reset-button" onClick={() => this.init()}>
              Submit another email
            </button>
          </div>
        )}
      </div>
    );
  }
}
