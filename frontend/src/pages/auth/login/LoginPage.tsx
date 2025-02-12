import { useFetch } from '@resourge/react-fetch';
import { useNavigate } from '@resourge/react-router';

import Button from 'src/components/button/Button';
import FormControl from 'src/components/formControl/FormControl';
import Input from 'src/components/input/Input';
import AuthLayout from 'src/layouts/authLayout/AuthLayout';
import { useAuthentication } from 'src/shared/auth/useAuthentication';
import Routes from 'src/shared/routes/Routes';
import { useTranslation } from 'src/shared/translations/Translations';

import { useLoginModel } from './interfaces/LoginModel';

export default function LoginPage() {
	const { login } = useAuthentication();
	const { T } = useTranslation(); 
	const { field, handleSubmit } = useLoginModel();
	const navigate = useNavigate();

	const { fetch: loginFetch } = useFetch((email: string, password: string) => login(email, password));

	const submit = handleSubmit(async (data) => {
		await loginFetch(data.username, data.password);

		navigate(Routes.DASHBOARD.MAIN.get());
	});

	return (
		<AuthLayout layoutTitle="coacher.">
			<div className="bg-base-100 rounded-box shadow-md flex flex-col gap-5 p-5 max-w-[400px] mx-auto">
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
				<Button
					className="w-full"
					onClick={submit}
				>
					{ T.pages.auth.login.submit }	
				</Button>
			</div>
		</AuthLayout>
	);
}
