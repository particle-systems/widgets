import { Component, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'ps-email-capture',
  styleUrl: 'ps-email-capture.css',
})
export class PsEmailCapture {
  @State() state: string = 'init';

  @Prop() heading: string;
  @Prop() placeholder: string;
  @Prop() buttonText: string;
  @Prop() buttonActionText: string;
  @Prop() subtext: string;
  @Prop() successMsg: string;

  @Prop() email: string;
  @Prop() loc: string;

  private isTextboxFocused: boolean = false;
  private errorMessage: string;
  inputBoxEl!: HTMLInputElement;

  private handleSubmit() {
    this.state = 'submitting';
    const enpointUrl: string = 'http://localhost:1153/email-capture';
    const payload = {
      email: this.email,
      loc: this.loc,
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
        console.log(`Error: ${error}`);
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
    return [
      <div class="ps-ec-container">
        {this.state != 'success' ? (
          <div>
            {this.heading ? <h1 class="ps-ec-heading">{this.heading}</h1> : ''}
            <div class="ps-ec-input-group">
              <input
                type="email"
                class={this.state === 'error' ? 'ps-ec-input ps-ec-input-error' : 'ps-ec-input'}
                placeholder={this.placeholder}
                disabled={this.state === 'submitting' ? true : false}
                onInput={(event: UIEvent) => this.handleEmailInput(event)}
                onFocus={() => this.handleTextboxFocus()}
                onBlur={() => this.handleTextboxBlur()}
                ref={el => (this.inputBoxEl = el as HTMLInputElement)}
              ></input>
              <button class="ps-ec-button" disabled={this.state === 'submitting' ? true : false} onClick={() => this.handleSubmit()}>
                {this.buttonText}
              </button>
            </div>
            {this.subtext ? <p class="ps-ec-subtext">{this.subtext}</p> : ''}
            {this.state === 'error' ? <p class="ps-ec-failed-msg">{this.errorMessage}</p> : ''}
          </div>
        ) : (
          <div>
            {this.state === 'success' ? (
              <div>
                <p class="ps-ec-success-msg">{this.successMsg}</p>
                <button class="ps-ec-reset-button" onClick={() => this.init()}>
                  Submit another email
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>,
    ];
  }
}
