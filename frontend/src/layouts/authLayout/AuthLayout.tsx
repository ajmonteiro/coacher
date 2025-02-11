import { type ReactNode } from 'react';

type AuthLayoutProps = {
	children: ReactNode
	layoutTitle: string
};

export default function AuthLayout({ children, layoutTitle }: AuthLayoutProps) {
	return (
		<div className="flex justify-center items-center m-10 rounded-box overflow-hidden shadow-lg">
			<div className="flex lg:flex-row flex-col w-full">
				<div
					className="basis-[50%] w-full h-[] bg-cover bg-center opacity-0.5 lg:flex hidden"
					style={{
						backgroundImage: 'url(https://d1tm14lrsghf7q.cloudfront.net/public/media/129609/conversions/_DSC2543-cover.jpg)',
						height: 'calc(100vh - 5rem)'
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
