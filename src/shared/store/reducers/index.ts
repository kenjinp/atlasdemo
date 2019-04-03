import { StaticRouterProps } from 'react-router';
import uiSettingsReducer, { UISettingsState } from './ui-settings';
import { ConfigState } from './config';

export interface RootState {
  config: ConfigState;
  router?: StaticRouterProps;
  uiSettings: UISettingsState;
}

export default {
  uiSettings: uiSettingsReducer,
};
