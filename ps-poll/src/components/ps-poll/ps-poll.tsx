import { Component, State, Host, Prop, FunctionalComponent, h } from '@stencil/core';

@Component({
  tag: 'ps-poll',
  styleUrl: 'ps-poll.css',
})
export class PsPoll {
  @Prop() choice: string;
  @Prop() options: any;
  @Prop() name: string;

  @State() isOptionSelected: boolean = false;
  @State() buttonState: string = 'init';

  handleSingleChoiceInput(e) {
    console.log(e.target.value);
  }

  handleMultiChoiceInput(e) {
    console.log(e.target.value);
  }

  render() {
    const AppointmentDemo: FunctionalComponent = () => (
      <div class="demo-stage-container">
        <p>Demo colonent</p>
      </div>
    );

    const SingleChoicePoll: FunctionalComponent = () => (
      <div class="container">
        {this.options.map(option => (
          <div class="item">
            <input
              class="input"
              id={option.value}
              type="radio"
              name={this.name.trim().replace(/\s/g, '')}
              value={option.value}
              onChange={e => this.handleSingleChoiceInput(e)}
            ></input>
            <label class="label" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );

    const MultiChoicePoll: FunctionalComponent = () => (
      <div class="container">
        {this.options.map(option => (
          <div class="item">
            <input
              class="input"
              id={option.value}
              type="checkbox"
              name={this.name.trim().replace(/\s/g, '')}
              value={option.value}
              onChange={e => this.handleMultiChoiceInput(e)}
            ></input>
            <label class="label" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );

    const submitButton: FunctionalComponent = () => <button>Lel</button>;

    return (
      <Host>
        {this.choice === 'single' && <SingleChoicePoll></SingleChoicePoll>}
        {this.choice === 'multi' && <MultiChoicePoll></MultiChoicePoll>}
        <AppointmentDemo></AppointmentDemo>
      </Host>
    );
  }
}
