import { getCurrentInstance } from 'vue';

function getPixiApp() {
  const internalInstance = getCurrentInstance();
  return internalInstance.appContext.config.globalProperties.pixiApp;
}

export default getPixiApp;
