import { useAuth } from '@clerk/remix';
import { Link, useNavigate, useParams } from '@remix-run/react';
import { useCallback } from 'react';
import { GAME } from '~/game.const';
import { useKingdom } from '~/hooks/use-kingdom.hook';
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
	const params = useParams();
	const selected = Number(params?.kdid);

	const handSignOut = useCallback(() => {
		signOut().then(() => navigate(routesUtil.home));
	}, [navigate, signOut]);

	const handleClick = useCallback(() => {
		const elem = document.activeElement;
		if (elem) {
			// @ts-ignore
			elem?.blur();
		}
	}, []);

	return (
		<div className='navbar bg-base-100 container'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label tabIndex={0} className='btn btn-ghost'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
					>
						{isLoggedIn && (
							<>
								<li>
									<label>Select your kingdom</label>
									<ul className='p-2'>
										{kingdoms.map(kd => (
											<li key={kd.id}>
												<Link to={routesUtil.kd.home(kd.id)}>{kd.name}</Link>
											</li>
										))}
										{kingdoms.length < GAME.kingdomsLimit && (
											<li onClick={handleClick}>
												<Link to={routesUtil.kd.create} className='font-bold'>
													Create kingdom
												</Link>
											</li>
										)}
									</ul>
								</li>
								<li onClick={handleClick}>
									<Link to={routesUtil.account} className=''>
										My Account
									</Link>
								</li>
							</>
						)}
						<li onClick={handleClick}>
							{!isLoggedIn ? (
								<>
									<Link to={routesUtil.auth.signin} className=''>
										Login
									</Link>
									<Link to={routesUtil.auth.signup} className=''>
										Register
									</Link>
								</>
							) : (
								<Link to={routesUtil.home} onClick={handSignOut} className=''>
									Logout
								</Link>
							)}
						</li>
					</ul>
				</div>
				<Link className='btn btn-ghost text-xl' to={routesUtil.home}>
					Nebula Kingdoms
				</Link>
			</div>
			<div className='navbar-center hidden lg:flex'>
				{isLoggedIn && (
					<ul className='p-2 grid grid-flow-col'>
						{kingdoms.map(kd => (
							<li key={kd.id} className={selected === kd.id ? 'outline' : undefined}>
								<Link
									to={routesUtil.kd.home(kd.id)}
									prefetch='none'
									className={'btn btn-ghost font-normal'}
									style={{ minWidth: '120px' }}
								>{`${kd.name}`}</Link>
							</li>
						))}
						{kingdoms.length < GAME.kingdomsLimit && (
							<li>
								<Link to={routesUtil.kd.create} className='btn btn-ghost text-primary font-bold'>
									Create Kingdom
								</Link>
							</li>
						)}
					</ul>
				)}
			</div>
			<div className='navbar-end'>
				{!isLoggedIn && (
					<Link to={routesUtil.auth.signin} className='btn btn-ghost text-md'>
						Login
					</Link>
				)}
			</div>
		</div>
	);
};
