import { GlobalLoader as Loader } from '@resourge/react-fetch';

export default function GlobalLoader() {
	return (
		<Loader>
			<span className="animate-pulse bg-gradient-to-r from-gold to-warning bg-clip-text text-transparent text-lg font-bold">
				coacher.
			</span>
		</Loader>
	);
}
