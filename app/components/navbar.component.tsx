import { useAuth } from '@clerk/remix';
import { Link, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';
import { routesUtil } from '~/routes.util';

type Props = {
	isLoggedIn: boolean;
	kingdoms: NavbarKingdom[];
};

export interface NavbarKingdom {
	id: number;
	name: string;
}

export const Navbar: React.FC<Props> = ({ isLoggedIn, kingdoms }) => {
	const { signOut } = useAuth();
	const navigate = useNavigate();

	const handSignOut = useCallback(() => {
		signOut().then(() => navigate('/'));
	}, [navigate, signOut]);

	return (
		<nav className={'mb-4'}>
			<ul className={'flex flex-row gap-4 p-4 mb-2'}>
				<li>
					<Link to={'/'} className='link-secondary'>
						Home
					</Link>
				</li>

				{isLoggedIn && (
					<>
						{kingdoms.map(item => (
							<li key={item.id}>
								<Link to={routesUtil.kd.home(item.id)} className='link-primary'>
									{item.name}
								</Link>
							</li>
						))}
						<li>
							<Link to={'/account'} className='link-secondary'>
								My Account
							</Link>
						</li>
						<li>
							<Link to={routesUtil.kd.create} className='link-secondary'>
								Create .
							</Link>
						</li>
						<li>
							<Link to={routesUtil.home} onClick={handSignOut} className='link-secondary'>
								Logout
							</Link>
						</li>
					</>
				)}
				{!isLoggedIn && (
					<>
						<li>
							<Link to={routesUtil.auth.signup} className='link-secondary'>
								Register
							</Link>
						</li>
						<li>
							<Link to={routesUtil.auth.signin} className='link-secondary'>
								Login
							</Link>
						</li>
					</>
				)}
			</ul>
			<hr className={'border-secondary'} />
		</nav>
	);
};
