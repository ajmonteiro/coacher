import { string } from '@resourge/schema';

import { TranslationInstance } from '../translations/Translations';

export const schemaPassword = string()
.test((value) => {
	if ( /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(value)) {
		return [];
	}

	return [{
		path: '',
		error: TranslationInstance.K.validations.password.required
	}];
})
.required(TranslationInstance.K.validations.password.required);

export const confirmPassword = string()
.test((value, parent) => {
	if ( value && (parent.password !== value) ) {
		return [{
			path: 'confirmPassword',
			error: TranslationInstance.K.validations.password.invalid
		}];
	}
	return [];
})
.required(TranslationInstance.K.validations.password.required);
