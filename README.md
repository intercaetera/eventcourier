# eventcourier

A very simple example of a no-db, sorta CQRS, sorta event-sourced app example with minimal dependencies.

Uses filesystem for persistence because it's simple.

## API

HTTP Prompt syntax (`METHOD /endpoint body_key=body_value_type`)

- `GET /` - returns the entire stored state
- `POST /add from=string to=string` - adds a new package
- `POST /deliver id=string` - delivers an existing package
