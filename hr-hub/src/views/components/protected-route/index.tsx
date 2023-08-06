import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { ROUTES } from '../../../config/const';
import LoadingPage from '../dialog/LoadingPage';

type Props = {
	children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
	const [isLoggedIn, isLoading] = useAuth();

	if (isLoading) return <LoadingPage />;

	if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN} />;

	return <>{children}</>;
}
