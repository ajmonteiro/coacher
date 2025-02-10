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
		pages: {
			auth: {
				login: {
					title: {
						pt: 'Login',
						en: 'Login',
						es: 'Iniciar sesión',
						fr: 'Connexion'
					},
					submit: {
						pt: 'Entrar',
						en: 'Login',
						es: 'Iniciar sesión',
						fr: 'Connexion'
					},
					register: {
						pt: 'Registar',
						en: 'Register',
						es: 'Registro',
						fr: 'S\'inscrire'
					}
				},
				register: {
					login: {
						pt: 'Entrar',
						en: 'Login',
						es: 'Iniciar sesión',
						fr: 'Connexion'
					},
					title: {
						pt: 'Registo',
						en: 'Register',
						es: 'Registro',
						fr: 'S\'inscrire'
					},
					username: {
						pt: 'Nome de utilizador',
						en: 'Username',
						es: 'Nombre de usuario',
						fr: 'Nom d\'utilisateur'
					},
					fullName: {
						pt: 'Nome completo',
						en: 'Full name',
						es: 'Nombre completo',
						fr: 'Nom complet'
					},
					password: {
						pt: 'Palavra-passe',
						en: 'Password',
						es: 'Contraseña',
						fr: 'Mot de passe'
					},
					height: {
						pt: 'Altura',
						en: 'Height',
						es: 'Altura',
						fr: 'Taille'
					},
					weight: {
						pt: 'Peso',
						en: 'Weight',
						es: 'Peso',
						fr: 'Poids'
					},
					phone: {
						pt: 'Telefone',
						en: 'Phone',
						es: 'Teléfono',
						fr: 'Téléphone'
					},
					submit: {
						pt: 'Registar',
						en: 'Register',
						es: 'Registro',
						fr: 'S\'inscrire'
					}
				}
			}
		},
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
