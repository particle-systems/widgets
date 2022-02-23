import { Component, Event, EventEmitter, State, Host, Prop, FunctionalComponent, h } from '@stencil/core';

interface SubmitButtonProps {
  label: string;
}

interface ErrorMessageProps {
  message: string;
}

interface SubmittedMessageProps {
  message: string;
}

@Component({
  tag: 'ps-poll',
  styleUrl: 'ps-poll.css',
})
export class PsPoll {
  /* Prop Declaration */
  @Prop() selection: string;
  @Prop() options: any;
  @Prop() name: string;
  @Prop() errorMsg: string;
  @Prop() submittedMsg: string;
  @Prop() submitButtonLabel: string;
  @Prop() explicitSubmit: boolean = false;
  @Prop() emitEvents: boolean = false;

  /* State Declaration */
  @State() compState: string = 'init';

  /* Variable Declaration */
  private singlePollChoice: string;
  private multiPollChoices: any = [];

  /* Event Declaration */
  @Event({
    eventName: 'psPollEvent',
    bubbles: true,
  })
  psPollEventEmitter: EventEmitter;

  eventDispatcher(eventName: string, data: any) {
    this.psPollEventEmitter.emit({ name: eventName, data: data });
  }

  /* Single Choice Input Handler */
  handleSingleChoiceInput(e) {
    this.singlePollChoice = e.target.value;
    if (this.emitEvents) this.eventDispatcher('singleChoiceSelected', this.singlePollChoice);
    if (!this.explicitSubmit) this.submitPoll();
  }

  /* Multi Choice Input Handler */
  handleMultiChoiceInput(e) {
    if (e.target.checked) {
      this.multiPollChoices.push(e.target.value);
      if (this.emitEvents) this.eventDispatcher('multiChoiceSelected', this.multiPollChoices);
    } else {
      this.multiPollChoices = this.multiPollChoices.filter(item => item !== e.target.value);
      if (this.emitEvents) this.eventDispatcher('multiChoiceUnselected', this.multiPollChoices);
    }
  }

  /* Poll Submission Handler */
  submitPoll() {
    this.compState = 'submitting';
    this.compState = 'submitted';
    let payload: any;
    if (this.selection === 'single') {
      payload = this.singlePollChoice;
    } else if (this.selection === 'multi') {
      payload = this.multiPollChoices;
    }
    if (this.emitEvents) this.eventDispatcher('submittingPoll', payload);
    if (this.emitEvents) this.eventDispatcher('submittedPoll', payload);
  }

  render() {
    const SubmitButton: FunctionalComponent<SubmitButtonProps> = ({ label }) =>
      this.explicitSubmit && (
        <button class="submit-button" onClick={() => this.submitPoll()}>
          {label}
        </button>
      );

    const SubmittedMessage: FunctionalComponent<SubmittedMessageProps> = ({ message }) => this.compState === 'submitted' && <div class="submitted-container">{message}</div>;

    const ErrorMessage: FunctionalComponent<ErrorMessageProps> = ({ message }) => this.compState === 'error' && <div class="error-container">{message}</div>;

    const SingleChoicePoll: FunctionalComponent = () => (
      <div class="container">
        {this.compState === 'init' &&
          this.options.map(option => (
            <div class={`item ${this.compState === 'submitting' && 'item-disabled'}`}>
              <input
                class="input"
                id={option.value}
                type="radio"
                name={this.name.trim().replace(/\s/g, '')}
                value={option.value}
                onChange={e => this.handleSingleChoiceInput(e)}
                disabled={this.compState === 'submitting' ? true : false}
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
        {this.compState === 'init' &&
          this.options.map(option => (
            <div class="item">
              <input
                class="input"
                id={option.value}
                type="checkbox"
                name={this.name.trim().replace(/\s/g, '')}
                value={option.value}
                onChange={e => this.handleMultiChoiceInput(e)}
                disabled={this.compState === 'submitting' ? true : false}
              ></input>
              <label class="label" htmlFor={option.value}>
                {option.label}
              </label>
            </div>
          ))}
      </div>
    );

    return (
      <Host>
        {this.selection === 'single' && <SingleChoicePoll></SingleChoicePoll>}
        {this.selection === 'multi' && <MultiChoicePoll></MultiChoicePoll>}
        <SubmittedMessage message={this.submittedMsg}></SubmittedMessage>
        <ErrorMessage message={this.errorMsg}></ErrorMessage>
        {this.compState != 'submitted' && <SubmitButton label={this.submitButtonLabel}></SubmitButton>}
      </Host>
    );
  }
}
