# express-api-with-openapi-docs
A simple express REST API with OpenAPI docs generated by Swagger UI.

# PREREQUISITES
- Nodejs

# START HERE
- Clone this repo
- CD into the repo folder
- `npm install`
- `npm run build` && `npm start`
- For a development server `npm run dev`

EXPRESS REST API ROUTES
| METHOD | ROUTE | PARAMS | REQUEST | RESPONSE |
| ------ | ----- | ------ | ------- | -------- |
| GET | / | `none` | Get all wishes | All wishes |
| POST | / | `none` | Add a wish | Message indicating success/failure |
| PUT | / | In query `?wishName='Name of wish'` | Update a wish name and description | Message indicating success/failure |
| PATCH | / | In query `?wishName='Name of wish'` | Change a wish name and or description | Message indicating success/failure |
| DELETE | /:wishName | In path `Replace :wishName with the name of wish` | Delete a wish | Message indicating success/failure |
| GET | /protected | In header `secret` | Get Secret Info | If correct secret is provided, access granted, if not access denied |