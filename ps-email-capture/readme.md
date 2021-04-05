# Introduction

**ps-email-capture** is a customisable web component designed specifically to capture emails on your websites. It is one of the many UI components offered by [Particle Systems](https://particle.systems) that enables you to implement dynamic features in your static website

<br/>
<br/>

# Install using CDN

**1.** Add the following `script` tag to the pages where you want to use the component

```
<script type="module" src="https://unpkg.com/ps-email-capture/dist/ps-email-capture/ps-email-capture.esm.js"></script>
```

**2.** Add the component to the website in the desired location

```
E.g. landing-page.html
(other HTML above)

<ps-email-capture
    integration-key="Your Integration Key"
    heading="Join our early invite list"
    tags="landing-page, after-hero-section"
    input-placeholder-text="Your email"
    submit-button-text="Join Now"
    subtext="We don't spam. Get 1 email every Friday"
    success-message="Congrats! you have joined our list"
	btn-classes="Your bootstrap/Foundation button classes e.g. btn btn-primary"
></ps-email-capture>

(other HTML below)
```

<br/>
<br/>

# Styling

After adding the component to your codebase as shown above, copy paste the following CSS into your stylesheet and tweak around until you get your desired look :)

```
      /* Defines component width */
      ps-email-capture .container {
        width: 500px;
      }

      /* Component heading styles */
      ps-email-capture .heading-text {
        margin-bottom: 0.5em;
      }

      /* .input-group is the container of the inputbox and submit button */
      /* display:flex, aligns the inputbox and submit button in a row*/
      ps-email-capture .input-group {
        display: flex;
      }

      /* Inputbox styles */
      ps-email-capture .email-input {
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.6);
        padding: 1em;
        font-size: 1em;
        width: 70%;
        outline: none;
      }

      /* Submit button styles */
      ps-email-capture .submit-button {
        font-size: 1em;
        border: 1px solid rgba(0, 0, 0, 0.6);
        width: 30%;
        border-left: 0;
      }

      /* Subtext styles */
      ps-email-capture .subtext {
        color: rgba(0, 0, 0, 0.6);
        margin-top: 0.5em;
        font-size: 0.9em;
      }

      /* Error message styles */
      ps-email-capture .error-message {
        background: #fadbd8;
        color: #a2352a;
        padding: 1em;
        border-radius: 0.25em;
      }

      /* Success message styles */
      ps-email-capture .success-message {
        background: #d4efdf;
        color: #1b7a43;
        padding: 1em;
        border-radius: 0.25em;
      }

      /* CSS spinner that appears inside the button during email submission */
      ps-email-capture .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
      }

      /* Input style when email is valid */
      ps-email-capture .valid-email-input {
        border: 1px solid green;
      }

      /* Input style when email is invalid */
      ps-email-capture .invalid-email-input {
        border: 1px solid red;
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

      /* Responsive code for tablet and mobile  */
      @media only screen and (max-width: 768px) {
        ps-email-capture .input-group {
          display: block;
        }

        ps-email-capture .container {
          width: 100%;
        }

        ps-email-capture .email-input {
          width: 100%;
          margin-bottom: 0;
          text-align: center;
          padding: 0.75em;
        }

        ps-email-capture .submit-button {
          width: 100%;
          margin-top: 0;
          padding: 0.75em;
          border: 1px solid rgba(0, 0, 0, 0.6);
          border-top: 0;
        }
      }
```
