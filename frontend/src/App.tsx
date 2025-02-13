import { LoadingSuspense } from '@resourge/react-fetch';
import { BrowserRouter, LanguageRoute } from '@resourge/react-router';

import Authentication from './Authentication';
import Router from './Router';
import Translations from './Translations';
import GlobalLoader from './components/globalLoader/GlobalLoader';
import { TranslationInstance } from './shared/translations/Translations';

function App() {
	return (
		<>
			<Translations>
				<BrowserRouter defaultFallback={<LoadingSuspense />}>
					<LanguageRoute 
						fallbackLanguage={TranslationInstance.language} 
						languages={TranslationInstance.languages}
					>
						<Authentication>
							<Router />
						</Authentication>
					</LanguageRoute>
					<GlobalLoader />
				</BrowserRouter>
			</Translations>
		</>
	);
}

export default App;
