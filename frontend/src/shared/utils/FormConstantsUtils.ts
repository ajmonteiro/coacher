import { type SelectItem } from '../models/SelectItem';
import { TranslationInstance } from '../translations/Translations';

export const WEEKDAY_OPTIONS: SelectItem[] = [
	{
		label: TranslationInstance.T.formConstants.weekDays.monday,
		value: 'monday'
	},
	{
		label: TranslationInstance.T.formConstants.weekDays.tuesday,
		value: 'tuesday'
	},
	{
		label: TranslationInstance.T.formConstants.weekDays.wednesday,
		value: 'wednesday'
	},
	{
		label: TranslationInstance.T.formConstants.weekDays.thursday,
		value: 'thursday'
	},
	{
		label: TranslationInstance.T.formConstants.weekDays.friday,
		value: 'friday'
	},
	{
		label: TranslationInstance.T.formConstants.weekDays.saturday,
		value: 'saturday'
	},
	{
		label: TranslationInstance.T.formConstants.weekDays.sunday,
		value: 'sunday'
	}
];
