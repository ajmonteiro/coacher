import { useState } from 'react';

import Header from 'src/components/header/Header';
import MainContainer from 'src/components/mainContainer/MainContainer';
import Sidebar from 'src/components/sidebar/Sidebar';

import GlobalLayout from '../globalLayout/GlobalLayout';

export default function DashboardLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

	return (
		<GlobalLayout>
			<div className="min-h-screen w-screen">
				<div className="flex flex-col container">
					<Header
						isSidebarOpen={isSidebarOpen}
						setSidebarOpen={() => {
							setIsSidebarOpen(!isSidebarOpen);
						}}
					/>
					<div
						className="h-[calc(100vh-4rem)] mt-10"
					>
						<div className="flex h-full">
							<Sidebar isSidebarOpen={isSidebarOpen} />
							<MainContainer>
								Yes
							</MainContainer>
						</div>
					</div>
				</div>
			</div>
		</GlobalLayout>
	);
}
