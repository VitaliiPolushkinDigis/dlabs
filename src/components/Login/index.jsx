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
    const copy = { ...state };
    copy[name] = value;
    setState(copy);
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
    <div>
      <div>
        Username: test
        <br />
        Password: test
      </div>
      <h2>Login</h2>
      <form name='form' onSubmit={handleSubmit}>
        <div className=''>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            className=''
            name='email'
            value={email}
            onChange={handleChange}
          />
          {submitted && !email && <div className=''>Email is required</div>}
        </div>
        <div
          className={
            'form-group' + (submitted && !password ? ' has-error' : '')
          }
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className=''
            name='password'
            value={password}
            onChange={handleChange}
          />
          {submitted && !password && (
            <div className=''>Password is required</div>
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
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
