//  tracing.mjs
'use strict';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { HoneycombSDK } from '@honeycombio/opentelemetry-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';


const honeycomb_sdk = new HoneycombSDK({
    apiKey: "xxx",
    dataset: "OT-testbed",
    serviceName: "ot-test",
    debug: true,
    instrumentations: [getNodeAutoInstrumentations({
      // We recommend disabling fs automatic instrumentation because
      // it can be noisy and expensive during startup
      '@opentelemetry/instrumentation-fs': { enabled: false,},
      // disable mysql2 because it has a bug that breaks writes
      '@opentelemetry/instrumentation-mysql2': {enabled: false,},
  })]
});

honeycomb_sdk.start()

export { honeycomb_sdk as default };
