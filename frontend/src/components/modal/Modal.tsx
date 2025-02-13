import React, { forwardRef, type ReactNode } from 'react';

import { XMarkIcon } from '@heroicons/react/24/solid';

import { useTranslation } from 'src/shared/translations/Translations';

import Button from '../button/Button';

type ModalProps = {
	modalTitle: string
	onClose: () => void
	onSubmit: () => void
	children?: ReactNode
	className?: string
	hrDivider?: boolean
	text?: string
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
	({
		modalTitle, onClose, text, onSubmit, children, hrDivider = false
	}, ref) => {
		const { T } = useTranslation();
		
		return (
			<dialog
				ref={ref}
				className={`fixed left-0 modal modal-bottom md:w-fit w-screen 
					md:min-w-[756px] min-w-screen
					max-h-[80vh]
					overflow-y-scroll
					h-fit mb:mt-0 mt-auto md:m-auto m-0
					overflow-visible
					bg-primary-content rounded-box p-6`}
			>
				<div className="flex flex-col gap-4 w-full">
					<div
						className="absolute top-3 right-3"
					>
						<button onClick={onClose}>
							<XMarkIcon className="w-4 h-4 m-2 text-base-content shadow-sm" />
						</button>
					</div>
					<div className="flex flex-col gap-4">
						<div className="font-bold">{ modalTitle }</div>
						{ text ? <div>{ text }</div> : null }
						{ hrDivider ? <hr className="h-2" /> : null }
					</div>
					{ children }
					<div className="flex md:flex-row flex-col-reverse md:justify-end justify-center gap-[0.62rem]">
						<Button
							className="btn-ghost"
							onClick={onClose}
						>
							{ T.components.modal.cancel }
						</Button>
						<Button
							onClick={() => {
								onSubmit();
							}}
						>
							{ T.components.modal.submit }
						</Button>
					</div>
				</div>
			</dialog>
		);
	});

Modal.displayName = 'Modal';

export default Modal;
