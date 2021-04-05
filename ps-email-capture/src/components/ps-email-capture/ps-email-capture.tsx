import { Component, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'ps-email-capture',
  styleUrl: 'ps-email-capture.css',
})
export class PsEmailCapture {
  inputBoxEl!: HTMLInputElement;

  @State() state: string = 'init';
  @State() isEmailValid: boolean = false;

  @Prop() heading: string = '';
  @Prop() tags: string = '';
  @Prop() inputPlaceholderText: string = '';
  @Prop() submitButtonText: string = '';
  @Prop() subtext: string = '';
  @Prop() successMessage: string = '';
  @Prop() integrationKey: string = '';
  @Prop() btnClasses: string = '';

  private email: string = '';
  private tagsArray: Array<string>;
  private isTextboxFocused: boolean = false;
  private errorMessage: string = 'Oops! something went wrong';
  private emailRegex: any = /\S+@\S+\.\S+/;

  private handleSubmit() {
    if (!this.isEmailValid) {
      this.errorMessage = 'Please enter a valid email';
      this.state = 'failed';
      this.inputBoxEl.value = '';
      return;
    }
    this.state = 'submitting';
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
          this.state = 'success';
        } else if (data.status === 'failed') {
          this.errorMessage = data.message;
          this.state = 'failed';
        }
      })
      .catch(error => {
        console.log(error);
        this.state = 'failed';
      });
  }

  private handleTextboxFocus() {
    this.isTextboxFocused = true;
  }

  private handleTextboxBlur() {
    this.isTextboxFocused = false;
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
    console.log(`isValidEmail: ${this.isEmailValid}`);
  }

  emailValidator(email: string) {
    return this.emailRegex.test(email);
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode === 13 && this.email.length > 0) if (this.isTextboxFocused === true) this.handleSubmit();
  }

  render() {
    return (
      <div class="container">
        {this.state === 'init' || this.state === 'submitting' || this.state === 'failed' ? (
          <div>
            <h1 class="heading-text">{this.heading}</h1>
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
              <button
                class={this.btnClasses.length > 0 ? this.btnClasses : 'submit-button'}
                disabled={this.state === 'submitting' ? true : false}
                onClick={() => this.handleSubmit()}
              >
                {this.state === 'submitting' ? <div class="spinner"></div> : this.submitButtonText}
              </button>
            </div>
            <p class="subtext">{this.subtext}</p>
            {this.state === 'failed' ? <p class="error-message">{this.errorMessage}</p> : ''}
          </div>
        ) : (
          <div>
            <p class="success-message">{this.successMessage.length > 0 ? this.successMessage : ''}</p>
          </div>
        )}
      </div>
    );
  }
}
