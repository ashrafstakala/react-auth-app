import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const eneteredNewPassword = newPasswordInputRef.current.value;

    // optional: add validation

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: eneteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      // assumption: always succeeds
      history.replace('/');
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password" minLength={7}>
          New Password
        </label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
