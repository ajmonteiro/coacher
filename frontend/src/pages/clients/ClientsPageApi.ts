import { type PaginationSearchParamsType } from '@resourge/react-fetch';

import HttpBaseService from 'src/shared/services/HttpBaseService';

class ClientsPageApi {
	public async all(pagination: PaginationSearchParamsType): Promise<any> {
		return await HttpBaseService.get(`/User
			${pagination.perPage ? `
				?perPage=${pagination.perPage}
				&page=${pagination.page}` : ''}
		`);
	}

	public async delete(id: string): Promise<any> {
		return await HttpBaseService.delete(`/User/${id}`);
	}
}

export default new ClientsPageApi();
