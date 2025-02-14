import { type SelectItem } from 'src/shared/models/SelectItem';
import { TranslationInstance } from 'src/shared/translations/Translations';

export const themes: SelectItem[] = [
	{
		label: TranslationInstance.T.themes.rosegoldblush,
		value: 'myluxuryrosegoldblush'
	},
	{
		label: TranslationInstance.T.themes.emerald,
		value: 'myluxuryemerald'
	},
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
		label: TranslationInstance.T.themes.bronze,
		value: 'myluxurybronze'
	},
	{
		label: TranslationInstance.T.themes.fitness,
		value: 'myluxuryfitness'
	},
	{
		label: TranslationInstance.T.themes.pink,
		value: 'myluxurypink'
	}
];
