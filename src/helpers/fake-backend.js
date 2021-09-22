export function configureFakeBackend() {
  const users = [
    {
      id: 1,
      username: 'test',
      password: '12bindthem',
      firstName: 'TestName',
      lastName: 'TestSeconName',
      email: 'borgoth@mordos.com',
    },
  ];
  const realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          const params = JSON.parse(opts.body);
          const filteredUsers = users.filter((user) => {
            return (
              user.email === params.email && user.password === params.password
            );
          });

          if (filteredUsers.length) {
            const user = filteredUsers[0];
            const responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson)),
            });
          } else {
            reject('Username or password is incorrect');
          }

          return;
        }

        if (url.endsWith('/users') && opts.method === 'GET') {
          if (
            opts.headers &&
            opts.headers.Authorization === `Basic ${window.btoa('test:test')}`
          ) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(users)),
            });
          } else {
            resolve({ status: 401, text: () => Promise.resolve() });
          }

          return;
        }
        realFetch(url, opts).then((response) => resolve(response));
      }, 300);
    });
  };
}
