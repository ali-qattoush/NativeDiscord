import store from '../redux/store/reduxStore';

function useStorePrinter() {
  const storeState = store.getState();
  const jsonString = JSON.stringify(storeState, null, 2);
  console.log(jsonString);
}

export default useStorePrinter;
