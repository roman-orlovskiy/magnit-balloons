import { getCurrentInstance } from 'vue';

let internalInstance = null;
function getPixiApp() {
  if (!internalInstance) {
   internalInstance = getCurrentInstance();
  }
  return internalInstance.appContext.config.globalProperties.pixiApp;
}

export default getPixiApp;
