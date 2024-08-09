import { ThemeProvider } from '@emotion/react';
import { createTheme, responsiveFontSizes } from '@mui/material';
import TableCustome from './TableCustome';

const App = () => {
	const theme = responsiveFontSizes(
		createTheme({
			palette: {
				primary: {
					main: '#252e8d',
				},
				secondary: {
					main: '#ff5722',
				},
			},
			typography: {
				fontFamily: 'Roboto, sans-serif',
				h6: {
					fontWeight: 700,
					color: '#1a237e',
				},
				body1: {
					fontSize: '14px',
				},
			},
			components: {
				MuiTableCell: {
					styleOverrides: {
						root: {
							padding: '8px',
							fontSize: '14px',
						},
						head: {
							backgroundColor: '#1a237e',
							color: '#fff',
							fontWeight: 'bold',
						},
					},
				},
				MuiPaper: {
					styleOverrides: {
						root: {
							padding: '16px',
							backgroundColor: '#e8eaf6',
						},
					},
				},
			},
		}),
	);
	return (
		<ThemeProvider theme={theme}>
			<TableCustome />
		</ThemeProvider>
	);
};

export default App;
