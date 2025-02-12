import { type ReactNode, useState, useEffect } from 'react';

import Footer from 'src/components/footer/Footer';
import Header from 'src/components/header/Header';
import MainContainer from 'src/components/mainContainer/MainContainer';
import Sidebar from 'src/components/sidebar/Sidebar';

import GlobalLayout from '../globalLayout/GlobalLayout';

type DashboardLayoutProps = {
	children: ReactNode
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
		return localStorage.getItem('isSidebarOpen') !== 'false';
	});

	useEffect(() => {
		localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
	}, [isSidebarOpen]);

	return (
		<GlobalLayout>
			<div className="min-h-screen flex flex-col">
				<div className="flex flex-col flex-grow container mx-auto">
					<Header
						isSidebarOpen={isSidebarOpen}
						setSidebarOpen={() => setIsSidebarOpen((prev) => !prev)}
					/>
					<div className="flex h-full flex-grow container mx-auto">
						<Sidebar isSidebarOpen={isSidebarOpen} />
						<MainContainer>
							{ children }
						</MainContainer>
					</div>
				</div>
				<Footer />
			</div>
		</GlobalLayout>
	);
}
