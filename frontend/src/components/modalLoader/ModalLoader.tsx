import { Barbell } from '@phosphor-icons/react';

import PhosphorIcon from '../phosphorIcon/PhosphorIcon';

export default function ModalLoader() {
	return (
		<div className="relative z-[9999]">
			<div className="fixed left-0 top-0 w-screen h-screen bg-black/25 flex items-center justify-center" />
			<div className="flex justify-center items-center fixed left-0 top-0 w-screen h-screen">
				<div className="animate-bounce">
					<PhosphorIcon
						icon={<Barbell />}
						size={100}
					/>
				</div>
			</div>
		</div>
	);
}
