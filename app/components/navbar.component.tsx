import { useAuth } from '@clerk/remix';
import { Link, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';

type Props = {
	isLoggedIn: boolean;
};

export const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const loggedIn = !!isLoggedIn || true;

	const handSignOut = useCallback(() => {
		signOut().then(() => navigate('/'));
	}, [navigate, signOut]);

	return (
		<nav className={'mb-4'}>
			<ul className={'list flex flex-row gap-4 p-4 mb-2'}>
				<li>Logged in: {!!isLoggedIn}</li>
				<li>
					<Link to={'/'} className='link-secondary'>
						Home
					</Link>
				</li>

				{loggedIn && (
					<>
						<li>
							<Link to={'/account'} className='link-secondary'>
								My Account
							</Link>
						</li>
						<li>
							<Link to={'/kd/create'} className='link-secondary'>
								Create Kingdom
							</Link>
						</li>
						<li>
							<Link to={'/'} onClick={handSignOut} className='link-secondary'>
								Sign off
							</Link>
						</li>
					</>
				)}
				{loggedIn && (
					<>
						<li>
							<Link to={'/auth/sign-up'} className='link-secondary'>
								Sign up
							</Link>
						</li>
						<li>
							<Link to={'/auth/sign-in'} className='link-secondary'>
								Sign in
							</Link>
						</li>
					</>
				)}
			</ul>
			<hr className={'border-secondary'} />
		</nav>
	);
};
