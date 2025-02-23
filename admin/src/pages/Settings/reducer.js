import produce from 'immer';
import set from 'lodash/set';

const initialState = {
  isLoading: true,
  isSubmiting: false,
  responsiveDimensions: true,
  initialData: {
    formats: [],
    quality: 87,
  },
  modifiedData: {
    formats: [],
    quality: 87,
  },
};

const defaultFormat = {
  name: '',
  width: 500,
  fit: 'cover',
  position: 'centre',
  withoutEnlargement: false,
}

const reducer = (state, action) => {
  // eslint-disable-next-line consistent-return
  produce(state, drafState => {
    switch (action.type) {
      case 'CANCEL_CHANGES':
        drafState.modifiedData = state.initialData;
        break;
      case 'GET_DATA_SUCCEEDED':
        drafState.isLoading = false;
        drafState.responsiveDimensions = action.data.responsiveDimensions;
        drafState.initialData = action.data;
        drafState.modifiedData = action.data;
        break;
      case 'ON_CHANGE':
        set(drafState, ['modifiedData', ...action.keys.split('.')], action.value);
      // TODO
      // case 'ON_FORMATS_CHANGE':
      //   return state.updateIn(['modifiedData', 'formats', action.index, action.keys], () => action.value);
      // case 'ADD_FORMAT':
      //   return state.updateIn(['modifiedData', 'formats'], arr => arr.unshift(fromJS(defaultFormat)));
      // case 'DELETE_FORMAT':
      //   return state.updateIn(['modifiedData', 'formats'], arr => arr.splice(action.index, 1));
      case 'SUBMIT_SUCCEEDED':
        drafState.initialData = state.modifiedData;
        drafState.isSubmiting = false;
      default:
        return state;
    }
  });
};

export default reducer;
export { initialState };