<script lang="ts">
	import { browser } from '$app/environment';

	export let siteKey: string;
	export let theme: Theme = 'light';
	export let submitButton: HTMLButtonElement;

	const onLoad = () => {
		submitButton.onclick = (event: MouseEvent) => {
			event.preventDefault();
			window.hcaptcha.execute();
		};
	};

	const onSubmit = (token: string) => {
		const tokenInput = document.createElement('input');
		tokenInput.type = 'text';
		tokenInput.name = 'token';
		tokenInput.value = token;
		tokenInput.hidden = true;

		const form = submitButton.form;
		form?.appendChild(tokenInput);
		form?.requestSubmit();

		tokenInput.remove();
	};

	const onError = (error: Error) => {
		// TODO: Handle error
		console.error(`Error submitting hCaptcha: ${error}`);
	};

	const onExpire = () => {
		// TODO: Handle expire
		console.log('hCaptcha expired');
	};

	if (browser) {
		theme = (document.documentElement.getAttribute('data-theme') as Theme) ?? theme;
		window.onSubmit = onSubmit;
		window.onError = onError;
		window.onExpire = onExpire;
		window.onLoad = onLoad;
	}
	const execute = () => {
		console.log('test');
	};
</script>

<div
	id="hcaptcha"
	class="h-captcha"
	data-sitekey={siteKey}
	data-callback="onSubmit"
	data-error-callback="onError"
	data-expired-callback="onExpire"
	data-size="invisible"
	data-theme={theme}
	data-value={execute}
/>