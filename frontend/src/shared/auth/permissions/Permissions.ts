import { type BasePermissionType } from '@resourge/react-authentication';

export type PermissionsType = {
	CreateDiet: string
	CreateExercise: string
	CreateFood: string
	CreateMeal: string
	CreateUser: string
	CreateWorkout: string
	DeleteDiet: string
	DeleteExercise: string
	DeleteFood: string
	DeleteMeal: string
	DeleteUser: string
	DeleteWorkout: string
	EditDiet: string
	EditExercise: string
	EditFood: string
	EditMeal: string
	EditUser: string
	EditWorkout: string
	ReadClientInfo: string
	ReadDashboard: string
	ReadDiet: string
	ReadExercise: string
	ReadFood: string
	ReadMeal: string
	ReadRole: string
	ReadUser: string
	ReadUsers: string
	ReadWorkout: string
} & BasePermissionType;
