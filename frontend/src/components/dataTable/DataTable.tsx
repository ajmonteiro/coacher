import {
	type ReactElement,
	useEffect,
	useRef,
	useState,
	type ReactNode
} from 'react';

import { PlusCircle } from '@phosphor-icons/react';

import { NoData } from 'src/assets/svg/Svg';
import { useTranslation } from 'src/shared/translations/Translations';

import A from '../A/A';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import PhosphorIcon from '../phosphorIcon/PhosphorIcon';
import Svg from '../svg/Svg';
  
type ColumnsType = {
	columnName: string
	columnFormat?: 'date'
	columnLabel?: string
	columnType?: 'normal' | 'link'
};

type TableIconProps = {
	icon: ReactElement
	size?: number
};

type DataTableProps = {
	changePage: any
	columns: ColumnsType[]
	data: any[]
	deleteEntities: (items: string[]) => Promise<void>
	paginationData: {
		page: number
		perPage: number
		totalItems: number
		totalPages: number
	}
	tableTitle: string
	createEntity?: () => void
	deleteAllowed?: boolean
	entityCreationTitle?: string
	form?: ReactNode
	formSubmission?: () => void
	fullWidthTable?: boolean
	goToEntity?: (id: string) => void
	modalTitle?: string
	primaryKey?: string
	tableIcon?: TableIconProps
	triggerModal?: boolean
	undeletableRows?: string[]
};

export default function DataTable({
	changePage,
	paginationData,
	data,
	columns,
	formSubmission,
	tableTitle,
	deleteEntities,
	entityCreationTitle,
	primaryKey,
	form,
	modalTitle,
	undeletableRows,
	deleteAllowed = true,
	fullWidthTable = false,
	goToEntity,
	triggerModal = false,
	createEntity
}: DataTableProps) {
	const { T } = useTranslation();
	const [globalSelected, setGlobalSelected] = useState(false);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const modalRef = useRef<HTMLDialogElement>(null);

	const handleCheckboxChange = (rowId: string) => {
		setSelectedRows((prevSelectedRows) => {
			if (prevSelectedRows.includes(rowId)) {
				return prevSelectedRows.filter((id) => id !== rowId);
			}
			else {
				return [...prevSelectedRows, rowId];
			}
		});
	};

	const handleCloseModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

	useEffect(() => {
		if (globalSelected) {
			if (selectedRows.length !== data.length) { 
				setSelectedRows(data.map((row) => row[primaryKey ?? '']));
			}
		}
		else if (selectedRows.length > 0) { 
			setSelectedRows([]);
		}
	}, [globalSelected, data, primaryKey]);

	useEffect(() => {
		if (triggerModal && modalRef.current) {
			modalRef.current.showModal();
		}
	}, [triggerModal]);

	const showIcon = data.length === 0;
	
	return (
		<div className={`flex flex-col relative ${!fullWidthTable ? 'pt-11 pb-4 md:px-9' : ''} gap-7 w-full h-full`}>
			{
				form && formSubmission ? (
					<Modal
						ref={modalRef}
						modalTitle={modalTitle ?? T.components.data_table.new}
						onClose={() => {
							handleCloseModal();
						}}
						onSubmit={async () => {
							// eslint-disable-next-line @typescript-eslint/await-thenable
							await formSubmission();
							handleCloseModal();
						}}
					>
						{ form }
					</Modal>
				) : null 
			}
			<div className="flex justify-between relative z-1">
				<div className="flex items-center gap-2">
					<span className="text-2xl text-base-content font-black tracking-wide">
						{ tableTitle }
					</span>
				</div>
				{
					form && formSubmission ? (
						<div>
							<Button 
								className="btn-ghost text-primary"
								icon={(
									<PhosphorIcon
										icon={<PlusCircle />}
									/>
								)}
								onClick={() => {
									createEntity?.();
									if (modalRef.current) {
										modalRef.current.showModal();
									}
								}}
							>
								{ entityCreationTitle ?? T.components.data_table.new }
							</Button>
						</div>
					) : null 
				}
			</div>
			<div className="overflow-x-scroll z-1">
				<table className="table ring-1 ring-t-0 ring-base-300 bg-base-100">
					<thead>
						<tr>
							{
								primaryKey && deleteAllowed ? (
									<th>
										<input 
											className="checkbox"
											type="checkbox"
											value={globalSelected ? 'on' : 'off'}
											onChange={() => {
												setGlobalSelected(!globalSelected);
												setSelectedRows(data.map((row) => row[primaryKey]));
											}}
										/>
									</th>
								) : null 
							}
							{
								columns.map((fieldName, index) => (
									<th
										key={index}
									>
										<button
											className="flex"
										>
											<span>
												{ fieldName.columnLabel ?? fieldName.columnName }
											</span>
										</button>
									</th>
								))
							}
						</tr>
					</thead>
					<tbody>
						{
							data.length === 0 ? (
								<tr>
									<td
										className="text-center"
										colSpan={columns.length + 1}
									>
										{
											showIcon 
												? (
													<Svg
														element={NoData}
														height="150"
													/>
												) : null 
										}
									</td>
								</tr>
							) : null 
						}
						{
							data.map((row, rowIndex) => (
								<tr
									key={rowIndex}
									className="hover:bg-base-200 cursor-pointer h-[70px]"
								>
									{
										primaryKey && !undeletableRows?.includes(row[primaryKey])
											? (
												deleteAllowed && (
													<td>
														<input
															checked={selectedRows.includes(row[primaryKey])}
															className="checkbox"
															type="checkbox"
															onChange={() => handleCheckboxChange(row[primaryKey])}
														/>
													</td>
												)
											)
											: <td /> 
									}
									{
										columns.map((fieldName, keyIndex) => {
											const [first, second] = fieldName.columnName.split('.');
											
											if (Array.isArray(row[first])) {
												return (
													<td
														key={keyIndex}
														className="flex flex-wrap gap-2"
														onClick={() => {
															if (primaryKey && goToEntity) {
																goToEntity(row[primaryKey]);
															}	
														}}
													>
														{
															row[first].map((item: any, index: number) => {
																return (
																	<div
																		key={index}
																		className="badge text-xs badge-primary"
																	>
																		{ item.name }
																	</div>
																);
															})
														}
													</td>
												);
											}
											if (second) {
												return (
													<td
														key={keyIndex}
														className="text-xs"
														onClick={() => {
															if (primaryKey && goToEntity) {
																goToEntity(row[primaryKey]);
															}	
														}}
													>
														{
															row[first] ? row[first][second] : ''
														}
													</td>
												);
											}

											return (
												<td
													key={keyIndex} 
													className="text-xs"
													onClick={() => {
														if (primaryKey && goToEntity) {
															goToEntity(row[primaryKey]);
														}	
													}}
												>
													{
														fieldName.columnType === 'link' ? (
															<A
																className="text-xs"
																href={row[fieldName.columnName]}
																rel="noreferrer"
																target="_blank"
																variant="navlink"
															>
																{ row[fieldName.columnName] }
															</A>
														)
															: (
																row[fieldName.columnName]
															) 
													}
												</td>	
											);
										})
									}
								</tr>
							)) 
						}
					</tbody>
				</table>
				<div className="flex gap-3 items-center justify-between mt-3">
					<div className="flex items-center gap-3">
						<span className="text-sm text-[#9CA3AF]">
							{ paginationData.totalItems } 
							{ ' ' }
							{ T.components.data_table.results }
						</span>
						{
							primaryKey && selectedRows.length > 0 ? (
								<div className="w-fit">
									<Button
										className="btn-ghost"
										size="sm"
										onClick={() => deleteEntities(selectedRows)}
									>
										{ T.components.data_table.delete }
									</Button>
								</div>
							) : null 
						}
					</div>
					<div className="join border border-base-300 w-fit">
						<Button
							className="join-item btn-ghost border border-base-300"
							disabled={paginationData.page === 1}
							onClick={() => changePage(paginationData.page - 1)}
						>
							{ '<' }
						</Button>
						<Button
							className="join-item btn-ghost border border-base-300"
						>
							{ paginationData.page }
							/
							{ paginationData.totalPages }
						</Button>
						<Button
							className="join-item btn-ghost border border-base-300"
							disabled={paginationData.page === paginationData.totalPages}
							onClick={() => changePage(paginationData.page + 1)}
						>
							{ '>' }
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
