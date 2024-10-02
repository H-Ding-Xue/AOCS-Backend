export default () => ({
  app: process.env.APP_NAME || 'aocs_service',
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 3000,
  node_env: process.env.NODE_ENV,
  health: {
    ping: 'https://docs.nestjs.com',
    memory_heap: 150 * 1024 * 1024,
    contacts: <Record<string, string>[]>[
      {
        name: 'otel-collector',
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      },
    ],
  },
});
