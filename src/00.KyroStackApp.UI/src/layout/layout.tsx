import { Outlet } from 'react-router-dom';
import { AccessibilityShortcuts } from './accessibility-shortcuts';
import { Footer } from './footer';
import { Header } from './header';
import { MainContent } from './main-content';

export function Layout() {
	return (
		<div data-component='layout'>
			<AccessibilityShortcuts />
			<Header />
			<MainContent>
				<Outlet />
			</MainContent>
			<Footer />
		</div>
	);
}
