import { ErrorBoundary } from '@resourge/react-authentication';
import { LoadingSuspense } from '@resourge/react-fetch';
import { BrowserRouter, LanguageRoute } from '@resourge/react-router';

import Authentication from './Authentication';
import Router from './Router';
import Translations from './Translations';
import GlobalLoader from './components/globalLoader/GlobalLoader';
import _502 from './pages/502/_502';
import Routes from './shared/routes/Routes';
import { TranslationInstance } from './shared/translations/Translations';

function App() {
	return (
		<>
			<ErrorBoundary 
				errorComponent={_502}
				onError={() => window.history.pushState(null, '', Routes.ERROR.get())}
			>
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
