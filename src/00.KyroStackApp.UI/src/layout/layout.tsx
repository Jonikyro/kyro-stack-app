import { ScrollToHash } from '@/routing/scroll-to-hash';
import { Outlet } from 'react-router-dom';
import { AccessibilityShortcuts } from './accessibility-shortcuts';
import { Footer } from './footer';
import { Header } from './header';
import { MainContent } from './main-content';

export function Layout() {
	return (
		<div data-component='layout'>
			<AccessibilityShortcuts />
			<ScrollToHash />
			<Header />
			<MainContent>
				<Outlet />
			</MainContent>
			<Footer />
		</div>
	);
}
