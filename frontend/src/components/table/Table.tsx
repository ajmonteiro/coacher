import { type ReactNode } from 'react';

import { useTranslation } from 'src/shared/translations/Translations';

type TableProps = {
	children: ReactNode
	headerColumns: string[]
	changePage?: (page: number) => void
	pagination?: {
		page: number
		perPage: number
		totalItems: number
		totalPages: number
	}
	tableClassName?: string
};

export default function Table({
	children, headerColumns, pagination, changePage, tableClassName
}: TableProps) {
	const { T } = useTranslation();
	return (
		<>		
			<div className="overflow-x-auto bg-base-100 shadow-md rounded-box">
				<table className={`table ring-1 ring-t-0 ring-base-300 ${tableClassName ?? ''}`}>
					<thead className="bg-gold text-primary-content">
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
					<tbody>
						{ children }
					</tbody>
				
				</table>
			
			</div>
			{
				pagination ? (
					<div className="join flex items-center justify-center gap-3 mt-3">
						<div className="join">
							<button
								className="join-item btn"
								disabled={pagination.page === 1}
								onClick={() => changePage?.(pagination.page - 1)}
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
								onClick={() => changePage?.(pagination.page + 1)}
							>
								»
							</button>
						</div>
					</div>
				) : null 
			}
		</>

	);
}
