import { useForm } from '@resourge/react-form';
import { object } from '@resourge/schema';

class FreeSearchModel {
	public search: string = '';

	public toModel() {
		return {
			search: this.search
		};
	}
}

export const freeSearchSchema = object({}).compile();

export const useFreeSearchModel = () => useForm(FreeSearchModel, {
	validate: (form) => {
		freeSearchSchema.validate(form);
	},
	validateOnlyAfterFirstSubmit: true
});
