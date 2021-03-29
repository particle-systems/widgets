# # Introduction

**ps-email-capture** is a customisable web component designed specifically to capture emails on your websites

# Install using CDN

**1.** Add the following `script` tag to the pages where you want to use the component

```
<script type="module" src="https://unpkg.com/gec-particle/dist/gec-particle/gec-particle.esm.js"></script>
```

**2.** Add the component to the website in the desired location

```
E.g. landing-page.html
(other HTML above)

<ps-email-capture
    key="your PS key"
    heading="Join our early invite list"
    tags="landing-page, after-hero-section"
    input-placeholder-text="Your email please"
    submit-button-text="Join Now"
    subtext="Get only 1 email / week"
    success-message="Congrats! you have joined our list"
></ps-email-capture>

(other HTML below)
```

# Styling

After adding the component to your codebase as shown above, copy paste the following CSS in your stylesheet and happy tweaking :)

```
ps-email-capture .container {
	width: 400px;
}



ps-email-capture .heading-text {
	margin-bottom: 0.5em;
	font-size: 1.5em;
	font-family: sans-serif;
}



ps-email-capture .input-group {
	display: flex;
}



ps-email-capture .email-input-box {
	box-sizing: border-box;
	border: 1px  solid  rgba(0, 0, 0, 0.6);
	padding: 1em;
	margin-right: 0;
	font-size: 1em;
	width: 70%;
	height: 50px;
}



ps-email-capture .submit-button {
	padding: 0em;
	border: 0;
	margin-left: 0;
	font-size: 1em;
	border: 1px solid rgba(0, 0, 0, 0.6);
	width: 30%;
	border-left: 0;
	background: #ccc;
	height: 50px;
}



ps-email-capture .subtext {
	color: rgba(0, 0, 0, 0.6);
	font-family: sans-serif;
	margin-top: 0.5em;
	font-size: 0.8em;
}



ps-email-capture .error-message {
	background: #fadbd8;
	color: #a2352a;
	padding: 1em;
	border-radius: 0.25em;
}



ps-email-capture .reset-button {
	border: 0;
	background: white;
	margin: 0;
	padding: 0;
	text-decoration: underline;
}



ps-email-capture .reset-button:hover {
	cursor: pointer;
}



ps-email-capture .success-message {
	background: #d4efdf;
	color: #1b7a43;
	padding: 1em;
	border-radius: 0.25em;
}



/* Spinner Animation */
ps-email-capture .spinner {
	display: inline-block;
	width: 20px;
	height: 20px;
	border: 3px  solid  rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top-color: #fff;
	animation: spin 1s  ease-in-out  infinite;
	-webkit-animation: spin 1s  ease-in-out  infinite;
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
