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
			foods: {
				table: {
					tableTitle: {
						pt: 'Alimentos',
						en: 'Foods',
						es: 'Comida',
						fr: 'Nourriture'
					},
					name: {
						pt: 'Nome',
						en: 'Name',
						es: 'Nombre',
						fr: 'Nom'
					},
					calories: {
						pt: 'Calorias (100g)',
						en: 'Calories (100g)',
						es: 'Calorías (100g)',
						fr: 'Calories (100g)'
					},
					protein: {
						pt: 'Proteína',
						en: 'Protein',
						es: 'Proteína',
						fr: 'Protéine'
					},
					carbs: {
						pt: 'Hidratos de carbono',
						en: 'Carbs',
						es: 'Carbohidratos',
						fr: 'Glucides'
					},
					fat: {
						pt: 'Gordura',
						en: 'Fat',
						es: 'Grasa',
						fr: 'Graisse'
					}
				}
			},
			users: {
				table: {
					tableTitle: {
						pt: 'Utilizadores',
						en: 'Users',
						es: 'Usuarios',
						fr: 'Utilisateurs'
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
					phone: {
						pt: 'Telefone',
						en: 'Phone',
						es: 'Teléfono',
						fr: 'Téléphone'
					},
					role: {
						pt: 'Função',
						en: 'Role',
						es: 'Rol',
						fr: 'Rôle'
					},
					actions: {
						pt: 'Ações',
						en: 'Actions',
						es: 'Acciones',
						fr: 'Actions'
					}
				}
			},
			auth: {
				login: {
					title: {
						pt: 'login',
						en: 'login',
						es: 'iniciar sesión',
						fr: 'connexion'
					},
					submit: {
						pt: 'Entrar',
						en: 'login',
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
						pt: 'registo',
						en: 'register',
						es: 'registro',
						fr: 's\'inscrire'
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
			},
			password: {
				required: {
					pt: 'A palavra-passe é obrigatória',
					en: 'The password is required',
					es: 'La contraseña es obligatoria',
					fr: 'Le mot de passe est obligatoire'
				},
				invalid: {
					pt: 'As palavras-passe não coincidem',
					en: 'The passwords do not match',
					es: 'Las contraseñas no coinciden',
					fr: 'Les mots de passe ne correspondent pas'
				}
			}
		},
		components: {
			modal: {
				cancel: {
					pt: 'Cancelar',
					en: 'Cancel',
					es: 'Cancelar',
					fr: 'Annuler'
				},
				submit: {
					pt: 'Submeter',
					en: 'Submit',
					es: 'Enviar',
					fr: 'Soumettre'
				}
			},
			data_table: {
				new: {
					pt: 'Novo',
					en: 'New',
					es: 'Nuevo',
					fr: 'Nouveau'
				},
				no_results: {
					pt: 'Não foram encontrados resultados',
					en: 'No results found',
					es: 'No se encontraron resultados',
					fr: 'Aucun résultat trouvé'
				},
				results: {
					pt: 'resultados',
					en: 'results',
					es: 'resultados',
					fr: 'résultats'
				},
				delete: {
					pt: 'Apagar',
					en: 'Delete',
					es: 'Eliminar',
					fr: 'Supprimer'
				}
			},
			table: {
				previous: {
					pt: 'Anterior',
					en: 'Previous',
					es: 'Anterior',
					fr: 'Précédent'
				},
				next: {
					pt: 'Seguinte',
					en: 'Next',
					es: 'Siguiente',
					fr: 'Suivant'
				},
				page: {
					pt: 'Página',
					en: 'Page',
					es: 'Página',
					fr: 'Page'
				},
				noResults: {
					pt: 'Não foram encontrados resultados',
					en: 'No results found',
					es: 'No se encontraron resultados',
					fr: 'Aucun résultat trouvé'
				}
			},
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
