import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";
import { $importer } from "../importer";

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  $importer
    .sync()
    .then((updatedCount) => {
      callback(undefined, {
        statusCode: 200,
        body: JSON.stringify({ updatedCount }),
      });
    })
    .catch(callback);
};

export { handler };
