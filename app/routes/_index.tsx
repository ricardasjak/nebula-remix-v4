import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
			<h1 className={'text-xl mb-8'}>Welcome to Nebula</h1>
			<Link to={'/kd/create'} className={'btn btn-primary'}>
				Create Kingdom
			</Link>
		</div>
	);
}
