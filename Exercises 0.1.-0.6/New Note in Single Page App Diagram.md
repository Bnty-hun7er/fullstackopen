sequenceDiagram
    participant user as User
    participant browser
    participant server

    user->>browser:  new note : Iam bountyHunter  and clicks "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created (or confirmation response)
    deactivate server

    Note right of browser: The browser updates the local notes list with the new note

    browser->>browser: Renders the updated notes on the page
