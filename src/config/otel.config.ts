import { registerAs } from '@nestjs/config';
import { OpenTelemetryModuleOptions } from 'nestjs-otel/lib/interfaces';

// Config here will override OTEL configs defined in .env

// Refer to @opentelemetry/exporter-metrics-otlp-http docs
const MetricExporterConfig = {};

// Refer to @opentelemetry/exporter-trace-otlp-http docs
const TraceExporterConfig = {};

// Refer to @opentelemetry/exporter-logs-otlp-http docs
const LogExporterConfig = {};

export const OpenTelemetryModuleConfig: OpenTelemetryModuleOptions = {
  metrics: {
    hostMetrics: true, // Includes Host Metrics
    apiMetrics: {
      enable: true, // Includes api metrics
      defaultAttributes: {
        // You can set default labels for api metrics
        microservice: process.env.APP_NAME,
      },
      ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
      prefix: 'aocs_service', // Add a custom prefix to all API metrics
    },
  },
};

export const OpenTelemetryConfig = {
  otel: {
    sdk_disable: process.env.OTEL_SDK_DISABLED,
    log_level: process.env.OTEL_LOG_LEVEL,
    config: OpenTelemetryModuleConfig,
    collector_endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  },
  metrics: {
    exporter: process.env.OTEL_METRICS_EXPORTER,
    config: MetricExporterConfig,
  },
  traces: {
    exporter: process.env.OTEL_TRACES_EXPORTER,
    config: TraceExporterConfig,
  },
  logs: {
    exporter: process.env.OTEL_LOGS_EXPORTER,
    config: LogExporterConfig,
  },
};

// register for debugging purpose
export default registerAs('opentelemetry', () => OpenTelemetryConfig);
