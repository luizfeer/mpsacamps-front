// src/boot/sentry.js

import * as Sentry from '@sentry/vue'

export default ({ app, router }) => {
  Sentry.init({
    app,
    dsn: 'https://a4040a0f4a75928f7201879a8da648b1@o4505748891435008.ingest.us.sentry.io/4507014333464576', // Use seu DSN do Sentry aqui
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false
      })
    ],
    tracePropagationTargets: ['localhost', 'https://app-s3go7ufjia-uc.a.run.app'],

    // Supondo que replayIntegration seja um método disponível. Verifique a documentação do Sentry para a sintaxe correta.
    // Sentry.replayIntegration({
    //   maskAllText: false,
    //   blockAllMedia: false,
    // }),
    // Performance Monitoring
    tracesSampleRate: 1.0, // Captura 100% das transações
    // Session Replay
    replaysSessionSampleRate: 0.1, // Ajuste a taxa de amostragem para 10%. Você pode querer alterar isso para 100% durante o desenvolvimento e, em seguida, amostrar a uma taxa menor em produção.
    replaysOnErrorSampleRate: 1.0 // Se você não estiver já amostrando a sessão inteira, altere a taxa de amostragem para 100% quando amostrar sessões onde ocorrem erros.
  })
}
