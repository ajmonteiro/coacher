import React, { type ReactNode } from 'react';

import { TranslationProvider } from '@resourge/react-translations';

import { TranslationInstance } from './shared/translations/Translations';

type Props = {
	children?: ReactNode
};

const Translations: React.FC<Props> = ({ children }) => {
	return (
		<React.Suspense>
			<TranslationProvider TranslationInstance={TranslationInstance}>
				{ children }
			</TranslationProvider>
		</React.Suspense>
	);
};

export default Translations;
