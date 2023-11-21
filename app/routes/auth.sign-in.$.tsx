import { SignIn, useAuth } from '@clerk/remix';
import { Link, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';

export default function SignInPage() {
	const { signOut } = useAuth();
	const navigate = useNavigate();

	const handSignOut = useCallback(() => {
		signOut().then(() => navigate('/'));
	}, [navigate, signOut]);

	return (
		<div className={'flex flex-col gap-4'}>
			<SignIn />{' '}
			<Link to={'/'} onClick={handSignOut} className='link-secondary'>
				Sign off
			</Link>
		</div>
	);
}
