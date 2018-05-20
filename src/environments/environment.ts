// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyBqYyGpkkRu_HLalpEsCcJmka-ZrOsJRog",
		authDomain: "loklak-search.firebaseapp.com",
		databaseURL: "https://loklak-search.firebaseio.com",
		projectId: "loklak-search",
		storageBucket: "loklak-search.appspot.com",
		messagingSenderId: "639047141939"
	}
};
