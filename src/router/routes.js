const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProfileView.vue') }]
  },
  // {
  //   path: '/federacamps',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/ConferenciaFeupam.vue') }
  //   ]
  // },
  {
    path: '/federa',
    name: 'federa',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FederaAcamps.vue') }
    ]
  },
  {
    path: '/federa-diarias',
    name: 'federa',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EventsList.vue') }
    ]
  },
  // {
  //   path: '/tutoria',
  //   name: 'tutoria',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/ConferenciaFeupam.vue') }
  //   ]
  // },
  {
    path: '/conferencia',
    name: 'conferencia',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ConferenciaFeupam.vue') }
    ]
  },
  {
    path: '/politica',
    name: 'politica',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PoliticaSeguranca.vue') }
    ]
  },
  {
    path: '/lista-espera',
    name: 'listaEspera',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ListaEspera.vue') }
    ]
  },
  {
    path: '/eventos',
    name: 'eventos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/InscricoesView.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '/eventos-disponiveis',
  //   name: 'eventos-disponiveis',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/ListEvents.vue') }
  //   ],
  //   meta: {
  //     requiresAuth: false
  //   }
  // },

  {
    path: '/inscricao/:id/:step?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/InscricaoForm.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/atualizar-dados',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FormDados.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AuthComponent.vue') }
    ]
  },
  {
    path: '/termos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TermosUso.vue') }]
  },
  // {
  //   path: '/pagamento',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/SegundoPagamento.vue') }
  //   ]
  // },
  {
    path: '/usuarios/:evento',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DataUser.vue') }],
    meta: {
      requiresAuth: true
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
