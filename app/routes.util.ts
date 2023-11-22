export const routesUtil = {
	home: '/',
	account: '/account',
	kd: {
		create: '/kd/create',
		home: (id: number) => `/kd/${id}`,
	},
	signup: '/sign-up',
	auth: {
		signup: '/auth/sign-up',
		signin: '/auth/sign-in',
		register: '/auth/register',
	},
	admin: {
		panel: '/admin/panel',
	},
};
