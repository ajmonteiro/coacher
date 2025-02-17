import { OrderByEnum, useFetch } from '@resourge/react-fetch';
import { useNavigate } from '@resourge/react-router';

import DataTable from 'src/components/dataTable/DataTable';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import Input from 'src/components/input/Input';
import PhoneInput from 'src/components/phoneInput/PhoneInput';
import SearchableInput from 'src/components/searchableInput/SearchableInput';
import DashboardLayout from 'src/layouts/dashboardLayout/DashboardLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { useDataTable } from 'src/shared/hooks/useDataTable';
import { SelectItem } from 'src/shared/models/SelectItem';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import ClientsPageApi from './ClientsPageApi';
import { useClientModel } from './interfaces/ClientModel';

export default function ClientsPage() {
	const { T } = useTranslation();
	const { user } = useAuthentication();
	const navigate = useNavigate();

	const {
		field, handleSubmit, getErrors, hasError 
	} = useClientModel();

	const { data: roles } = useFetch(async () => {
		const result = await ClientsPageApi.roles();

		return result.data.map((role: SelectItem) => new SelectItem(role));
	}, {
		deps: [],
		initialState: []
	});

	const {
		rows, changePage, paginationData: pagination, deleteEntities, fetchResults
	} = useDataTable({
		entityClass: ClientsPageApi,
		orderColumn: 'username',
		orderBy: OrderByEnum.ASC
	});

	const hasUndeletableRows = (rows: any[]) => {
		return rows.find((row) => row.id === user.id);
	};

	const submit = handleSubmit(async (data) => {
		console.log(data.toModel());
		await ClientsPageApi.create(data);
		fetchResults();
	});

	return (
		<DashboardLayout>
			{
				rows.data ? (
					<DataTable
						changePage={changePage}
						columns={[
							{
								columnName: 'username',
								columnLabel: T.pages.clients.table.username
							},
							{
								columnName: 'fullName',
								columnLabel: T.pages.clients.table.fullName
							},
							{
								columnName: 'phone',
								columnLabel: T.pages.clients.table.phone
							},
							{
								columnName: 'role.name',
								columnLabel: T.pages.clients.table.role
							}
						]}
						data={rows.data}
						deleteEntities={deleteEntities}
						form={(
							<div className="flex flex-col">
								<FormWrapper>
									<FormControl
										errors={getErrors('username')}
										label={T.pages.clients.table.username}
										required
									>
										<Input
											error={hasError('username')}
											{...field('username')}
											placeholder={T.pages.clients.table.username}
										/>
									</FormControl>
									<FormControl
										errors={getErrors('fullName')}
										label={T.pages.clients.table.fullName}
										required
									>
										<Input
											error={hasError('fullName')}
											{...field('fullName')}
											placeholder={T.pages.clients.table.fullName}
										/>
									</FormControl>
								</FormWrapper>
								<FormWrapper>
									<FormControl
										errors={getErrors('password')}
										label={T.pages.clients.table.password}
										required
									>
										<Input
											error={hasError('password')}
											{...field('password')}
											placeholder={T.pages.clients.table.password}
											type="password"
										/>
									</FormControl>
									<FormControl
										errors={getErrors('role')}
										label={T.pages.clients.table.role}
										required
									>
										<SearchableInput
											error={hasError('role')}
											{...field('role')}
											options={roles}
											placeholder={T.pages.clients.table.role}
										/>
									</FormControl>
									<FormControl
										errors={getErrors('phone')}
										label={T.pages.clients.table.phone}
										required
									>
										<PhoneInput
											error={hasError('phone')}
											{...field('phone')} 
											placeholder={T.pages.clients.table.phone}
										/>
									</FormControl>
								</FormWrapper>
								<FormWrapper>
									<FormControl
										errors={getErrors('weight')}
										label={T.pages.clients.table.weight}
										required
									>
										<Input
											error={hasError('weight')}
											{...field('weight')}
											placeholder={T.pages.clients.table.weight}
										/>
									</FormControl>
									<FormControl
										errors={getErrors('height')}
										label={T.pages.clients.table.height}
										required
									>
										<Input
											error={hasError('height')}
											{...field('height')}
											placeholder={T.pages.clients.table.height}
										/>
									</FormControl>
								</FormWrapper>
							</div>
						)}
						formSubmission={submit}
						goToEntity={(id: string) => navigate(Routes.DASHBOARD.USER_PROFILE.get({
							searchParams: {
								userId: id
							}
						}))}
						paginationData={pagination}
						primaryKey="id"
						tableTitle={T.pages.clients.table.tableTitle}
						undeletableRows={hasUndeletableRows(rows.data) ? [user.id] : []}
					/>
				) : null 
			}
		</DashboardLayout>
	);
}
