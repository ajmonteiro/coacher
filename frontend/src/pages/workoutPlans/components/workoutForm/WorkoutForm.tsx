import { MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { useFormSplitter } from '@resourge/react-form';

import Button from 'src/components/button/Button';
import FormControl from 'src/components/formControl/FormControl';
import FormWrapper from 'src/components/formWrapper/FormWrapper';
import InfoCard from 'src/components/infoCard/InfoCard';
import Input from 'src/components/input/Input';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import SearchableInput from 'src/components/searchableInput/SearchableInput';
import Textarea from 'src/components/textarea/Textarea';
import { type SelectItem } from 'src/shared/models/SelectItem';
import { useTranslation } from 'src/shared/translations/Translations';
import { WEEKDAY_OPTIONS } from 'src/shared/utils/FormConstantsUtils';

import { type WorkoutPlanModel } from '../../interfaces/WorkoutPlanModel';

type WorkoutFormProps = {
	exercises: SelectItem[]
	workoutIndex: number
};

export default function WorkoutForm({ workoutIndex, exercises }: WorkoutFormProps) {
	const { T } = useTranslation();
    
	const {
		form, getErrors, field, hasError, context
	} = useFormSplitter<WorkoutPlanModel, `workouts[${typeof workoutIndex}]`>(`workouts[${workoutIndex}]`);

	return (
		<InfoCard className="flex flex-col gap-5 shadow-lg">
			<div>
				<span className="text-sm font-bold">
					Workout
					{ ' ' }
					{ workoutIndex + 1 }
				</span>
				<hr />
			</div>
			<FormWrapper>
				<FormControl 
					errors={getErrors('name')}
					label={T.pages.workoutPlans.table.name}
					required
				>
					<Input
						{...field('name')}
						error={hasError('name')}
					/>
				</FormControl>
				<FormControl 
					errors={getErrors('description')}
					label={T.pages.workoutPlans.table.description}
					required
				>
					<Textarea
						{...field('description')}
						error={hasError('description')}
					/>
				</FormControl>
				<FormControl 
					errors={getErrors('weekDay')}
					label={T.pages.workoutPlans.table.weekDay}
					required
				>
					<SearchableInput
						{...field('weekDay')}
						error={hasError('weekDay')}
						options={WEEKDAY_OPTIONS}
					/>
				</FormControl>
				<div className="flex flex-col gap-2">
					{
						form.exercises.map((exercise, index) => (
							<details
								key={index}
								className={`collapse rounded-box border w-full border-base-200 shadow-lg
														${context.errors[`exercises[${index}]`] ? 'border-error' : ''}
														`}
							> 
								<summary className="collapse-title font-medium"> 
									<div className="flex items-center text-sm"> 
										<span>{ T.pages.workoutPlans.table.exercise + ' ' + (index + 1) }</span>
									</div>
								</summary>
								<div className="collapse-content p-3">
									<FormWrapper> 
										<FormControl
											errors={getErrors(`exercises[${index}].exercise`)}
											label={T.pages.workoutPlans.table.exercise}
											required
										>
											<SearchableInput
												{...field(`exercises[${index}].exercise`)}
												error={hasError(`exercises[${index}].exercise`)}
												options={exercises}
											/>
										</FormControl>
										<FormControl
											errors={getErrors(`exercises[${index}].reps`)}
											label={T.pages.workoutPlans.table.reps}
											required
										>
											<Input
												{...field(`exercises[${index}].reps`)}
												error={hasError(`exercises[${index}].reps`)}
												type="number"
											/>
										</FormControl>
										<FormControl
											errors={getErrors(`exercises[${index}].sets`)}
											label={T.pages.workoutPlans.table.sets}
											required
										>
											<Input
												{...field(`exercises[${index}].sets`)}
												error={hasError(`exercises[${index}].sets`)}
												type="number"
											/>
										</FormControl>
									</FormWrapper>
									<div className="flex justify-end">
										<Button
											className="btn-square mt-4"
											onClick={() => form.removeExercise(index)}
										>
											<PhosphorIcon
												color="white"
												icon={<MinusCircle />}
											/>
										</Button>
									</div>
								</div>
							</details>
                        
						))
					}
					<div className="flex justify-start mt-5">
						<Button 
							onClick={() => form.addNewExercise()}
						>
							<PhosphorIcon
								color="white"
								icon={<PlusCircle />}
							/>
							{ T.pages.workoutPlans.table.addExercise }	
						</Button>
					</div>
				</div>
			</FormWrapper>
            
		</InfoCard>
	);
}
