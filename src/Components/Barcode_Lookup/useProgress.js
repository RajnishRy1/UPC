import { useDispatch } from "react-redux";
import { CurrentStateActions } from "../Store/CurrentStateSlice";

const useProgress = () => {
  const dispatch = useDispatch();
  const setProgressValue = (value) => {
    dispatch(CurrentStateActions.setProgressValue({ value: value }));
  };
  const setCompletion = (value) => {
    dispatch(CurrentStateActions.setCompletion({ completed: value }));
    dispatch(CurrentStateActions.setFetching({ fetching: !value }));
  };
  return { setProgressValue, setCompletion };
};

export default useProgress;
