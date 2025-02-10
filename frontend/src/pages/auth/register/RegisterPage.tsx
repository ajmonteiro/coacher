import A from 'src/components/A/A';
import Button from 'src/components/button/Button';
import FormControl from 'src/components/formControl/FormControl';
import Input from 'src/components/input/Input';
import AuthLayout from 'src/layouts/authLayout/AuthLayout';
import Routes from 'src/shared/routes/Routes';
import HttpBaseService from 'src/shared/services/HttpBaseService';
import { useTranslation } from 'src/shared/translations/Translations';

import { useRegisterModel } from './interfaces/RegisterModel';

export default function RegisterPage() {
	const { T } = useTranslation();

	const {
		field, handleSubmit, getErrors, hasError 
	} = useRegisterModel();

	const submit = handleSubmit(async (data) => {
		const response = await HttpBaseService.post('/Auth/register', data.toModel());

		console.log(response);
	});

	return (
		<AuthLayout layoutTitle={T.pages.auth.register.title}>
			<div className="bg-base-100 rounded-box shadow-xl p-5">
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<FormControl
							errors={getErrors('username')}
							label={T.pages.auth.register.username}
							required
						>
							<Input
								{...field('username')}
								error={hasError('username')}
							/>
						</FormControl>
						<FormControl
							errors={getErrors('fullName')}
							label={T.pages.auth.register.fullName}
							required
						>
							<Input 
								{...field('fullName')} 
								error={hasError('fullName')}
							/>
						</FormControl>
						<FormControl
							errors={getErrors('phone')}
							label={T.pages.auth.register.phone}
							required
						>
							<Input
								{...field('phone')} 
								error={hasError('phone')}
							/>
						</FormControl>
						<FormControl
							errors={getErrors('weight')}
							label={T.pages.auth.register.weight}
							required
						>
							<Input
								error={hasError('weight')}
								{...field('weight')}
							/>
						</FormControl>
						<FormControl
							errors={getErrors('height')}
							label={T.pages.auth.register.height}
							required
						>
							<Input
								error={hasError('height')}
								{...field('height')}
							/>
						</FormControl>
						<FormControl
							errors={getErrors('password')}
							label={T.pages.auth.register.password}
							required
						>
							<Input
								{...field('password')}
								type="password"
							/>
						</FormControl>
					</div>
				</div>
				<div className="bg-base-100 rounded-box shadow-lg p-5 flex flex-col gap-2">
					<Button
						className="w-full"
						onClick={submit}
					>
						{ T.pages.auth.register.submit }	
					</Button>
					<A
						className="w-full"
						href={Routes.AUTH.LOGIN.get()}
					>
						{ T.pages.auth.register.login }	
					</A>
				</div>
			</div>
		</AuthLayout>
	);
}
