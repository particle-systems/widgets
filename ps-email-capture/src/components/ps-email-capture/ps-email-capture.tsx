import { Component, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'ps-email-capture',
  styleUrl: 'ps-email-capture.css',
})
export class PsEmailCapture {
  inputBoxEl!: HTMLInputElement;

  @State() state: string = 'init';

  @Prop() heading: string = '';
  @Prop() tags: string = '';
  @Prop() inputPlaceholderText: string = '';
  @Prop() submitButtonText: string = '';
  @Prop() spinnerUrl: string = '';
  @Prop() subtext: string = '';
  @Prop() successMessage: string = '';
  @Prop() key: string = '';

  private email: string;
  private tagsArray: Array<string>;
  private isTextboxFocused: boolean = false;
  private errorMessage: string = 'Oops! something went wrong';

  private handleSubmit() {
    this.state = 'submitting';
    if (this.tags.length > 0) {
      this.tagsArray = this.tags.split(',').map(tag => {
        return tag.trim();
      });
      console.log(this.tagsArray);
    }
    //const endpointUrl: string = 'http://localhost:3334/email-capture';
    const endpointUrl: string = 'https://api.particle.systems/email-capture';
    const payload = {
      key: this.key,
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
      <div class="container">
        {this.state === 'init' || this.state === 'submitting' || this.state === 'failed' ? (
          <div>
            <h1 class="heading-text">{this.heading.length > 0 ? this.heading : 'Get updates in your email'}</h1>
            <div class="input-group">
              <input
                type="email"
                class="email-input-box"
                placeholder={this.inputPlaceholderText.length > 0 ? this.inputPlaceholderText : 'Enter email'}
                disabled={this.state === 'submitting' ? true : false}
                onInput={(event: UIEvent) => this.handleEmailInput(event)}
                onFocus={() => this.handleTextboxFocus()}
                onBlur={() => this.handleTextboxBlur()}
                ref={el => (this.inputBoxEl = el as HTMLInputElement)}
              ></input>
              <button class="submit-button" disabled={this.state === 'submitting' ? true : false} onClick={() => this.handleSubmit()}>
                {this.state === 'submitting' ? <div class="spinner"></div> : this.submitButtonText.length > 0 ? this.submitButtonText : 'Submit'}
              </button>
            </div>
            <p class="subtext">{this.subtext.length > 0 ? this.subtext : "Only 1 email per week. We don't spam :)"}</p>
            {this.state === 'failed' ? <p class="error-message">{this.errorMessage}</p> : ''}
          </div>
        ) : (
          <div>
            <p class="success-message">{this.successMessage.length > 0 ? this.successMessage : ''}</p>
            <button class="reset-button" onClick={() => this.init()}>
              Submit another email
            </button>
          </div>
        )}
      </div>
    );
  }
}
