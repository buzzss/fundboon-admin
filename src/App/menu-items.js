const navigation = {
	items: [
		{
		    id: 'actions',
		    title: 'Navigation',
		    type: 'group',
		    icon: 'icon-navigation',
		    children: [
		        {
		            id: 'dashboard',
		            title: 'Dashboard',
		            type: 'item',
		            url: '/admin/dashboard',
		            icon: 'feather icon-home',
		        },
		        {
		            id: 'profile',
		            title: 'Profile',
		            type: 'item',
		            url: '/admin/profile',
		            icon: 'feather icon-user',
				},
				{
		            id: 'application',
		            title: 'Application',
		            type: 'item',
		            url: '/admin/application',
		            icon: 'feather icon-camera',
				},
				{
		            id: 'usermgmt',
		            title: 'User Management',
		            type: 'item',
		            url: '/admin/usermgmt',
		            icon: 'feather icon-users',
				},
				{
		            id: 'bank',
		            title: 'Bank & Services',
		            type: 'item',
		            url: '/admin/bank',
		            icon: 'feather icon-credit-card',
				},
				{
		            id: 'lead',
		            title: 'Lead Management',
		            type: 'item',
		            url: '/admin/lead',
		            icon: 'feather icon-check-square',
		        }
				
		    ]
		},
	],
};

export default navigation;