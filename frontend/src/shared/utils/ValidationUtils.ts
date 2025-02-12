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

export const validateExercises = (exercises: any[]) => {
	const seenExercises = new Set<string>();
	const errors: Record<string, string> = {};

	exercises.forEach((exercise, index) => {
		if (exercise.exercise && exercise.exercise.value) {
			const exerciseValue = exercise.exercise.value.toString();
			if (seenExercises.has(exerciseValue)) {
				errors[`exercises[${index}].exercise`] = TranslationInstance.K.validations.unique;
			}
			else {
				seenExercises.add(exerciseValue);
			}
		}
	});

	return Object.keys(errors).length > 0 ? errors : null;
};
