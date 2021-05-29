# Introduction

`ps-contact-form` is the quintessential contact form that every website needs. It is one of the many UI components offered by [Particle Systems](https://particle.systems) that enables you to implement dynamic features in your static website

<br/>
<br/>

# Benefits

- ✅ Email is validated on both client and server side
- ✅ Data is submitted without page reload
- ✅ This component can be used inline, as a modal or popup
- ✅ This component can be integrated with Airtable, Google Sheets
- ✅ You can configure this component to send you an email notification whenever this form is submitted
- ✅ Email is checked whether it exists and is deliverable (Coming soon)
  <br/>
  <br/>

# Prerequisite

In order to use this component on your website, **you will need an integration key**. Since we are just starting out, we don't yet have a dedicated interface on our website to generate this key. At the moment, we are doing this manually.

In order to receive the integration key, kindly mail the following details to [tuhin.bhuyan0@gmail.com](mailto:tuhin.bhuyan0@gmail.com) with the subject _Integration key request for ps-contact-form_

1. Which services would you like to integrate with (Airtable or Google Sheets)?
2. Email id that should get notifications when the form is submitted
3. Domain names of the websites where you will use the component (We need it for security measures)

Optionally, you can drop your request on [Twitter (xtbhyn)](https://twitter.com/xtbhyn)

<br/>
<br/>

# Install using CDN

**1.** Add the following `script` tag to the pages where you want to use the component

```
<script type="module" src="https://unpkg.com/ps-contact-form/dist/ps-contact-form/ps-contact-form.esm.js" async></script>
```

**2.** Add the component to the website in the desired location

```
(landing-page.html)


  <ps-contact-form
      integration-key="Your Integration Key"
      full-name-placeholder-text="Full Name"
      email-placeholder-text="Email"
      message-placeholder-text="Message"
      submit-button-text="Submit"
      success-message="Thank you for contacting us, we will get back to your shortly"
      tags="homepage, before-footer"
    ></ps-contact-form>
```

<br/>
<br/>

# Styling

After adding the component to your codebase as shown above, copy paste the following CSS into your stylesheet and tweak around until you get your desired look :)

```
  /* Defines component width */
      ps-contact-form .container {
        width: 300px;
      }

      /* Input styles */
      ps-contact-form input {
        box-sizing: border-box;
        border: 2px solid rgba(0, 0, 0, 0.1);
        padding: 1em;
        font-size: 1em;
        width: 70%;
        outline: none;
        width: 100%;
        margin-bottom: 1em;
        border-radius: 0.25em;
      }

      /* Textarea styles */
      ps-contact-form textarea {
        box-sizing: border-box;
        border: 2px solid rgba(0, 0, 0, 0.1);
        padding: 1em;
        font-size: 1em;
        width: 70%;
        outline: none;
        width: 100%;
        font-family: sans-serif;
        height: 150px;
        border-radius: 0.25em;
      }

      /* Submit button styles */
      ps-contact-form button {
        font-size: 1em;
        padding: 1em;
        border: 1px solid rgba(0, 0, 0, 0.3);
        width: 100%;
        border-radius: 0.25em;
        margin-top: 0.75em;
        background: rgba(0, 0, 0, 0.6);
        color: white;
      }
      ps-contact-form button:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.7);
      }

      /* Error message styles */
      ps-contact-form .error-message {
        background: #fadbd8;
        color: #a2352a;
        padding: 1em;
        border-radius: 0.25em;
      }

      /* Success message styles */
      ps-contact-form .success-message {
        background: #d4efdf;
        color: #1b7a43;
        padding: 1em;
        border-radius: 0.25em;
      }

      /* CSS spinner that appears inside the button during data submission */
      ps-contact-form .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          -webkit-transform: rotate(360deg);
        }
      }

      @-webkit-keyframes spin {
        to {
          -webkit-transform: rotate(360deg);
        }
      }
```

<br/>
<br/>

# Events

`ps-contact-form` emits 7 different types of events. The following code block highlights when events are emitted and how to capture them

```
(somepage.html)

<body>
    <!-- Add contact form component -->
    <ps-contact-form
      integration-key="Your Integration Key"
      full-name-placeholder-text="Full Name"
      email-placeholder-text="Email"
      message-placeholder-text="Message"
      submit-button-text="Submit"
      success-message="Thank you for contacting us, we will get back to your shortly"
      tags="homepage, after-hiw, before-footer"
    ></ps-contact-form>

    <script type="text/javascript">
      const contactFormEl = document.querySelector('ps-contact-form');

      contactFormEl.addEventListener('ps-cf-invalid-fullname-ev', () => {
        console.log('[Event] FullName is invalid');
      });

      contactFormEl.addEventListener('ps-cf-invalid-email-ev', () => {
        console.log('[Event] Email is invalid');
      });

      contactFormEl.addEventListener('ps-cf-invalid-message-ev', () => {
        console.log('[Event] Message is invalid');
      });

      contactFormEl.addEventListener('ps-cf-submission-ev', () => {
        console.log('[Event] Submitting contact form data..');
      });

      contactFormEl.addEventListener('ps-cf-submission-success-ev', () => {
        console.log('[Event] Submission successful');
      });

      contactFormEl.addEventListener('ps-cf-submission-failed-ev', () => {
        console.log('[Event] Submission failed');
      });

      contactFormEl.addEventListener('ps-cf-submission-error-ev', () => {
        console.log('[Event] Submission error');
      });
    </script>
  </body>
```
