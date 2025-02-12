import { type ReactNode } from 'react';

type InfoCardProps = {
	children: ReactNode
	className?: string
};

export default function InfoCard({ children, className }: InfoCardProps) {
	return (
		<div className={`rounded-box p-5 bg-base-100 shadow-md ${className ?? ''}`}>
			{ children }
		</div>
	);
}
