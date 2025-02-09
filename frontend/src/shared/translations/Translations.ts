import { updateLanguageRoute } from '@resourge/react-router';
import {
	SetupReactTranslations,
	htmlLanguage,
	languageLocalStorage,
	navigatorLanguageDetector
} from '@resourge/react-translations';

export const LOCALE_DEFAULT = 'pt';

const { TranslationInstance, useTranslation } = SetupReactTranslations({
	langs: ['pt', 'en', 'es', 'fr'],
	defaultLanguage: 'pt',
	plugins: [
		navigatorLanguageDetector(),
		languageLocalStorage(),
		{
			config(config) {
				return config;
			},
			onLanguageChange(language) {
				updateLanguageRoute(language);
			}
		},
		htmlLanguage()
	],
	translations: {
		validations: {
			optional: {
				pt: 'opcional',
				en: 'optional',
				es: 'opcional',
				fr: 'optionnel'
			},
			required: {
				pt: 'Este campo é obrigatório',
				en: 'This field is required',
				es: 'Este campo es obligatorio',
				fr: 'Ce champ est obligatoire'
			}
		},
		components: {
			sidebar: {
				users: {
					pt: 'Utilizadores',
					en: 'Users',
					es: 'Usuarios',
					fr: 'Utilisateurs'
				},
				home: {
					pt: 'Início',
					en: 'Home',
					es: 'Inicio',
					fr: 'Accueil'
				},
				dashboard: {
					pt: 'Dashboard',
					en: 'Dashboard',
					es: 'Tablero',
					fr: 'Tableau de bord'
				},
				pagesDescription: {
					pt: 'Páginas',
					en: 'Pages',
					es: 'Páginas',
					fr: 'Pages'
				},
				pages: {
					pt: 'Páginas',
					en: 'Pages',
					es: 'Páginas',
					fr: 'Pages'
				},
				nutritionPlans: {
					pt: 'Planos de Nutrição',
					en: 'Nutrition Plans',
					es: 'Planes de Nutrición',
					fr: 'Plans de nutrition'
				},
				fitnessPlans: {
					pt: 'Planos de Fitness',
					en: 'Fitness Plans',
					es: 'Planes de Fitness',
					fr: 'Plans de fitness'
				},
				food: {
					pt: 'Alimentos',
					en: 'Food',
					es: 'Comida',
					fr: 'Nourriture'
				}
			}
		}
	}
});

export { TranslationInstance, useTranslation };
