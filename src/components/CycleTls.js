import initCycleTLS from 'cycletls';

let cycleTLSInstance;

async function initializeCycleTLS() {
  cycleTLSInstance = await initCycleTLS();
}

async function exitCycleTLS() {
  cycleTLSInstance.exit();
}

function getCycleTLSInstance() {
  return cycleTLSInstance;
}

export { initializeCycleTLS, getCycleTLSInstance, exitCycleTLS };
