export function unwrapPayload(res) {
  // Backend commonly returns { dataPayload: { ... } }
  // Some older screens expect { payload: { ... } }
  return res?.dataPayload ?? res?.payload ?? res ?? {};
}

export function unwrapData(res) {
  const root = unwrapPayload(res);
  return root?.data ?? root;
}

