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
		formConstants: {
			weekDays: {
				monday: {
					pt: 'Segunda-feira',
					en: 'Monday',
					es: 'Lunes',
					fr: 'Lundi'
				},
				tuesday: {
					pt: 'Terça-feira',
					en: 'Tuesday',
					es: 'Martes',
					fr: 'Mardi'
				},
				wednesday: {
					pt: 'Quarta-feira',
					en: 'Wednesday',
					es: 'Miércoles',
					fr: 'Mercredi'
				},
				thursday: {
					pt: 'Quinta-feira',
					en: 'Thursday',
					es: 'Jueves',
					fr: 'Jeudi'
				},
				friday: {
					pt: 'Sexta-feira',
					en: 'Friday',
					es: 'Viernes',
					fr: 'Vendredi'
				},
				saturday: {
					pt: 'Sábado',
					en: 'Saturday',
					es: 'Sábado',
					fr: 'Samedi'
				},
				sunday: {
					pt: 'Domingo',
					en: 'Sunday',
					es: 'Domingo',
					fr: 'Dimanche'
				}
			}
		},
		pages: {
			meal: {
				table: {
					tableTitle: {
						pt: 'Refeições',
						en: 'Meals',
						es: 'Comidas',
						fr: 'Repas'
					}
				},
				name: {
					pt: 'Nome',
					en: 'Name',
					es: 'Nombre',
					fr: 'Nom'
				},
				description: {
					pt: 'Descrição',
					en: 'Description',
					es: 'Descripción',
					fr: 'Description'
				},
				meal: {
					pt: 'Refeição',
					en: 'Meal',
					es: 'Comida',
					fr: 'Repas'
				}
			},
			diet: {
				table: {
					userFullName: {
						pt: 'Nome do Utilizador',
						en: 'User Name',
						es: 'Nombre del usuario',
						fr: 'Nom de l\'utilisateur'
					},
					tableTitle: {
						pt: 'Dietas',
						en: 'Diets',
						es: 'Dietas',
						fr: 'Régimes'
					},
					name: {
						pt: 'Nome',
						en: 'Name',
						es: 'Nombre',
						fr: 'Nom'
					},
					description: {
						pt: 'Descrição',
						en: 'Description',
						es: 'Descripción',
						fr: 'Description'
					}
				}
			},
			dashboard: {
				title: {
					pt: 'Dashboard',
					en: 'Dashboard',
					es: 'Tablero',
					fr: 'Tableau de bord'
				},
				clients: {
					pt: 'Clientes',
					en: 'Clients',
					es: 'Clientes',
					fr: 'Clients'
				},
				clients_in_system: {
					pt: 'Clientes no sistema',
					en: 'Clients in the system',
					es: 'Clientes en el sistema',
					fr: 'Clients dans le système'
				},
				foods: {
					pt: 'Alimentos',
					en: 'Foods',
					es: 'Comida',
					fr: 'Nourriture'
				},
				foods_in_system: {
					pt: 'Alimentos no sistema',
					en: 'Foods in the system',
					es: 'Comida en el sistema',
					fr: 'Nourriture dans le système'
				},
				exercises: {
					pt: 'Exercícios',
					en: 'Exercises',
					es: 'Ejercicios',
					fr: 'Exercices'
				},
				exercises_in_system: {
					pt: 'Exercícios no sistema',
					en: 'Exercises in the system',
					es: 'Ejercicios en el sistema',
					fr: 'Exercices dans le système'
				}
			},
			workouts: {
				table: {
					addWorkout: {
						pt: 'Adicionar Treino',
						en: 'Add Workout',
						es: 'Añadir entrenamiento',
						fr: 'Ajouter un entraînement'
					},
					weekDay: {
						pt: 'Dia da semana',
						en: 'Weekday',
						es: 'Día de la semana',
						fr: 'Jour de la semaine'
					},
					addExercise: {
						pt: 'Adicionar Exercício',
						en: 'Add Exercise',
						es: 'Añadir ejercicio',
						fr: 'Ajouter un exercice'
					},
					removeExercise: {
						pt: 'Remover Exercício',
						en: 'Remove Exercise',
						es: 'Eliminar ejercicio',
						fr: 'Supprimer l\'exercice'
					},
					tableTitle: {
						pt: 'Treinos',
						en: 'Workouts',
						es: 'Entrenamientos',
						fr: 'Entraînements'
					},
					exercise: {
						pt: 'Exercício',
						en: 'Exercise',
						es: 'Ejercicio',
						fr: 'Exercice'
					},
					reps: {
						pt: 'Repetições',
						en: 'Reps',
						es: 'Repeticiones',
						fr: 'Répétitions'
					},
					sets: {
						pt: 'Séries',
						en: 'Sets',
						es: 'Series',
						fr: 'Ensembles'
					},
					name: {
						pt: 'Nome',
						en: 'Name',
						es: 'Nombre',
						fr: 'Nom'
					},
					description: {
						pt: 'Descrição',
						en: 'Description',
						es: 'Descripción',
						fr: 'Description'
					},
					user: {
						pt: 'Utilizador',
						en: 'User',
						es: 'Usuario',
						fr: 'Utilisateur'
					}
				}
			},
			userProfile: {
				diets: {
					pt: 'Dietas',
					en: 'Diets',
					es: 'Dietas',
					fr: 'Régimes'
				},
				createWorkout: {
					pt: 'Criar Treino',
					en: 'Create Workout',
					es: 'Crear entrenamiento',
					fr: 'Créer un entraînement'
				},
				createDiet: {
					pt: 'Criar Dieta',
					en: 'Create Diet',
					es: 'Crear dieta',
					fr: 'Créer un régime'
				},
				noDiets: {
					pt: 'Este utilizador não tem dietas',
					en: 'This user has no diets',
					es: 'Este usuario no tiene dietas',
					fr: 'Cet utilisateur n\'a pas de régimes'
				},
				noWorkouts: {
					pt: 'Este utilizador não tem treinos',
					en: 'This user has no workouts',
					es: 'Este usuario no tiene entrenamientos',
					fr: 'Cet utilisateur n\'a pas d\'entraînements'
				},
				title: {
					pt: 'Perfil de Utilizador',
					en: 'User Profile',
					es: 'Perfil de usuario',
					fr: 'Profil utilisateur'
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
				weight: {
					pt: 'Peso',
					en: 'Weight',
					es: 'Peso',
					fr: 'Poids'
				},
				height: {
					pt: 'Altura',
					en: 'Height',
					es: 'Altura',
					fr: 'Taille'
				},
				workouts: {
					pt: 'Treinos',
					en: 'Workouts',
					es: 'Entrenamientos',
					fr: 'Entraînements'
				}
			},
			exercises: {
				table: {
					addExercise: {
						pt: 'Adicionar Exercício',
						en: 'Add Exercise',
						es: 'Añadir ejercicio',
						fr: 'Ajouter un exercice'
					},
					tableTitle: {
						pt: 'Exercícios',
						en: 'Exercises',
						es: 'Ejercicios',
						fr: 'Exercices'
					},
					exercise: {
						pt: 'Exercício',
						en: 'Exercise',
						es: 'Ejercicio',
						fr: 'Exercice'
					},
					name: {
						pt: 'Nome',
						en: 'Name',
						es: 'Nombre',
						fr: 'Nom'
					},
					description: {
						pt: 'Descrição',
						en: 'Description',
						es: 'Descripción',
						fr: 'Description'
					},
					sets: {
						pt: 'Séries',
						en: 'Sets',
						es: 'Series',
						fr: 'Ensembles'
					},
					reps: {
						pt: 'Repetições',
						en: 'Reps',
						es: 'Repeticiones',
						fr: 'Répétitions'
					},
					video: {
						pt: 'Vídeo',
						en: 'Video',
						es: 'Vídeo',
						fr: 'Vidéo'
					}
				}
			},
			foods: {
				table: {
					food: {
						pt: 'Alimento',
						en: 'Food',
						es: 'Comida',
						fr: 'Nourriture'
					},
					addFood: {
						pt: 'Adicionar Alimento',
						en: 'Add Food',
						es: 'Añadir comida',
						fr: 'Ajouter de la nourriture'
					},
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
			clients: {
				table: {
					weight: {
						pt: 'Peso',
						en: 'Weight',
						es: 'Peso',
						fr: 'Poids'
					},
					height: {
						pt: 'Altura',
						en: 'Height',
						es: 'Altura',
						fr: 'Taille'
					},
					tableTitle: {
						pt: 'Clientes',
						en: 'Clients',
						es: 'Clientes',
						fr: 'Clients'
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
			repeatedSelection: {
				pt: 'Seleção repetida',
				en: 'Repeated selection',
				es: 'Selección repetida',
				fr: 'Sélection répétée'
			},
			invalidSelection: {
				pt: 'Seleção inválida',
				en: 'Invalid selection',
				es: 'Selección inválida',
				fr: 'Sélection invalide'
			},
			unique: {
				pt: 'Este campo tem de ser único',
				en: 'This field	has to be unique',
				es: 'Este campo tiene que ser único',
				fr: 'Ce champ doit être unique'
			},
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
			searchableInput: {
				noOptions: {
					pt: 'Sem opções',
					en: 'No options',
					es: 'Sin opciones',
					fr: 'Pas d\'options'
				},
				placeholder: {
					pt: 'Pesquisar...',
					en: 'Search...',
					es: 'Buscar...',
					fr: 'Chercher...'
				},
				cancel: {
					pt: 'Cancelar',
					en: 'Cancel',
					es: 'Cancelar',
					fr: 'Annuler'
				}
			},
			select: {
				noOptions: {
					pt: 'Sem opções',
					en: 'No options',
					es: 'Sin opciones',
					fr: 'Pas d\'options'
				}
			},
			languagePicker: {
				languages: {
					pt: {
						en: 'Inglês',
						pt: 'Português',
						es: 'Espanhol',
						fr: 'Francês'
					},
					en: {
						en: 'English',
						pt: 'Portuguese',
						es: 'Spanish',
						fr: 'French'
					},
					es: {
						en: 'Inglés',
						pt: 'Portugués',
						es: 'Español',
						fr: 'Francés'
					},
					fr: {
						en: 'Anglais',
						pt: 'Portugais',
						es: 'Espagnol',
						fr: 'Français'
					}
				}
			},
			header: {
				welcome: {
					pt: 'Bem-vindo',
					en: 'Welcome',
					es: 'Bienvenido',
					fr: 'Bienvenue'
				}
			},
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
				fitness_related: {
					pt: 'Fitness',
					en: 'Fitness',
					es: 'Fitness',
					fr: 'Fitness'
				},
				diet_related: {
					pt: 'Dieta',
					en: 'Diet',
					es: 'Dieta',
					fr: 'Régime'
				},
				clients: {
					pt: 'Clientes',
					en: 'Clients',
					es: 'Clientes',
					fr: 'Clients'
				},
				meals: {
					pt: 'Refeições',
					en: 'Meals',
					es: 'Comidas',
					fr: 'Repas'
				},
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
				diets: {
					pt: 'Dietas',
					en: 'Diets',
					es: 'Dietas',
					fr: 'Régimes'
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
				entities: {
					pt: 'Entidades',
					en: 'Entities',
					es: 'Entidades',
					fr: 'Entités'
				},
				workouts: {
					pt: 'Treinos',
					en: 'Workouts',
					es: 'Entrenamientos',
					fr: 'Entraînements'
				},
				nutritionPlans: {
					pt: 'Planos de Nutrição',
					en: 'Nutrition Plans',
					es: 'Planes de Nutrición',
					fr: 'Plans de nutrition'
				},
				exercises: {
					pt: 'Exercícios',
					en: 'Exercises',
					es: 'Ejercicios',
					fr: 'Exercices'
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
