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
    - Client-side: `transmit(credentials: Credentials, publicKey: string)` 
      - Returns encrypted `TransmissionPayload` to be transmitted from client-side to server.
    - Server-side: `isValidLogin(payload: TransmissionPayload)` 
      - Validates the received TransmissionPayload and returns a boolean if a credential is valid.

2. Supports credentials expiry.

3. Supports 1-time use credentials, to prevent replay attack.

4. Passwords are stored hashed at rest.

5. Supports arbitrarily large payload for arbitrarily long passwords and other data in payload.

## Sample output

```bash
$ npm test

User's log in entry:
{ email: 'test@example.org',
  password:
   'thisIsASECUREPA$$WORD, a very long password. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum nunc aliquet bibendum enim facilisis. Tristique senectus et netus et malesuada fames ac turpis. Semper risus in hendrerit gravida. Sed pulvinar proin gravida hendrerit lectus a. Nam libero justo laoreet sit amet. Viverra accumsan in nisl nisi scelerisque eu.',
  t: 1589421158596 }

After client-side encryption, send the following over API:
{ ciphertext:
   '4QEI1N7AB+8AYYvL8n7G136O0Vw7aRqRADO4KUs7bwdvkNevkTZTwD8Td0ttLXfvKt3BMSe3AtMbgZzGVRi8tXLgpGQkC3lopi9EgjXOyI3KECh7cbJIjVl4wEOU5z5K3eZbOQdCJD+76qCweDZUVd1lv7lSuHmfXnZCJEy9rmXs7dG9ZL/hD0n4jd/09NSgDi6c0xThcI/IgodmusSHsKCITFtWp8ibLhdG8w9XFNecty5sIeA4KtMrR3rnduU6pBdRJbD25y/zUQ4UrcoXe4aP5yy4U4wOqDIFEjAPyZnoMmLWMAoSbFpCtajkzDVAEpZ5CXIUnTwbuHTGGpiiF++EfIZ0VjwlK0ahVLvbyydcHRZ7FvXya/OuyCH+qKvLyAZGnh1PA5Cg/jGJvFcV6FXH7vXRUfJog5rt8KMHhA8V/KuqLuudYmB9vcz8m1my/AfnbXfC7mH8iKsQWANMhfLDa0bpWUEK+hAi3cZOUH7PyEYgSYe249EuQH3AeqIxGI9enaNN9hhj4k3MbC8dutePO7/xPGK600PJ9IMY7SY3PxXQCFBubOg75DRz6Um1VThTbH70S7SpUMhZSWImp3X0+tP59vHEJd2JDtqj4xqLzXuFwN5OBgR/SOKABWiseoQQPcAPLcl7U/D/YRU/2A==',
  key:
   'nSVJTNGgA2ioxnwc5ysxnSipqnKKv7V+p0XM5tUFrsPTNbua94ISabaaciNVjSCZ6UhlWDe7wldl/sGNdhZUl8b1vXhvmTcqSU/ZhJ5x6p5zuHZ05ORlxnNV0sKQpdRnNnh3GGmTcR4jNKiocU06nt0+O4crIkMFauq2AxcF3Zo/RFFHwxw1B3uBxFbCgM7Ox1M6hXkibABfcNUtGFFa9gpMY0CTiRBD42bKb+f2UIpYzZR2u6uNcQcpBozscBQwfSIJh95SBCt7N8EyEFIwDh2ZMWbvLoJyL1PuPTvudwr/bzFTjvwdvbN5wdnT3TxjPdGczi+CKyb3DOrMYChaoojqfD90EWmrAMciHMSEODhznZqcZKSFuLpUSXRhVquX0ZPOALi8VG+FxCynmTgSWyLko4epU8LnatcL9kMANRux6IBuo6Kx0837UpGV5y9y+GaLzU0TFMHQpWeFg7YRT8sOb18cHbxlHqDyYcNQ6Zud9CxF2nagQt1hBGgMpQgC4fMIWivdJaTxQ3Alf9pYu7RkA7g3LfX63PeyZOrRASp6i/y0g6mN+fFuShrwBK5Lk9QpGP7GJE3R9j9Cm0gDHzxS9BMR/qx9/YVlVZDqQgajoupalth2NiIuxUzW0Voy1WV2yoXpyYLL2P4mIc4iRl6k6+ubaawSXEC4AMZsBmE=',
  iv:
   'PTTEpbbTrClI7oDd6xoQ0LNMPxGNRohKAPwhgYSGnPXIgDqSQCMZ6+xXHwOrIrCxFiWFQEHGsN51Ut92Rd8K3n2l9yi0qNQKZ9Na1ED2cQnwNxOBQ3IMYE2eCCMp9Xtt0qBzLIU7PIY/maKZJkuE5Gd4WbtjvA2jwWi376/GKrdC5HqprvcFh38xCJ1yhTfy7HaM3W3i/f0kwpjUszLdsGm3YLJskwAqBaVoANuBK1ItlW83ydegiwVKipVDV6XlaSfIoUWOEATeaL6TItg/ZPPR6H0nKCxVjfRdiX4c6Ju0fjWB6OsuslSy67dRrYXWDy84IM2EDHtCFCFCO0ZfQ12r4yZXMt/t5+gIYW1/9POL+HH5E5IAA/LehSssA/mFGS6rr3F1GX/IHGsiAdbaGJedDQ/lMGJjzrqM0UCgcOaHl1I46TjPfXaRo1wAx60NlqBdlpsu6irqOIf5FGNJDTd03GrQJC2T4E3egQ5O44/2gUE/2EzXElbHNBf/uRV7H4WGIcME6sQ5UQ+kyyWZfaixye0WDvsk16MHCL+HewufmrTssb3xhGaxsgrvbrkjvBMWhsaEUt9VoR47Sk0zhxMeqhaUn8AWzaBEh5GocsMvCFuaNM4+nnkMXYEmblhCLExp1sNUx9IyLrvv5HNBzZ1AZRcAQS9V8SuOtG+TvWg=' }

Validate the transmission payload at server-side:
true
```
