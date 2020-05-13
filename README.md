# secure-password-transport
Quick script to demonstrate how PKI can enable secure password transmission

```bash
npm i
npm start
```

Read `index.ts` to understand how it works.

It is opinionated to simplify usage.

## Features

1. Simple utility functions:
    - `transmit()`
    - `decrypt()`

2. Supports credentials expiry.

3. Supports 1-time use credentials, to prevent replay attack.

4. Password is stored hashed at rest.

## Sample output

```bash
$ npm test

User's log in entry:
{ email: 'test@example.org',
  password:
   'thisIsASECUREPA$$WORD, a very very long long one. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum nunc aliquet bibendum enim facilisis. Tristique senectus et netus et malesuada fames ac turpis. Semper risus in hendrerit gravida. Sed pulvinar proin gravida hendrerit lectus a. Nam libero justo laoreet sit amet. Viverra accumsan in nisl nisi scelerisque eu.',
  t: 1589390328258 }

After client-side encryption, send the following over API:
{ ciphertext:
   'is5kDyz5TQz28873m5YUgKkUlcYreibmkiP7ExzbESPEl8aax37P7B9lFFo2B7tmniaoyM9TDO7rv3Yw/CaZRKJBEcBdZfr/AmiUpLlgx+qJ/BE6O1VALs0IGqa/CGDsJO+Do26CV338NHkBR77IBtiNWmLMa6zmXp8B3EBZGjAZfCQd3LfkONA6Aq+T4sQZa/pv3Lox/LS878p7SoDKa1ukhMs/8mWzECIM8z3kaDKAc+yfnfmVFog2tS5nKJ54XOfTNfx3vbdINE7WgSsg2T3z1lPNL3miYvPRe/ujVxpoxTupTMt1HVdZMG3VpeNkucBHuJ0AWvrrQ3hS322rzcwdr3cdEAbVF0u685iyHQy42iOd3hwCi6zd4c0ShXWcHrqnHjvjM5pSxk7FgjfNuh/6mVQd3WJMq4TWCYl54ChYCobNAA9kzr/fzwAgo3nUXT1yZGYkrCE40cshf9n6LNzPXFbJ0RWC4Q4gM94vJ5uxppIIRuOLhLed5XDx4vkKBSpJwhtakJzq3d0Zl6gE8caFuuQp4XHGclikNRJBszUBA4uOrmayo5t8oqVdws4CrBORBH6exDHdPYETB60M/cfV5vSZAkh704aQXRodEcJLxmieJdQNuCmgcwF6RVVD4YpkWPAC6DblxTqY8jRlrP6xLv9M4rPuqNYfYLl9qHo=',
  key:
   'lc6hkWkDH+VTui9YZJwTp47o5XB9epR0cKneENAvdpscyjnoK4TJE5WKeaCC7hkKZe++bhI+muM4GAXBT7PSirDBiYcN0mUkutMpyJbYc9q/MTcpdupLWlr+55o0rIgA0dRVV/jC54bx05EOPKY4pzw+KeowggCyylsOLSEf62OQY0tDxdCX4yEvKVJtMzAmok1FYWFhRanH7PZ5E8uwiVaAaKCn/97rKU6lCg/q08ozSSSt5lIsA5wU1wf7X9FvAMXEFn57p18k9Bhg8ysO9QVQmYoMSMr6S1BhqBWPDC2badhjvbp++RkkAK1L1aJl4Xw0pAiaLkHHrwEgMLSSZcXwmv18/Yxw9kucdRxqOvI5CrKZNChj8hhkLmmK0+JfjVVh4FrSYQGPfYB/cdo8bMSvOd19q82WyeplftujDYOXjqgP9/gVm5OeUhite5GkQYUCYz3stwy+SMV/XxGVqpnwvVx3sz1UtM53U3PJmhi+/JdQI1cf35hoWDEpJ7ryFANRSXebkNbAXi7pHmxp0Vwwe6/xu1R9uyps0vXlj8bO2nCFF1q83+j8pbxA5hMl+OzTXLJ/Jd/phlstVsvFkAAxhEbxL8q/EE9r6HR034v9lYaRMNsbJ/5FlYbRYVUi1ru+8K3zLut9cp/NH5jXh8fgsJux0q5y6be/vxI6C1w=',
  iv:
   'pQtPKAtbrYYgWDOwu9/1HFEtNbFMvEfs7rylXvDGReFiHwCVs60GUpvNi//M+4lu3Cym13DkPxv/RrZcDhHk6FEgSSNjxif9DKZ+GI6Fay8RuyF1fJ0SbdIRWm4NqV1OzaxXuFKDXqiqbA+w3jFZSOCKSphaWAWlXgF0lB1iBqfyOwVhC2qNHEyoYZQbfSQ1Cpo62Hp48UuWUuA0diyQJ1D80fM2rHhXZFUIJSiwm40aPPKidkZ8IsFpTtFu5yb47BoOiwGhtTZJSqWnbvKiLWr0Dp0zio5fOzkHSeoa2AxopQILsWPYMCC9vITNkqrD70VooFBgf6icHDQzekpR3IlohEvbeoD8mvdLOKHr8WcWQiX7G8jYRZEAvZ30nDdYljdhJkPunHeNUHWmlhz1wqlpDJ/aAAVSdfXnqx5hH28TOGud/6oSNdnAuLRV7SskNMr8a9PTHF4uCzUF9QStV+jn3oa1QviPdAMfCckUIbwKGDUdR8ne9Ka48zu8AEgiyforYvkoqLZJjGj8VOFoFAEczzKlNbxNi0KczzqBBxnFEsEGAMCNESHgSR4fB0Me5QDYYuXqr6bgRF0L8CrwCO4ZYRE4WWZmBJN7aN74MPyLQlaBQcCNxeqbybzq/qyJEVWfhw0MaOA8Dvx/bRICxJfPRFWQ5toGK/KdtElhI/8=' }

Validate the transmission payload at server-side:
true
```
