import A from 'src/components/A/A';
import Button from 'src/components/button/Button';
import FormControl from 'src/components/formControl/FormControl';
import Input from 'src/components/input/Input';
import AuthLayout from 'src/layouts/authLayout/AuthLayout';
import Routes from 'src/shared/routes/Routes';
import HttpBaseService from 'src/shared/services/HttpBaseService';
import { useTranslation } from 'src/shared/translations/Translations';

import { useLoginModel } from './interfaces/LoginModel';

export default function LoginPage() {
	const { T } = useTranslation(); 
	const { field, handleSubmit } = useLoginModel();

	const submit = handleSubmit(async (data) => {
		const response = await HttpBaseService.post('/Auth/login', data.toModel());

		console.log(response);
	});

	return (
		<AuthLayout layoutTitle={T.pages.auth.login.title}>
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
			<div className="bg-base-100 rounded-box shadow-lg p-5 flex flex-col gap-2">
				<Button
					className="w-full"
					onClick={submit}
				>
					{ T.pages.auth.login.submit }	
				</Button>
				<A
					className="w-full"
					href={Routes.AUTH.REGISTER.get()}
				>
					{ T.pages.auth.login.register }	
				</A>
			</div>
		</AuthLayout>
	);
}
