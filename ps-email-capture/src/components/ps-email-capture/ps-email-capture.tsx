import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'ps-email-capture',
  styleUrl: 'ps-email-capture.css',
})
export class PsEmailCapture {
  @State() state: string = 'init';

  @Prop() heading: string;
  @Prop() placeholder: string;
  @Prop() buttonText: string;
  @Prop() subtext: string;
  @Prop() successMsg: string;
  @Prop() errorMsg: string;

  render() {
    return (
      <div class="ps-ec-container">
        {this.heading ? <h1 class="ps-ec-heading">{this.heading}</h1> : ''}
        <div class="ps-ec-input-group">
          <input class="ps-ec-input" placeholder={this.placeholder}></input>
          <button class="ps-ec-button">{this.buttonText}</button>
        </div>
        {/* {this.subtext ? <p class="ps-ec-subtext">{this.subtext}</p> : ''}
        {this.state === 'success' ? <p class="ps-ec-success-msg">Success message</p> : ''}
        {this.state === 'error' ? <p class="ps-ec-failed-msg">Error message</p> : ''} */}
        <p class="ps-ec-subtext">{this.subtext}</p>
        <p class="ps-ec-success-msg">{this.successMsg}</p>
        <p class="ps-ec-failed-msg">{this.errorMsg}</p>
      </div>
    );
  }
}
