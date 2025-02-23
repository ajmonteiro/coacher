import { type CSSProperties, type ReactNode } from 'react';

import { useTranslation } from 'src/shared/translations/Translations';

type FormControlProps = {
	children?: ReactNode
	className?: string
	errors?: string[]
	hasRequiredLabel?: boolean
	id?: string
	label?: string
	required?: boolean
	style?: CSSProperties
};

export default function FormControl({
	children, errors, label, style, className, required = false, hasRequiredLabel = true, id
}: FormControlProps) {
	const { T, t } = useTranslation();

	return (
		<div
			className={`${className ?? ''}`}
			id={id}
			style={style}
		>
			{
				hasRequiredLabel 
					? (
						<label className="label text-sm">
							<span className="flex gap-1">
								{ label }
								{
									hasRequiredLabel ? (required ? <span>*</span> : (
										<span className="text-gray-400">
											(
											{ T.validations.optional }
											)
										</span>
									))
										: <></>
								}
							</span>
						</label>
					)
					: null 
			}
			{ children }
			{
				errors ? (
					Array.from(new Set(errors).values()).map((error) => (
						<div
							key={error}
							className="text-xs text-error pt-1"
						>
							{ t(error) }
						</div>
					))
				)
					: <></>
			}
		</div>
	);
}
