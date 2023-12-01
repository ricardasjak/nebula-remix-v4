export const routesUtil = {
	home: '/',
	account: '/account',
	kd: {
		create: '/kingdom/create',
		home: (id: number) => `/kingdom/${id}`,
		status: (id: number) => `/kingdom/${id}/status`,
		budget: (id: number) => `/kingdom/${id}/budget`,
		buildings: (id: number) => `/kingdom/${id}/buildings`,
		military: (id: number) => `/kingdom/${id}/military`,
		tick: (id: number) => `/kingdom/${id}/tick`,
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
