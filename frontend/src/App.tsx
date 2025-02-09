import { BrowserRouter, LanguageRoute } from '@resourge/react-router';

import Router from './Router';
import Translations from './Translations';
import { TranslationInstance } from './shared/translations/Translations';

function App() {
	return (
		<Translations>
			<BrowserRouter>
				<LanguageRoute 
					fallbackLanguage={TranslationInstance.language} 
					languages={TranslationInstance.languages}
				>
					<Router />
				</LanguageRoute>
			</BrowserRouter>
		</Translations>
	);
}

export default App;
