import { useFormSplitter } from '@resourge/react-form';

import FormControl from 'src/components/formControl/FormControl';
import Input from 'src/components/input/Input';
import { type RegisterRecordModel } from 'src/shared/models/interfaces/RegisterRecordModel';

type SetFormProps = {
	exercise: any
	exerciseIndex: number
	set: any
	setIndex: number
};
export default function SetForm({
	setIndex, exerciseIndex, set, exercise 
}: SetFormProps) {
	const { field, form } = useFormSplitter<RegisterRecordModel, `exercises[${typeof exerciseIndex}].sets[${typeof setIndex}]`>(`exercises[${exerciseIndex}].sets[${setIndex}]`);

	const setsLength = exercise?.sets?.length ?? 0;

	return (
		form ? (
			<tr>
				{
					setIndex === 0 ? (
						<td
							className="font-semibold bg-base-200"
							rowSpan={setsLength}
						>
							{ exercise.name }
						</td>
					) : null 
				}
				<td>{ setIndex + 1 }</td>
				<td>{ set.reps }</td>
				<td>
					<FormControl>
						<Input
							{...field(`reps`)}
							type="number"
						/>
					</FormControl>
				</td>
			</tr>
		) : null
	);
}
