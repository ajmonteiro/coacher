import { type ReactNode } from 'react';

type AuthLayoutProps = {
	children: ReactNode
	layoutTitle: string
};

export default function AuthLayout({ children, layoutTitle }: AuthLayoutProps) {
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="flex lg:flex-row flex-col w-full">
				<div
					className="basis-[50%] w-full h-screen bg-cover bg-center opacity-0.5 lg:flex hidden"
					style={{
						backgroundImage: 'url(https://picsum.photos/1920/1080)'
					}}
				/>
				<div
					className="flex flex-col basis-[50%] lg:max-w-[600px] w-full px-4 justify-center items-center mx-auto gap-3"
				>
					<div className="bg-base-100 rounded-box shadow-xl p-5 w-full">
						<span className="text-xl font-bold">{ layoutTitle }</span>
					</div>
					<div className="w-full">
						{ children }
					</div>
				</div>
			</div>
		</div>
	);
}
