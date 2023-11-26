export const routesUtil = {
	home: '/',
	account: '/account',
	kd: {
		create: '/kd/create',
		home: (id: number) => `/kd/${id}`,
		budget: (id: number) => `/kd/${id}/budget`,
		military: (id: number) => `/kd/${id}/military`,
	},
	signup: '/sign-up',
	auth: {
		signup: '/auth/sign-up',
		signin: '/auth/sign-in',
		register: '/auth/register',
	},
	admin: {
		panel: '/admin/panel',
		migrate: '/admin/migrate',
	},
};
