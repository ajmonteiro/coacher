/* eslint-disable jsx-a11y/alt-text */
import { type ReactNode } from 'react';

import { Login } from 'src/assets/svg/Svg';
import InfoCard from 'src/components/infoCard/InfoCard';
import Svg from 'src/components/svg/Svg';
import ThemeController from 'src/components/themeController/ThemeController';

type AuthLayoutProps = {
	children: ReactNode
	layoutTitle: string
};

export default function AuthLayout({ children, layoutTitle }: AuthLayoutProps) {
	return (
		<div className="flex justify-center h-screen items-center rounded-box overflow-hidden shadow-md">
			<div className="flex lg:flex-row flex-col justify-center items-center w-full bg-secondary-soft">
				<div
					className="basis-[50%] w-full h-full bg-cover bg-center opacity-0.5 lg:flex hidden px-5"
				>
					<Svg 
						element={Login}
						height="100%"
					/>
				</div>
				<div
					className="flex flex-col md:basis-[50%] md:w-[50%] w-full 
					lg:px-4 px-1 justify-center items-center mx-auto gap-3"
				>
					<div className="bg-base-100 rounded-box shadow-md flex flex-col gap-5 p-5 lg:w-[400px] w-full mx-auto">		
						<div className="flex justify-end">
							<ThemeController />
						</div>				
						<span className="text-xl font-bold">{ layoutTitle }</span>
						<div className="w-full">
							{ children }
						</div>
						
					</div>
				</div>
			</div>
		</div>
	);
}
