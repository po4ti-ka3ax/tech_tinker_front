import i18next from 'i18next';
import { i18nOptions, resources } from './settings';

const initI18next = async (lng: string) => {
  if (!i18next.isInitialized) {
    const loadedResources: any = {};

    for (const ns of i18nOptions.ns) {
      const translations = await resources[lng][ns]();
      loadedResources[lng] = {
        ...(loadedResources[lng] || {}),
        [ns]: translations,
      };
    }

    await i18next.init({
      ...i18nOptions,
      lng,
      resources: loadedResources,
    });
  }

  return i18next;
};

export { initI18next };
