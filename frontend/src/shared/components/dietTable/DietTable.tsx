import { Avocado } from '@phosphor-icons/react';

import InfoCard from 'src/components/infoCard/InfoCard';
import PhosphorIcon from 'src/components/phosphorIcon/PhosphorIcon';
import { type DietDto } from 'src/shared/models/DietDto';
import { useTranslation } from 'src/shared/translations/Translations';

type DietTableProps = {
	diets: DietDto[]
};

export default function DietTable({ diets }: DietTableProps) {
	const { T } = useTranslation();
	return (
		diets && diets.length > 0 ? (
			<InfoCard className="w-full flex flex-col gap-3">
				<h2 className="text-lg font-semibold text-base-content mb-2">{ T.components.dietsTable.diets }</h2>
				<div className="overflow-x-auto">
					<table className="table table-bordered w-full rounded-box border border-gold">
						<thead>
							<tr>
								<th>{ T.components.dietsTable.meal }</th>
								<th>{ T.components.dietsTable.food }</th>
								<th>{ T.components.dietsTable.quantity }</th>
								<th>{ T.components.dietsTable.calories }</th>
								<th>{ T.components.dietsTable.protein }</th>
								<th>{ T.components.dietsTable.fat }</th>
								<th>{ T.components.dietsTable.carbs }</th>
							</tr>
						</thead>
						<tbody>
							{
								diets.map((diet) => (
									<>
										{ diet.meals.map((meal) => (
											<>
												<tr className="bg-base-200 text-primary">
													<td
														className="font-semibold text-lg"
														colSpan={7}
													>
														{ meal.name }
													</td>
												</tr>
												{ meal.mealFoods.map((food, index) => (
													<tr key={`food-${index + Math.random()}`}>
														<td>{ meal.name }</td>
														<td>{ food.foodName }</td>
														<td>
															{ food.quantity } 
															{ ' ' }
															{ food.unit }
														</td>
														<td>{ food.getTotalCalories }</td>
														<td>{ food.getTotalProtein }</td>
														<td>{ food.getTotalFat }</td>
														<td>{ food.getTotalCarbs }</td>
													</tr>
												)) }
											</>
										)) }
									</>
								)) 
							}
						</tbody>
					</table>
				</div>
			</InfoCard>
		)
			: (
				<InfoCard className="flex flex-col gap-10 items-center justify-center h-full w-full relative">
					<div className="text-2xl font-thin z-10">
						Oops!
						{ ' ' }
						{ T.pages.userProfile.noDiets }
					</div>
					<PhosphorIcon
						className="absolute -z-1 opacity-25"
						icon={<Avocado />}
						size={600}
					/>
				</InfoCard>
			)
	);
}
