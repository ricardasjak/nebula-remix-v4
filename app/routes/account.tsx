import { SignedIn, UserButton } from '@clerk/remix';

export default function Account() {
	return (
		<div>
			<SignedIn>
				<h1>My Account</h1>
				<p>You are signed in!</p>
				<UserButton />
			</SignedIn>
		</div>
	);
}
