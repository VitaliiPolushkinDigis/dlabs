import { useEffect, useState } from 'react';
import { userService } from '../../services/user.service';

const Login = (props) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    submitted: false,
    loading: false,
    error: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setState((prev) => ({ ...prev, submitted: true }));

    const { password, email } = state;

    if (!(email && password)) {
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    userService.login(email, password).then(
      (user) => {
        const { from } = props.location.state || { from: { pathname: '/' } };
        props.history.push(from);
      },
      (error) => {
        setState((prev) => ({ ...prev, error, loading: false }));
      }
    );
  };
  useEffect(() => {
    userService.logout();
  }, []);
  const { password, submitted, loading, error, email } = state;
  return (
    <div className='login__wrapper'>
      <div className='login'>
        <div>
          Username: borgoth@mordos.com
          <br />
          Password: 12bindthem
        </div>
        <h2>Login</h2>
        <form name='form' onSubmit={handleSubmit}>
          <div className='field'>
            <span className='email'>Email</span>
            <input
              type='email'
              className=''
              name='email'
              value={email}
              onChange={handleChange}
            />
            {submitted && !email && (
              <div className='error'>Email is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !password ? ' has-error' : '')
            }
          >
            <span htmlFor='password'>Password</span>
            <input
              type='password'
              className='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
            {submitted && !password && (
              <div className='error'>Password is required</div>
            )}
          </div>
          <div className=''>
            <button className='' disabled={loading}>
              Login
            </button>
            {loading && (
              <img
                src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                alt='loading'
              />
            )}
          </div>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
