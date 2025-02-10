import { useFetch } from '@resourge/react-fetch';

import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';

import UsersPageApi from './UsersPageApi';

export default function UsersPage() {
	const { data: users } = useFetch(async () => {
		const users = await UsersPageApi.all();
		return users.data;
	}, {
		deps: [],
		initialState: []
	});

	console.log(users);
	return (
		<DashboardLayout>
			<div className="flex flex-col gap-5 max-w-[150px]">
				{
					users ? users.map((user: any) => (
						<div
							key={user.username}
							className="bg-white shadow-xl rounded-box py-2 px-4"
						>
							<span className="text-xs text-base-content">
								{ user.username }
							</span>
						</div>
					)) : null 
				}
			</div>
		</DashboardLayout>
	);
}
