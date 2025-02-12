import { type ReactNode } from 'react';

import { useTranslation } from 'src/shared/translations/Translations';

type TableProps = {
	changePage: (page: number) => void
	children: ReactNode
	headerColumns: string[]
	pagination: {
		page: number
		perPage: number
		totalItems: number
		totalPages: number
	}
};

export default function Table({
	children, headerColumns, pagination, changePage
}: TableProps) {
	const { T } = useTranslation();
	return (
		<>		
			<div className="overflow-x-auto bg-base-100 shadow-md rounded-box">
				<table className="table table-bordered border-1 w-full">
					<thead className="bg-base-100">
						<tr>
							{
								headerColumns.map((headerColumn, index: number) => (
									<th
										key={index}
										className="text-left"
									>
										{ headerColumn }
									</th>
								)) 
							}
						</tr>
					</thead>
					<tbody className="bg-base-200">
						{ children }
					</tbody>
				
				</table>
			
			</div>
			<div className="join flex items-center justify-center gap-3 mt-3">
				<div className="join">
					<button
						className="join-item btn"
						disabled={pagination.page === 1}
						onClick={() => changePage(pagination.page - 1)}
					>
						«
					</button>
					<button className="join-item btn">
						{ T.components.table.page } 
						{ ' ' }
						{ pagination.page }
					</button>
					<button
						className="join-item btn"
						disabled={pagination.page === pagination.totalPages}
						onClick={() => changePage(pagination.page + 1)}
					>
						»
					</button>
				</div>
			</div>
		</>

	);
}
