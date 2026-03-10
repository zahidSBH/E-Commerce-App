import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProfile,
  updateProfile,
  clearProfile,
  selectUserProfile,
  selectUserStatus,
  selectUserError,
  selectUserUid,
  selectIsProfileLoaded,
} from '@/store/slices/userSlice';

const useUserProfile = () => {
  const dispatch = useDispatch();
 
  const profile = useSelector(selectUserProfile);
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const uid = useSelector(selectUserUid);
  const isProfileLoaded = useSelector(selectIsProfileLoaded);

  const loadProfile = useCallback(
    (targetUid = "") => {
      dispatch(fetchProfile({ uid: targetUid }));
    },
    [dispatch]
  );

  const saveProfile = useCallback(
    (payload = {}) => {
      dispatch(updateProfile({ uid, payload }));
    },
    [dispatch, uid]
  );

  const resetProfile = useCallback(() => {
    dispatch(clearProfile());
  }, [dispatch]);

  return {
    profile,
    status,
    error,
    uid,
    isProfileLoaded,
    loadProfile,
    saveProfile,
    resetProfile,
  };
};

export default useUserProfile;