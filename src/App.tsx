import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
  LoginPage,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import { DataProvider } from "@pankod/refine-strapi-v4";
import { useTranslation } from "react-i18next";
import { Header } from "components/layout";
import { 
  // authProvider,
  axiosInstance } from "./authProvider";
import { API_URL } from "./constants";

import { ItemList } from "./pages/items";
function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <Refine
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      // authProvider={authProvider}
      dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
      LoginPage={LoginPage}
      i18nProvider={i18nProvider}
      Header={Header}
      resources={[{ name: "items", list: ItemList }]}
    />
  );
}

export default App;
