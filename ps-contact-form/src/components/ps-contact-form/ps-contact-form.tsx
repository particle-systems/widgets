import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'ps-contact-form',
  styleUrl: 'ps-contact-form.css',
})
export class PsContactForm {
  formContainer!: HTMLDivElement;
  @Prop() schema: any;
  @State() isFormLoaded: boolean = false;

  componentDidLoad() {
    this.schema.map(item => {
      if (item.field === 'textField') {
        let input = document.createElement('input');
        input.type = item.type;
        input.name = item.name;
        input.placeholder = item.placeholder;
        this.formContainer.appendChild(input);
      } else if (item.field === 'textareaField') {
        let textarea = document.createElement('textarea');
        this.formContainer.appendChild(textarea);
      } else if (item.field === 'submitField') {
        let submitButton = document.createElement('button');
        submitButton.innerText = item.value;
        this.formContainer.appendChild(submitButton);
      }
    });

    this.isFormLoaded = true;
  }

  render() {
    return <div class="container" ref={el => (this.formContainer = el as HTMLDivElement)}></div>;
  }
}
