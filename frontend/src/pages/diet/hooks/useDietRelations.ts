import { useFetch } from '@resourge/react-fetch';

import { SelectItem } from 'src/shared/models/SelectItem';

import DietPageApi from '../DietPageApi';

type UseDietRelationsProps = {
	dietId?: string
};

export const useDietRelations = ({ dietId }: UseDietRelationsProps) => {
	const { data: users } = useFetch<any, any>(async () => {
		const result = await DietPageApi.userOptions();

		return result.data.map((user: SelectItem) => new SelectItem(user));
	}, {
		deps: [],
		initialState: []
	});

	const { data: diet } = useFetch<any, any>(async () => {
		if (dietId) {
			const result = await DietPageApi.get(dietId);
			return result.data;
		}

		return [];
	}, {
		enable: !!dietId,
		deps: [],
		initialState: []
	});

	const { data: foods } = useFetch<any, any>(async () => {
		const result = await DietPageApi.foodOptions();

		return result.data.map((food: SelectItem) => new SelectItem(food));
	}, {
		deps: [],
		initialState: []
	});

	return {
		users,
		foods,
		diet
	};  
};
