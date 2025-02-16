import { ErrorBoundary } from '@resourge/react-authentication';
import { LoadingSuspense } from '@resourge/react-fetch';
import { BrowserRouter, LanguageRoute } from '@resourge/react-router';

import Authentication from './Authentication';
import Router from './Router';
import Translations from './Translations';
import GlobalLoader from './components/globalLoader/GlobalLoader';
import Routes from './shared/routes/Routes';
import { TranslationInstance } from './shared/translations/Translations';

function App() {
	return (
		<>
			<ErrorBoundary onError={() => window.history.pushState(null, '', Routes.NOT_FOUND.get())}>
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
			</ErrorBoundary>
		</>
	);
}

export default App;
