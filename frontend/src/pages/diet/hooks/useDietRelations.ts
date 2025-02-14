import { useFetch } from '@resourge/react-fetch';

import { SelectItem } from 'src/shared/models/SelectItem';

import DietPageApi from '../DietPageApi';

type UseDietRelationsProps = {
	userId?: string
};

export const useDietRelations = ({ userId }: UseDietRelationsProps) => {
	const { data: users } = useFetch<any, any>(async () => {
		const result = await DietPageApi.userOptions();

		return result.data.map((user: SelectItem) => new SelectItem(user));
	}, {
		deps: [],
		initialState: [],
		enable: !userId
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
		foods
	};  
};
