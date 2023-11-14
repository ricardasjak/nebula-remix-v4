import { useAuth } from '@clerk/remix';
import { Link, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';

type Props = {
	isLoggedIn: boolean;

}

export const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
	const { signOut } = useAuth();
	const navigate = useNavigate();

	const handSignOut = useCallback(() => {
		signOut().then(() => navigate('/'));
	}, [navigate, signOut])

	return (
		<nav>
			<ul className={'list flex flex-row gap-4 p-4 mb-4'}>
				<li>
					<Link to={'/'}>Home</Link>
				</li>

				{isLoggedIn &&
					<>
						<li>
							<Link to={'/account'}>My Account</Link>
						</li>
						<li>
							<Link to={'/'} onClick={handSignOut}>Sign off</Link>
						</li>
					</>
				}
				{!isLoggedIn &&
					<>
						<li>
							<Link to={'/auth/sign-up'}>Sign up</Link>
						</li>
						<li>
							<Link to={'/auth/sign-in'}>Sign in</Link>
						</li>
					</>
				}

			</ul>
		</nav>
	)
}
