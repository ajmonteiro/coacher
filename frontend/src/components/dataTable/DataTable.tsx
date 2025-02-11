/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	useEffect,
	useRef,
	useState,
	type ReactNode
} from 'react';

import { FolderArrowDownIcon } from '@heroicons/react/24/outline';

import { useAuthentication } from 'src/shared/auth/useAuthentication';
import { useTranslation } from 'src/shared/translations/Translations';

import Button from '../button/Button';
import Modal from '../modal/Modal';
  
type ColumnsType = {
	columnName: string
	columnFormat?: 'date'
	columnLabel?: string
};

type DataTableProps = {
	changePage: any
	columns: ColumnsType[]
	data: any[]
	deleteEntities: (items: string[]) => Promise<void>
	form: ReactNode
	formSubmission: () => void
	paginationData: {
		page: number
		perPage: number
		totalItems: number
		totalPages: number
	}
	tableTitle: string
	entityCreationTitle?: string
	primaryKey?: string
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
	undeletableRows
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
	
	return (
		<div className="flex flex-col pt-11 pb-4 md:px-9  gap-7">
			<Modal
				ref={modalRef}
				modalTitle={T.components.data_table.new}
				onClose={() => {
					handleCloseModal();
				}}
				onSubmit={() => {
					formSubmission();
					handleCloseModal();
				}}
			>
				{ form }
			</Modal>
			<div className="flex justify-between">
				<span className="text-2xl text-base-content font-bold">
					{ tableTitle }
				</span>
				<div>
					<Button 
						className="btn-ghost"
						icon={<FolderArrowDownIcon />}
						onClick={() => {
							if (modalRef.current) {
								modalRef.current.showModal();
							}
						}}
					>
						{ entityCreationTitle ?? T.components.data_table.new }
					</Button>
				</div>
			</div>
			<div className="">
				<table className="table ring-1 ring-t-0 ring-base-300 bg-base-100">
					<thead>
						<tr>
							{
								primaryKey ? (
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
										{ T.components.data_table.no_results }
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
												<td>
													<input
														checked={selectedRows.includes(row[primaryKey])}
														className="checkbox"
														type="checkbox"
														onChange={() => handleCheckboxChange(row[primaryKey])}
													/>
												</td>
											)
											: <td /> 
									}
									{
										columns.map((fieldName, keyIndex) => (
											<td
												key={keyIndex}
											>
												{ row[fieldName.columnName] }
											</td>	
										)) 
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
