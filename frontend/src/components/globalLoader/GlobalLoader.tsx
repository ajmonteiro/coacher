import { Barbell } from '@phosphor-icons/react';
import { GlobalLoader as Loader } from '@resourge/react-fetch';

import PhosphorIcon from '../phosphorIcon/PhosphorIcon';

export default function GlobalLoader() {
	return (
		<Loader>
			<span className="animate-bounce">
				<PhosphorIcon
					icon={<Barbell />}
					size={128}
				/>
			</span>
		</Loader>
	);
}
