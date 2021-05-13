let accounts = [
  {
    owner: "Michael Beamer",
    username: "MB",
    password: "1111",
    movements: [
      200, 455.23, -306.5, 25000, -642.21, -5533.9, 79.97, 1300, 2500, -1100,
    ],
    interestRate: 1.2, // %
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2020-07-26T17:01:17.194Z",
      "2020-07-28T21:36:17.929Z",
      "2020-08-01T10:51:36.790Z",
      "2020-09-28T22:36:17.929Z",
      "2020-02-08T14:11:59.604Z",
    ],
    currency: "EUR",
    locale: "de-DE",
  },

  {
    owner: "Jessica Alba",
    username: "JA",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 2600, -1200],
    interestRate: 1.5,
    password: "2222",

    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
      "2020-05-25T17:49:59.371Z",
      "2020-04-26T11:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  },
];

accounts = JSON.parse(localStorage.getItem("updatedAccounts"))
  ? JSON.parse(localStorage.getItem("updatedAccounts"))
  : accounts;

localStorage.setItem("localAccounts", JSON.stringify(accounts));

export { accounts };
