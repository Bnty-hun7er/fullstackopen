sequenceDiagram
    participant user as User
    participant browser
    participant server

    user->>browser: Clicks "Save" button
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTTP 200 OK (or confirmation response)
    deactivate server

    Note right of browser: The browser may fetch the updated list of notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Bounty_Hunter", "date": "2023-12-22" }, ...]
    deactivate server

    Note right of browser: The browser re-renders the notes on the page and show them
