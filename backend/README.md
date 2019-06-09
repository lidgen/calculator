# How to use

1. make env
2. make install
3. make start

Then a server is started with the following endpoints.

- http://localhost:5000/session
- http://localhost:5000/operator
- http://localhost:5000/operand

# API

**New Session**
----
  Returns a new token.

* **URL**

  /session

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ result : 0, token : "WZUIJAI8VAQ5TUBT" }`


**Delete a Session**
----
  Deletes a session.

* **URL**

  /session/token

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   `token=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />


**Operator**
----
  Client submits an operator and server returns a result.

* **URL**

  /operator/operator/token

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   `operator=[string]`
   `token=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ result : 12 }`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Press AC to start a new session" }`


**Operand**
----
  Client submits an operand.

* **URL**

  /operand/operand

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   `operand=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Press AC to start a new session" }`
