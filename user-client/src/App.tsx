import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './config/const';
import { store } from './store';
import { JobDetailsModal, JobListings } from './views/pages/job-listings';
import { HomePage } from './views/pages/home';
import { LoginPage } from './views/pages/login';
import ProtectedRoute from './views/components/protected-route';

function App() {
	return (
		<ChakraProvider>
			<Provider store={store}>
				<div className='App'>
					<BrowserRouter>
						<Routes>
							<Route path={ROUTES.LOGIN} element={<LoginPage />} />
							<Route
								path={ROUTES.HOME}
								element={
									<ProtectedRoute>
										<HomePage />
									</ProtectedRoute>
								}
							>
								<Route path={ROUTES.JOB_LISTINGS} element={<JobListings />}>
									<Route path=':id' element={<JobDetailsModal />} />
								</Route>
							</Route>

							<Route path='*' element={<Navigate to={ROUTES.LOGIN} />} />
						</Routes>
					</BrowserRouter>
				</div>
			</Provider>
		</ChakraProvider>
	);
}

export default App;
