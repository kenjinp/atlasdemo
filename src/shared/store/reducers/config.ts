import { AnyAction } from 'redux';

export interface ConfigState {
  apiEndpoint: string;
  basePath: string;
  clientId: string;
  redirectHostName: string;
  preferredRealm?: string;
}

const initialState: ConfigState = {
  apiEndpoint: '/',
  basePath: '',
  clientId: '',
  redirectHostName: '',
};

export default function configReducer(
  state: ConfigState = initialState,
  action: AnyAction
): ConfigState {
  return state;
}
