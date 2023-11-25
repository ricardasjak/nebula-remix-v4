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
			<SignIn />
			<div className={'flex justify-center'}>
				<p>New player?</p>&nbsp;
				<Link to={'/'} onClick={handSignOut} className='link-primary ml-2'>
					Create account
				</Link>
			</div>
		</div>
	);
}
