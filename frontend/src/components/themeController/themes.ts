import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';

export const themes: SelectItem[] = [
	{
		label: TranslationInstance.T.themes.ruby,
		value: 'myluxuryruby'
	},
	{
		label: TranslationInstance.T.themes.sapphire,
		value: 'myluxurysapphire'
	}, 
	{
		label: TranslationInstance.T.themes.onyx,
		value: 'myluxuryonyx'
	},
	{
		label: TranslationInstance.T.themes.lavender,
		value: 'myluxurylavender'
	}
];
