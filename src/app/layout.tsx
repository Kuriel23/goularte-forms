import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
	title: 'Formulários do Goularte',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt_BR">
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}

