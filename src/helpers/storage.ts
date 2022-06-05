const storageHandler: any = {
	setValue: (name: any, value: any) => {
		window.localStorage.setItem(name, value);
	},

	getValue: (name: any) => {
		return window.localStorage.getItem(name);
	},

	removeValue: (name: any) => {
		window.localStorage.removeItem(name);
	},
};

export default storageHandler;
