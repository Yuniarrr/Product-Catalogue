## HOW TO RUN THIS PROJECT

1. Run `yarn install` to install all dependencies

2. Copy the `.env.sample` file as `.env`

You can also configure the Docker and Database

```bash
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASS=
DATABASE_PORT=

DATABASE_URL=
```

3. Run `yarn setup` to configure the docker

4. Run `yarn migrate`

5. Run `yarn seed`

6. Run `yarn dev`

7. Check the `api.rest` file to see all endpoints

You can also install the extension on the following [link](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for convenience
