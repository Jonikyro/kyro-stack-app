import { ReactNode } from 'react';
import { I18nProvider } from 'react-aria';

type LocalizationProviderProps = {
	children: ReactNode;
};

export function LocalizationProvider({ children }: LocalizationProviderProps) {
	return <I18nProvider locale='en'>{children}</I18nProvider>;
}
