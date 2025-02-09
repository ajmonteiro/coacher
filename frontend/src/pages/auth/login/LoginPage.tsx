import Button from 'src/components/button/Button';
import FormControl from 'src/components/formControl/FormControl';
import Input from 'src/components/input/Input';
import HttpBaseService from 'src/shared/services/HttpBaseService';

import { useLoginModel } from './interfaces/LoginModel';

export default function LoginPage() {
	const { field, handleSubmit } = useLoginModel();

	const submit = handleSubmit(async (data) => {
		const response = await HttpBaseService.post('/Auth/authenticate', data.toModel());

		console.log(response);
	});

	return (
		<div className="w-screen h-screen bg-primary flex justify-center items-center">
			<div
				className="rounded-box bg-base-100 p-5 lg:min-w-[400px] 
            min-w-full lg:min-h-[300px] min-h-full shadow-xl
            flex flex-col gap-5
            "
			>
				<div className="bg-base-100 rounded-box shadow-xl p-5">
					<span className="text-xl font-bold">COACHER APP</span>
				</div>
				<div className="bg-base-100 rounded-box shadow-xl p-5">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<FormControl
								label="Username"
								required
							>
								<Input {...field('username')} />
							</FormControl>
							<FormControl
								label="Password"
								required
							>
								<Input
									{...field('password')}
									type="password"
								/>
							</FormControl>
						</div>
					</div>
				</div>
				<div className="bg-base-100 rounded-box shadow-lg p-5">
					<Button
						className="w-full"
						onClick={submit}
					>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
}
